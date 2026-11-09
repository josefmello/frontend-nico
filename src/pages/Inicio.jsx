import { useState } from "react"
import "./Inicio.css"
import BarraTopo from "../components/BarraTopo.jsx"
import MenuLateral from "../components/MenuLateral.jsx"
import PinAuthModal from "../components/PinAuthModal.jsx"
import { LayoutNico } from "../components/index.jsx"
import TelaPrincipal from "./TelaPrincipal.jsx"
import AdicionarBotao from "./AdicionarBotão.jsx"
import EditarCategoria from "./EditarCategoria.jsx"
import Relatorio from "./Relatorio.jsx"
import EditarPerfil from "./EditarPerfil.jsx"
import EdicaoUsuario from "./EdicaoUsuario.jsx"

// Seções que ainda não têm tela própria: mostram um aviso simples no lugar certo do layout.
function EmBreve({ titulo }) {
  return (
    <LayoutNico titulo={titulo}>
      <div className="nico-secao">
        <p className="admin-em-breve">Esta área estará disponível em breve.</p>
      </div>
    </LayoutNico>
  )
}

// id do item do MenuLateral -> componente exibido na área de conteúdo
const SECOES = {
  perfil: EditarPerfil,
  botoes: AdicionarBotao,
  categorias: EditarCategoria,
  relatorios: Relatorio,
  usuario: EdicaoUsuario,
}

/**
 * Layout do Administrador (componente único).
 * Dois estados controlam tudo, sem recarregar a página e sem mudar a URL:
 *  - modo:  "comunicacao" (quadro de comunicação) ou "edicao" (menu lateral + telas de edição)
 *  - secao: qual item do menu lateral está aberto no Modo Edição
 * `secaoInicial` permite abrir direto numa seção (ex.: links antigos /gerenciar-botoes).
 */
function Inicio({ secaoInicial }) {
  // O Modo Edição é protegido: a tela sempre começa em "comunicacao" e só muda depois que o
  // pop-up de senha for aprovado pela API. Abrir direto numa seção (ex.: /relatorio) também pede a senha.
  const [modo, setModo] = useState("comunicacao")
  const [secao, setSecao] = useState(secaoInicial || "botoes")
  const [pedindoSenha, setPedindoSenha] = useState(Boolean(secaoInicial))

  const edicao = modo === "edicao"
  const Conteudo = SECOES[secao] || AdicionarBotao

  const mudarModo = (novoModo) => {
    if (novoModo === "comunicacao") {
      setModo("comunicacao") // sair do modo de edição não precisa de senha
    } else if (!edicao) {
      setPedindoSenha(true) // entrar nele só depois da autenticação
    }
  }

  const aoAutenticar = () => {
    setPedindoSenha(false)
    setModo("edicao")
  }

  return (
    <div className={edicao ? "admin-layout admin-layout--edicao" : "admin-layout"}>
      <BarraTopo modo={modo} onMudarModo={mudarModo} />

      {edicao && <MenuLateral secaoAtiva={secao} onSelecionar={setSecao} />}

      {edicao ? <Conteudo /> : <TelaPrincipal />}

      {pedindoSenha && <PinAuthModal onFechar={() => setPedindoSenha(false)} onSucesso={aoAutenticar} />}
    </div>
  )
}

export default Inicio
