// src/componentes/Header.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.header`
  background: #f7f9fc;
  box-shadow: 0 6px 20px rgba(0,0,0,.06);
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Brand = styled(NavLink)`
  font-weight: 800;
  color: #1e293b;
  text-decoration: none;
  margin-right: auto;
  &:hover { opacity: .9; }
`;

const Menu = styled.nav`
  display: flex;
  gap: 8px;
`;

const Item = styled(NavLink)`
  padding: 8px 14px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  color: #2b2b2b;
  border: 1px solid #cfd6e4;
  background: #ffffff;
  transition: background .2s ease, color .2s ease;

  &:hover { background: #f0f4ff; }

  &.active {
    background: #2970ff;
    border-color: #2970ff;
    color: #ffffff;
  }
`;

export default function Header() {
  return (
    <Bar>
      <Container>
        <Brand to="/">ConectaEdu</Brand>
        <Menu>
          <Item to="/" end>Home</Item>
          <Item to="/login">Entrar</Item>
        </Menu>
      </Container>
    </Bar>
  );
}
