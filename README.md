

<div align="center">
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
	<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
	<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</div>

# 🚀 FrontEnd ConectaEdu


Bem-vindo ao projeto **FrontEnd ConectaEdu**! Este é o frontend de uma plataforma educacional moderna, desenvolvida com React, TypeScript e Vite.

---


## 📑 Índice


- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🌐 Aplicação Online](#-aplicação-online)
- [🐳 Como executar via Docker](#-como-executar-via-docker)
- [🚩 Como rodar o projeto localmente](#-como-rodar-o-projeto-localmente)
- [📝 Funcionalidades](#-funcionalidades)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)

---

---


## 🛠️ Tecnologias Utilizadas
- <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" height="20"/> [React](https://react.dev/)
- <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" height="20"/> [TypeScript](https://www.typescriptlang.org/)
- <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=FFD62E" height="20"/> [Vite](https://vitejs.dev/)
- <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" height="20"/> [ESLint](https://eslint.org/)
- <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" height="20"/> [Docker](https://www.docker.com/)

---


## 🌐 Aplicação Online <img src="https://img.icons8.com/color/48/000000/internet--v1.png" height="24"/>

Acesse a aplicação está disponível em:

[https://frontend-conectaedu.onrender.com/](https://frontend-conectaedu.onrender.com/)

**Obs.: O primeiro acesso pode apresentar erros, pois Render apresenta um delay para ativar o backend. Para agilizar o carregamento é recomendado acessar o [backend](https://conectaedu.onrender.com), aguardar alguns instantes e recarregar a página**

---


## 🐳 Como executar via Docker <img src="https://img.icons8.com/color/48/000000/docker.png" height="24"/>

Você pode rodar o projeto diretamente usando a imagem disponível no Docker Hub:

1. **Baixe a imagem:**
	```bash
	docker pull cascaessama/frontend-conectaedu
	```
2. **Execute o container:**
	```bash
	docker run -d -p 5173:80 cascaessama/frontend-conectaedu
	```
3. **Acesse no navegador:**
	[http://localhost:5173](http://localhost:5173)

Pronto! O frontend estará disponível localmente usando Docker.

---


## 🚩 Como rodar o projeto localmente <img src="https://img.icons8.com/color/48/000000/source-code.png" height="24"/>

1. **Clone o repositório:**
	```bash
	git clone https://github.com/cascaessama/FrontEndConectaEdu.git
	cd FrontEndConectaEdu
	```
2. **Instale as dependências:**
	```bash
	npm install
	```
3. **Inicie o servidor de desenvolvimento:**
	```bash
	npm run dev
	```
4. **Acesse no navegador:**
	[http://localhost:5173](http://localhost:5173)

---

---

## 📝 Funcionalidades
---

### <img src="https://img.icons8.com/color/48/000000/student-male--v1.png" height="24"/> Acesso alunos
#### <img src="https://img.icons8.com/color/24/000000/home--v1.png"/> Homepage
Página inicial amigável e intuitiva, onde os alunos podem visualizar novidades e informações importantes da plataforma.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/Homepage/web.png" alt="Homepage Web" width="40%" />
	<img src="images/Homepage/mobile.png" alt="Homepage Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/search--v1.png"/> Pesquisa
Permite aos alunos buscar rapidamente por posts, conteúdos e informações relevantes dentro da plataforma, facilitando o acesso ao que desejam encontrar.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/PesquisaAluno/web.png" alt="Pesquisa Aluno Web" width="40%" />
	<img src="images/PesquisaAluno/mobile.png" alt="Pesquisa Aluno Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/news.png"/> Exibição de posts
Os alunos têm acesso a uma lista de posts publicados, podendo visualizar detalhes e interagir com o conteúdo disponibilizado pelos professores.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/exibicao/web.png" alt="Exibição de Posts Web" width="40%" />
	<img src="images/exibicao/mobile.png" alt="Exibição de Posts Mobile" width="40%" />
</div>

---

### <img src="https://img.icons8.com/color/48/000000/teacher.png" height="24"/> Acesso professor
#### <img src="https://img.icons8.com/color/24/000000/login-rounded-right.png"/> Login
Área para autenticação dos professores, garantindo acesso seguro às funcionalidades administrativas da plataforma (Usuário/Senha: professor1/fiap25).

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/login/web.png" alt="Login Web" width="40%" />
	<img src="images/login/mobile.png" alt="Login Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/settings.png"/> Admin
Painel administrativo onde o professor pode gerenciar posts e visualizar publicado.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/admin/web.png" alt="Login Web" width="40%" />
	<img src="images/admin/mobile.png" alt="Login Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/search--v1.png"/> Pesquisa de post
Ferramenta que permite ao professor localizar rapidamente posts já cadastrados, facilitando a gestão e edição dos conteúdos.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/PesquisaProfessor/web.png" alt="Pesquisa Aluno Web" width="40%" />
	<img src="images/PesquisaProfessor/mobile.png" alt="Pesquisa Aluno Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/add-file.png"/> Cadastro de post
Funcionalidade para criação de novos posts, permitindo ao professor compartilhar informações, novidades e materiais com os alunos.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/cadastro/web.png" alt="Login Web" width="40%" />
	<img src="images/cadastro/mobile.png" alt="Login Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/edit-file.png"/> Edição de post
Permite ao professor atualizar e modificar posts existentes, mantendo o conteúdo sempre relevante e atualizado.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/editar/web.png" alt="Login Web" width="40%" />
	<img src="images/editar/mobile.png" alt="Login Mobile" width="40%" />
</div>

#### <img src="https://img.icons8.com/color/24/000000/delete-file.png"/> Remoção de post
Opção para excluir posts que não são mais necessários, garantindo que apenas informações relevantes permaneçam visíveis aos alunos.

<div align="center" style="display: flex; gap: 20px; justify-content: center;">
	<img src="images/remover/web.png" alt="Login Web" width="40%" />
	<img src="images/remover/mobile.png" alt="Login Mobile" width="40%" />
</div>

---



---

## 📦 Estrutura do Projeto <img src="https://img.icons8.com/color/48/000000/folder-invoices--v1.png" height="24"/>

```
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── main.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Header.tsx
│   │   └── LoginForm.tsx
│   ├── declarations.d.ts
│   └── pages/
│       ├── Admin.tsx
│       ├── Cadastrar.tsx
│       ├── Editar.tsx
│       ├── Home.tsx
│       └── LerPost.tsx
├── images/
│   ├── Homepage/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── Exibicao/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── Login/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── admin/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── cadastro/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── editar/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── remover/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── PesquisaAluno/
│   │   ├── mobile.png
│   │   └── web.png
│   ├── PesquisaProfessor/
│   │   ├── mobile.png
│   │   └── web.png
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---