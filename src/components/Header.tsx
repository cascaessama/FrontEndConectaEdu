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
  @media (max-width: 600px) {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    padding: 0 8px;
  }
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
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-right: 0;
  }
`;

const Menu = styled.nav`
  display: flex;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(41,112,255,0.06);
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 6px;
    width: 100%;
    box-shadow: none;
  }
`;

const Item = styled(NavLink)`
  box-sizing: border-box;
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
  @media (max-width: 600px) {
    box-sizing: border-box;
    padding: 10px 12px;
    font-size: 1rem;
    width: 100%;
    text-align: center;
    margin: 0;
  }
`;

const LogoutButton = styled.button`
  box-sizing: border-box;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 700;
  color: #fff;
  background: #e53935;
  border: 1px solid #e53935;
  cursor: pointer;
  transition: background .2s, color .2s, box-shadow .2s, transform .2s;
  box-shadow: 0 2px 8px rgba(229,57,53,0.12);
  text-align: center;
  display: block;
  @media (max-width: 600px) {
    box-sizing: border-box;
    padding: 10px 12px;
    font-size: 1rem;
    width: 100%;
    text-align: center;
    margin: 0;
    display: block;
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
  const brandPath = isLogged ? "/admin" : "/";
  return (
    <Bar>
      <Container>
        <Brand to={brandPath}>
          <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px'}}>
            <img src={logo} alt="Logo" style={{height: '32px', width: '32px'}} />
            ConectaEdu
          </span>
        </Brand>
        <Menu>
          <Item to={homePath} end>Home</Item>
          {isLogged ? (
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          ) : (
            <Item to="/login">Entrar</Item>
          )}
        </Menu>
      </Container>
    </Bar>
  );
}
