import "./MenuLateral.css"
import nicoLogo from "../assets/logo-nico.svg"

function MenuLateral() {
    return (
            <nav className="menu-lateral">
                <img src={nicoLogo} alt="Nico" className="menu-logo" />
                <button>Editar Perfil</button>
                <button>Gerenciar Botões</button>
                <button>Gerenciar Categorias</button>
                <button>Relatórios</button>
            </nav>
    )
}

export default MenuLateral