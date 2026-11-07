import { useState } from "react"
import "./Inicio.css"
import BarraTopo from "../components/BarraTopo.jsx"
import MenuLateral from "../components/MenuLateral.jsx"
import { LayoutNico } from "../components"
import TelaPrincipal from "./TelaPrincipal.jsx"
import AdicionarBotao from "./AdicionarBotão.jsx"
import EditarCategoria from "./EditarCategoria.jsx"

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

function EditarPerfil() {
  return <EmBreve titulo="Editar Perfil" />
}

function Relatorios() {
  return <EmBreve titulo="Relatórios" />
}

// id do item do MenuLateral -> componente exibido na área de conteúdo
const SECOES = {
  perfil: EditarPerfil,
  botoes: AdicionarBotao,
  categorias: EditarCategoria,
  relatorios: Relatorios,
}

/**
 * Layout do Administrador (componente único).
 * Dois estados controlam tudo, sem recarregar a página e sem mudar a URL:
 *  - modo:  "comunicacao" (quadro de comunicação) ou "edicao" (menu lateral + telas de edição)
 *  - secao: qual item do menu lateral está aberto no Modo Edição
 * `secaoInicial` permite abrir direto numa seção (ex.: links antigos /gerenciar-botoes).
 */
function Inicio({ secaoInicial }) {
  const [modo, setModo] = useState(secaoInicial ? "edicao" : "comunicacao")
  const [secao, setSecao] = useState(secaoInicial || "botoes")

  const edicao = modo === "edicao"
  const Conteudo = SECOES[secao] || AdicionarBotao

  return (
    <div className={edicao ? "admin-layout admin-layout--edicao" : "admin-layout"}>
      <BarraTopo modo={modo} onMudarModo={setModo} />

      {edicao && <MenuLateral secaoAtiva={secao} onSelecionar={setSecao} />}

      {edicao ? <Conteudo /> : <TelaPrincipal />}
    </div>
  )
}

export default Inicio
