// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

type Post = {
  id: string;
  rowKey: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string | Date;
  autor: string;
  searchKey: string; // campos em minúsculas para busca rápida
};

const Page = styled.div`
  max-width: 1000px;
  margin: 32px auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 22px;
  margin: 0 0 12px;
  color: #2b2b2b;
  text-align:center;
  margin-top:50px;
  margin-bottom: 50px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  span {
    font-weight: 700;
    color: #2b2b2b;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 280px;
  padding: 10px 12px;
  border: 1px solid #cfd6e4;
  border-radius: 8px;
  font-size: 14px;

  &::placeholder { color: #8a97b1; }

  &:focus {
    outline: none;
    border-color: #2970ff;
    box-shadow: 0 0 0 3px rgba(41,112,255,.15);
  }
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

  thead th {
    background: #eef3fb;
    color: #2b2b2b;
    font-weight: 700;
  }

  th, td {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid #e8edf6;
    vertical-align: top;
  }

  tbody tr:last-child td { border-bottom: 0; }
  tbody tr.clickable { cursor: pointer; }
  tbody tr.clickable:hover { background: #e9f0ff; }
`;

const ErrorMsg = styled.p`
  margin: 8px 0 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #ffe9e9;
  color: #a61b1b;
  font-size: 13px;
`;

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // debounce 250ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  function normalizePost(p: any, idx: number): Post {
    const realId = p?.id ?? p?._id ?? "";
    const id = realId ? String(realId) : "";
    const rowKey = id || `${idx}-${p?.titulo ?? ""}-${p?.autor ?? ""}`;
    const titulo = p?.titulo ?? "";
    const autor = p?.autor ?? "";
    const conteudo = p?.conteudo ?? "";
    return {
      id,
      rowKey,
      titulo,
      conteudo,
      dataCriacao: p?.dataCriacao ?? "",
      autor,
      searchKey: `${titulo} ${autor} ${conteudo}`.toLowerCase(),
    };
  }

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/portal");
        if (!res.ok) throw new Error("Erro ao buscar posts");

        const raw = (await res.json()) as any[];
        const mapped = Array.isArray(raw)
          ? raw
              .map((p, i) => normalizePost(p, i))
              .filter((p) => p.id && p.id !== "undefined" && p.id !== "null")
          : [];

        if (!abort) setPosts(mapped);
      } catch (e: any) {
        if (!abort) setError(e?.message ?? "Erro desconhecido");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, []);

  const filtro = useMemo(() => {
    if (!debouncedQuery) return posts;
    return posts.filter((p) => p.searchKey.includes(debouncedQuery));
  }, [posts, debouncedQuery]);

  const handleRowClick = (id?: string) => {
    if (!id) return;
    navigate(`/ler/${id}`);
  };

  const rows = useMemo(() => {
    return filtro.map((p) => ({
      ...p,
      conteudoResumido:
        (p.conteudo || "").length > 140 ? p.conteudo.slice(0, 140) + "…" : p.conteudo || "",
    }));
  }, [filtro]);

  return (

    <div>
            <Page>
      <Header></Header>
      <Title>Postagens</Title>

      <FilterBar>
        <span>Filtrar:</span>
        <SearchInput
          type="search"
          placeholder="Digite uma palavra (título, autor ou descrição)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filtrar postagens"
        />
      </FilterBar>

      {loading && <p>Carregando…</p>}
      {error && <ErrorMsg>Erro: {error}</ErrorMsg>}

      {!loading && !error && (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Título</th>
                <th style={{ width: "18%" }}>Autor</th>
                <th>Conteúdo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((post) => (
                <tr
                  key={post.rowKey}
                  className="clickable"
                  onClick={() => handleRowClick(post.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleRowClick(post.id);
                  }}
                >
                  <td>{post.titulo}</td>
                  <td>{post.autor}</td>
                  <td>{post.conteudoResumido}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Nenhum resultado para “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </Page>
    </div>
    
  );
}

export default Home;
