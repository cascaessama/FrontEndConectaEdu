// src/pages/Admin.tsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;                           // id real da API (id ou _id)
  rowKey: string;                       // chave única para o React
  titulo: string;
  conteudo: string;
  dataCriacao: string | Date;
  autor: string;
};

const Page = styled.div`
  max-width: 1000px;
  margin: 32px auto;
  padding: 0 16px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 22px;
  margin: 0;
`;

const Button = styled.button<{ variant?: "primary" | "ghost" | "danger"; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* mesmo tamanho para todos */
  padding: 12px 16px;
  min-width: 160px;          /* <- garante mesmo “largura visível” */
  border-radius: 10px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  border: ${({ variant }) => (variant === "ghost" ? "1px solid #cfd6e4" : "0")};
  background: ${({ variant, disabled }) => {
    if (variant === "danger") return disabled ? "#fca5a5" : "#ef4444"; // vermelho
    if (variant === "ghost") return "#ffffff";
    return disabled ? "#9fb9ee" : "#2970ff"; // primary
  }};
  color: ${({ variant }) => (variant === "ghost" ? "#2b2b2b" : "#ffffff")};
  transition: background .2s ease, transform .02s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "danger" ? "#dc2626" : variant === "ghost" ? "#f8fafc" : "#1d4ed8"};
  }
  &:active { transform: translateY(1px); }
`;
const DangerZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;   /* espaço acima/abaixo */
`;


const TableWrap = styled.div`
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,.06);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid #e8edf6;
    vertical-align: top;
  }
  th {
    background: #eef3fb;
    font-weight: 700;
    color: #2b2b2b;
  }
  tr:last-child td { border-bottom: 0; }
`;

const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const IconBtn = styled.button`
  border: 0;
  background: transparent;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  &:hover { background: #e9f0ff; }
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eef3fb;
  color: #3c4b6e;
`;

// Ícones inline
const PlusIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const EditIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 21h4l11-11-4-4L4 17v4z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 7l4 4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const TrashIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function Admin() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  // Normaliza o post e cria uma chave de linha estável
  function normalizePost(p: any, idx: number): Post {
    const realId = p?.id ?? p?._id ?? "";
    const id = realId ? String(realId) : "";
    const rowKey = id || `${idx}-${p?.titulo ?? ""}-${p?.autor ?? ""}`;
    return {
      id,
      rowKey,
      titulo: p?.titulo ?? "",
      conteudo: p?.conteudo ?? "",
      dataCriacao: p?.dataCriacao ?? "",
      autor: p?.autor ?? "",
    };
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    void loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/portal", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Falha ao listar posts (HTTP ${res.status}) ${txt || ""}`);
      }

      const raw = (await res.json()) as any[];
      const mapped = Array.isArray(raw) ? raw.map((p, i) => normalizePost(p, i)) : [];
      setPosts(mapped);
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar posts.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!id) {
      alert("Este post não possui ID válido para exclusão.");
      return;
    }
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      const res = await fetch(`/api/portal/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Falha ao excluir (HTTP ${res.status})`);
      await loadPosts();
    } catch (e: any) {
      alert(e?.message || "Erro ao excluir.");
    }
  }

  function handleEdit(id: string) {
    if (!id) {
      alert("Este post não possui ID válido para edição.");
      return;
    }
    navigate(`/admin/edit/${id}`);
  }
  function handleLogout() {
  localStorage.removeItem("authToken");
  navigate("/login");
}

  function handleCreate() {
    navigate("/admin/cadastrar");
  }

  const rows = useMemo(() => {
    return posts.map((p) => {
      const dataFmt = p.dataCriacao ? new Date(p.dataCriacao).toLocaleString("pt-BR") : "-";
      const resumo =
        (p.conteudo || "").length > 120 ? p.conteudo.slice(0, 120) + "…" : p.conteudo || "";
      return { ...p, dataFmt, resumo };
    });
  }, [posts]);

  return (
    <Page>
      <TopBar>
        
        <Title>
          Administração de Posts <Badge>{posts.length}</Badge>
        </Title>

        <Button onClick={handleCreate}><PlusIcon /> Cadastrar</Button>
       
      </TopBar>

      {error && <p style={{ color: "#a61b1b", marginBottom: 12 }}>{error}</p>}

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Título</th>
              <th style={{ width: "14%" }}>Autor</th>
              <th style={{ width: "18%" }}>Data</th>
              <th>Conteúdo</th>
              <th style={{ width: "120px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: 20 }}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 20 }}>Nenhum post encontrado.</td></tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={r.rowKey || `row-${idx}`}>
                  <td>{r.titulo}</td>
                  <td>{r.autor}</td>
                  <td>{r.dataFmt}</td>
                  <td>{r.resumo}</td>
                  <td>
                    <Actions>
                      <IconBtn title="Editar" onClick={() => handleEdit(r.id)}><EditIcon /></IconBtn>
                      <IconBtn title="Excluir" onClick={() => handleDelete(r.id)}><TrashIcon /></IconBtn>
                    </Actions>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>

      <DangerZone>
                        <Button variant="danger" onClick={handleLogout}>Sair</Button>
      </DangerZone>
    </Page>
  );
}
