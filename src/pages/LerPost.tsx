// src/pages/LerPost.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string | Date;
  autor: string;
};

const Page = styled.div`
  max-width: 860px;
  margin: 32px auto;
  padding: 0 16px;
`;

const Card = styled.div`
  background: #f7f9fc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,.06);
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 24px;
  color: #2b2b2b;
`;

const Meta = styled.p`
  margin: 0 0 16px;
  color: #5b6b8b;
  font-size: 14px;
`;

const Content = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: #1e293b;
  line-height: 1.55;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

const Button = styled.button<{ variant?: "primary" | "ghost" }>`
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: ${({ variant }) => (variant === "ghost" ? "1px solid #cfd6e4" : "0")};
  background: ${({ variant }) => (variant === "ghost" ? "#ffffff" : "#2970ff")};
  color: ${({ variant }) => (variant === "ghost" ? "#2b2b2b" : "#ffffff")};
  &:hover {
    background: ${({ variant }) => (variant === "ghost" ? "#f8fafc" : "#1d4ed8")};
  }
`;

const ErrorMsg = styled.p`
  margin: 8px 0 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #ffe9e9;
  color: #a61b1b;
  font-size: 13px;
`;

export default function LerPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID inválido.");
      setLoading(false);
      return;
    }
    void loadPost(id);
  }, [id]);

  async function loadPost(postId: string) {
    setLoading(true);
    setError(null);
    try {
      // tenta GET /portal/:id
      let res = await fetch(`/api/portal/${postId}`);
      if (!res.ok) {
        // fallback: busca todos e filtra
        const resAll = await fetch(`/api/portal`);
        if (!resAll.ok) throw new Error(`Falha ao buscar post (HTTP ${resAll.status})`);
        const arr = (await resAll.json()) as any[];
        const raw = Array.isArray(arr) ? arr.find((p) => (p.id ?? p._id) == postId) : null;
        if (!raw) throw new Error("Post não encontrado.");
        setPost({
          id: String(raw.id ?? raw._id),
          titulo: raw.titulo ?? "",
          conteudo: raw.conteudo ?? "",
          dataCriacao: raw.dataCriacao ?? "",
          autor: raw.autor ?? "",
        });
      } else {
        const raw = await res.json();
        setPost({
          id: String(raw.id ?? raw._id),
          titulo: raw.titulo ?? "",
          conteudo: raw.conteudo ?? "",
          dataCriacao: raw.dataCriacao ?? "",
          autor: raw.autor ?? "",
        });
      }
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar post.");
    } finally {
      setLoading(false);
    }
  }

  const dataFmt =
    post?.dataCriacao ? new Date(post.dataCriacao).toLocaleString("pt-BR") : "-";

  return (
    <Page>
      {loading && <p>Carregando…</p>}
      {error && <ErrorMsg>Erro: {error}</ErrorMsg>}

      {post && !loading && !error && (
        <Card>
          <Title>{post.titulo}</Title>
          <Meta>por {post.autor} — {dataFmt}</Meta>
          <Content>{post.conteudo}</Content>

          <Actions>
            <Button variant="ghost" onClick={() => navigate(-1)}>Voltar</Button>
            <Button onClick={() => navigate(`/admin/edit/${post.id}`)}>Editar</Button>
          </Actions>
        </Card>
      )}
    </Page>
  );
}
