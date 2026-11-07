import Relatorio from "./pages/Relatorio.jsx";
import Cadastro from "./pages/CadastroAdministrador.jsx"
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroAdministrador from "./pages/CadastroAdministrador.jsx";

function App() {
 return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/relatorio" element={<Relatorio/>} />
       <Route path="/cadastroadm" element={<CadastroAdministrador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;