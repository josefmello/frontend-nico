import { useEffect, useRef } from "react"
import "./MenuLateral.css"
import nicoLogo from "../../view/src/assets/logo-nico.svg"

// `id` é a chave da seção no layout (Inicio.jsx). `emBreve`: só o botão existe, sem tela por enquanto.
const ITENS = [
    { id: "perfil", rotulo: "Editar Perfil" },
    { id: "usuario", rotulo: "Edição de Usuário", emBreve: true },
    { id: "botoes", rotulo: "Gerenciar Botões" },
    { id: "categorias", rotulo: "Gerenciar Categorias" },
    { id: "relatorios", rotulo: "Relatórios" },
]

/**
 * Menu lateral do Modo Edição. Navega por estado (sem links, sem recarregar a página):
 * quem decide o que aparece é o layout, que recebe `onSelecionar(id)`.
 */
function MenuLateral({ secaoAtiva, onSelecionar = () => {} }) {
    const menuRef = useRef(null)

    // Na faixa horizontal (celular), traz a seção aberta para a área visível do menu
    useEffect(() => {
        menuRef.current
            ?.querySelector('[aria-current="page"]')
            ?.scrollIntoView({ inline: "center", block: "nearest" })
    }, [secaoAtiva])

    return (
        <nav className="menu-lateral" aria-label="Menu de edição" ref={menuRef}>
            <img src={nicoLogo} alt="Nico" className="menu-logo" />

            {ITENS.map((item) => {
                if (item.emBreve) {
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className="menu-item"
                            aria-disabled="true"
                            title="Disponível em breve"
                        >
                            {item.rotulo}
                        </button>
                    )
                }

                const ativo = secaoAtiva === item.id
                return (
                    <button
                        key={item.id}
                        type="button"
                        className={ativo ? "menu-item ativo" : "menu-item"}
                        aria-current={ativo ? "page" : undefined}
                        onClick={() => onSelecionar(item.id)}
                    >
                        {item.rotulo}
                    </button>
                )
            })}
        </nav>
    )
}

export default MenuLateral
