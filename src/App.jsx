import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import TelaAdministrador from "./pages/TelaAdministrador.jsx";
import TelaPrincipal from "./pages/TelaPrincipal.jsx";
import CadastroAdministrador from "./pages/CadastroAdministrador.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import EsqueciSenha from "./pages/EsqueciSenha.jsx";
import EsqueciPin from "./pages/EsqueciPin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/administrador"
          element={
            <TelaAdministrador
              secaoInicial="relatorios"
            />
          }
        />

        <Route
          path="/comunicador"
          element={<TelaPrincipal />}
        />

        <Route
          path="/cadastroadm"
          element={
            <CadastroAdministrador />
          }
        />

        <Route
          path="/cadastro-usuario"
          element={
            <CadastroUsuario />
          }
        />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/esqueci-pin" element={<EsqueciPin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;