// src/pages/Cadastrar.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  max-width: 800px;
  margin: 32px auto;
  padding: 0 16px;
`;

const Card = styled.form`
  display: grid;
  gap: 14px;
  background: #f7f9fc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,.06);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 22px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 6px;
  display: inline-block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cfd6e4;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2970ff;
    box-shadow: 0 0 0 3px rgba(41,112,255,.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 10px 12px;
  border: 1px solid #cfd6e4;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2970ff;
    box-shadow: 0 0 0 3px rgba(41,112,255,.15);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button<{ variant?: "primary" | "ghost"; disabled?: boolean }>`
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: ${({ variant }) => (variant === "ghost" ? "1px solid #cfd6e4" : "0")};
  background: ${({ variant, disabled }) =>
    variant === "ghost" ? "#fff" : disabled ? "#9fb9ee" : "#2970ff"};
  color: ${({ variant }) => (variant === "ghost" ? "#2b2b2b" : "#fff")};

  &:disabled { opacity: .8; cursor: default; }
`;

const ErrorMsg = styled.p`
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: #ffe9e9;
  color: #a61b1b;
  font-size: 13px;
`;

export default function Cadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataCriacao, setDataCriacao] = useState<string>(() => {
    // valor inicial como agora no formato datetime-local (YYYY-MM-DDTHH:mm)
    const d = new Date();
    d.setSeconds(0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    const v = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return v;
  });
  const [conteudo, setConteudo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  function toISO(dtLocal: string): string {
    // converte "YYYY-MM-DDTHH:mm" para ISO (UTC)
    const iso = new Date(dtLocal).toISOString();
    return iso;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!titulo || !autor || !conteudo || !dataCriacao) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        titulo,
        conteudo,
        dataCriacao: toISO(dataCriacao),
        autor,
      };

      const res = await fetch("/api/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text(); // evita crash se não vier JSON
      if (!res.ok) {
        let msg = `Falha ao salvar (HTTP ${res.status})`;
        try {
          const data = text ? JSON.parse(text) : {};
          if (data?.message) msg = data.message;
        } catch {}
        throw new Error(msg);
      }

      navigate("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado ao salvar.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page>
      <Title>Cadastrar Post</Title>

      <Card onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="autor">Autor</Label>
          <Input
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="data">Data de criação</Label>
          <Input
            id="data"
            type="datetime-local"
            value={dataCriacao}
            onChange={(e) => setDataCriacao(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="conteudo">Conteúdo</Label>
          <TextArea
            id="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
          />
        </div>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Actions>
          <Button type="button" variant="ghost" onClick={() => navigate("/admin")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </Actions>
      </Card>
    </Page>
  );
}
