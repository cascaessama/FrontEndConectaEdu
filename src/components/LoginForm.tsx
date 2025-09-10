// LoginForm.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
  margin: 64px auto;
  padding: 24px;
  border-radius: 12px;
  background: #f4f6f9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const Label = styled.label`
  font-weight: 600;
  color: #2b2b2b;
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
    box-shadow: 0 0 0 3px rgba(41, 112, 255, 0.15);
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  margin-top: 8px;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  background: ${({ disabled }) => (disabled ? "#9fb9ee" : "#2970ff")};
  color: white;
  transition: transform 0.02s ease, background 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMsg = styled.p`
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: #ffe9e9;
  color: #a61b1b;
  font-size: 13px;
`;



type LoginResponse = {
  access_token?: string;   // <-- seu backend retorna esse
  token?: string;
  accessToken?: string;
  jwt?: string;
  message?: string;
  [k: string]: any;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      let data: LoginResponse = {};
      try {
        data = text ? (JSON.parse(text) as LoginResponse) : {};
      } catch {
        // mantém data como objeto vazio se não for JSON
      }

      if (!res.ok) {
        throw new Error(
          data?.message || `Falha na autenticação (HTTP ${res.status})`
        );
      }

      const token =
        data.access_token ??
        data.token ??
        data.accessToken ??
        data.jwt ??
        (typeof data === "string" ? data : undefined);

      if (!token) {
        throw new Error("Resposta sem token de acesso.");
      }

      localStorage.setItem("authToken", token);
      navigate("/admin"); // sucesso
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro inesperado ao autenticar.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (

    <div>

      <Header></Header>
      <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="fusuario">Usuário</Label>
        <Input
          id="fusuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div>
        <Label htmlFor="fsenha">Senha</Label>
        <Input
          id="fsenha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Entrando..." : "Entrar"}
      </Button>

      
    </Form>
    </div>
    
  );
}
