import AdicionarBotao from "./pages/AdicionarBotao.jsx"
import CadastroAdministrador from "./pages/CadastroAdministrador.jsx"
import CadastroUsuario from "./pages/CadastroUsuario.jsx"
import EditarCategoria from "./pages/EditarCategoria.jsx"
import LoginUsuario from "./pages/LoginUsuario.jsx"
import RelatorioUso from "./pages/RelatorioUso.jsx"
import "./css/App.css"

const paginas = {
  "/": { titulo: "Login", componente: LoginUsuario },
  "/cadastro-administrador": { titulo: "Cadastro administrador", componente: CadastroAdministrador },
  "/cadastro-usuario": { titulo: "Cadastro usuário", componente: CadastroUsuario },
  "/adicionar-botao": { titulo: "Adicionar botão", componente: AdicionarBotao },
  "/editar-categoria": { titulo: "Editar categoria", componente: EditarCategoria },
  "/relatorio-uso": { titulo: "Relatório de uso", componente: RelatorioUso },
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
        <pagina.componente />
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