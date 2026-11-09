import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroAdministrador from "./pages/CadastroAdministrador.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import Inicio from "./pages/Inicio.jsx";

function App() {
 return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/principal" element={<Inicio />} />
       <Route path="/comunicador" element={<Inicio />} />
       <Route path="/relatorio" element={<Inicio secaoInicial="relatorios" />} />
       <Route path="/cadastroadm" element={<CadastroAdministrador />} />
       <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;