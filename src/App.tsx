import {  Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import Admin from "./pages/admin"
import Cadastrar from "./pages/Cadastrar"
import Editar from "./pages/Editar"
import Home from "./pages/Home"
import LerPost from "./pages/LerPost"

function App() {
  

  return (
    <>
        

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/ler/:id" element={<LerPost />} />
        <Route path="/login" element={<LoginForm />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/admin/cadastrar" element={<Cadastrar />} />
         <Route path="/admin/edit/:id" element={<Editar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  )
}

export default App
