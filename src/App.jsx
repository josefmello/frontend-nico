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
      </Routes>
    </BrowserRouter>
  );
}

export default App;