// src/pages/Editar.tsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";

type Post = {
  id?: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string | Date;
  autor: string;
};

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
  font-family: 'Montserrat', 'Open Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2b2b2b;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 6px;
  display: block;
`;

const Input = styled.input`
  width: 97%;
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
  width: 97%;
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

export default function Editar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const token = useMemo(() => localStorage.getItem("authToken"), []);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataCriacao, setDataCriacao] = useState<string>(""); // datetime-local
  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // helpers de data
  function toLocalInput(dt: string | Date | undefined): string {
    if (!dt) return "";
    const d = new Date(dt);
    if (isNaN(d.getTime())) return "";
    d.setSeconds(0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function toISO(dtLocal: string): string {
    return new Date(dtLocal).toISOString();
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!id) {
      setError("ID inválido.");
      setLoading(false);
      return;
    }
    void loadPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  async function loadPost(postId: string) {
    setLoading(true);
    setError(null);
    try {
      // 1) tenta GET /portal/:id
      let res = await fetch(`/api/portal/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // 2) fallback: busca todos e procura o id
        const resAll = await fetch(`/api/portal`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resAll.ok) {
          const txt = await resAll.text();
          throw new Error(`Falha ao carregar (HTTP ${resAll.status}) ${txt || ""}`);
        }
        const arr = (await resAll.json()) as any[];
        const raw = Array.isArray(arr) ? arr.find((p) => (p.id ?? p._id) == postId) : null;
        if (!raw) throw new Error("Post não encontrado.");
        fillForm(raw);
      } else {
        const raw = await res.json();
        fillForm(raw);
      }
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar post.");
    } finally {
      setLoading(false);
    }
  }

  function fillForm(raw: any) {
    const _id = String(raw?.id ?? raw?._id ?? "");
    setTitulo(raw?.titulo ?? "");
    setAutor(raw?.autor ?? "");
    setConteudo(raw?.conteudo ?? "");
    setDataCriacao(toLocalInput(raw?.dataCriacao));
    if (!_id) setError("Resposta sem ID do post.");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
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

      const res = await fetch(`/api/portal/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
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

  if (loading) {
    return (
      <div>
        <Header />
        <Page>
          <Title>Editar Post</Title>
          <div style={{ padding: 12 }}>Carregando…</div>
        </Page>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Page>
        <Title>Editar Post</Title>
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
    </div>
  );
}
