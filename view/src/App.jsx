import CadastroAdministrador from "./pages/CadastroAdministrador.jsx"
import CadastroUsuario from "./pages/CadastroUsuario.jsx"
import EsqueciSenha from "./pages/EsqueciSenha.jsx"
import Inicio from "./pages/Inicio.jsx"
import Login from "./pages/Login.jsx"
import "./App.css"

const paginas = {
  "/": { titulo: "Tela principal", componente: Inicio },
  // Mesmo layout do administrador, já aberto na seção (a troca entre seções é por estado, dentro do Inicio)
  "/gerenciar-botoes": { titulo: "Gerenciar Botões", componente: Inicio, props: { secaoInicial: "botoes" } },
  "/gerenciar-categorias": { titulo: "Gerenciar Categorias", componente: Inicio, props: { secaoInicial: "categorias" } },
  "/login": { titulo: "Login", componente: Login },
  "/cadastro-usuario": { titulo: "Cadastro usuário", componente: CadastroUsuario },
  "/esqueci-senha": { titulo: "Esqueci minha senha", componente: EsqueciSenha },
  "/cadastro-administrador": { titulo: "Cadastro administrador", componente: CadastroAdministrador },
}

function App() {
  const caminho = window.location.pathname.replace(/\/+$/, "") || "/"
  const pagina = paginas[caminho]

  return (
    <>
      <nav className="portal-navegacao" aria-label="Navegação principal">
        {Object.entries(paginas).map(([rota, item]) => (
          <a
            key={rota}
            href={rota}
            aria-current={caminho === rota ? "page" : undefined}
          >
            {item.titulo}
          </a>
        ))}
      </nav>
      {pagina ? (
        <pagina.componente {...pagina.props} />
      ) : (
        <main className="portal-nao-encontrado">
          <h1>Página não encontrada</h1>
          <a href="/">Voltar ao início</a>
        </main>
      )}
    </>
  )
}

export default App;