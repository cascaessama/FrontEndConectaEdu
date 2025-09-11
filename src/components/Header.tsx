// src/componentes/Header.tsx
import React, { useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/react.svg";

const Bar = styled.header`
  background: linear-gradient(90deg, #e3ebff 0%, #f7f9fc 100%);
  box-shadow: 0 6px 20px rgba(41,112,255,.06);
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Brand = styled(NavLink)`
  font-family: 'Montserrat', 'Open Sans', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #1746a2;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(41,112,255,0.12);
  text-decoration: none;
  margin-right: auto;
  transition: color .2s;
  &:hover { opacity: .9; color: #1e293b; }
`;

const Menu = styled.nav`
  display: flex;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(41,112,255,0.06);
`;

const Item = styled(NavLink)`
  padding: 8px 18px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  color: #1e293b;
  border: 1px solid #dde6f7;
  background: #f7f9fc;
  transition: background .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1), box-shadow .2s cubic-bezier(.4,0,.2,1), transform .2s cubic-bezier(.4,0,.2,1);

  &:active {
    transform: scale(0.97);
  }

  &:hover {
    background: #e3ebff;
    color: #2970ff;
    box-shadow: 0 2px 8px rgba(41,112,255,0.08);
  }

  &.active {
    background: #2970ff;
    border-color: #2970ff;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(41,112,255,0.12);
  }
`;

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(!!localStorage.getItem("authToken"));
    const onStorage = () => setIsLogged(!!localStorage.getItem("authToken"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsLogged(false);
    window.location.href = "/";
  }, []);

  const homePath = isLogged ? "/admin" : "/";
  return (
    <Bar>
      <Container>
        <Brand to="/">
          <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px'}}>
            <img src={logo} alt="Logo" style={{height: '32px', width: '32px'}} />
            ConectaEdu
          </span>
        </Brand>
        <Menu>
          <Item to={homePath} end>Home</Item>
          {isLogged ? (
            <button
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                fontWeight: 700,
                color: "#fff",
                background: "#2970ff",
                border: "1px solid #2970ff",
                cursor: "pointer",
                transition: "background .2s, color .2s, box-shadow .2s, transform .2s",
                boxShadow: "0 2px 8px rgba(41,112,255,0.12)",
              }}
              onClick={handleLogout}
            >
              Sair
            </button>
          ) : (
            <Item to="/login">Entrar</Item>
          )}
        </Menu>
      </Container>
    </Bar>
  );
}
