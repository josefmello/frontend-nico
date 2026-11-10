import logoNico from "../assets/logo-nico.svg";
import SeletorModo from "./SeletorModo.jsx";

import "./MenuComunicador.css";

function MenuComunicador({
  modo = "comunicacao",
  onChangeModo = () => {},
  nomeUsuario = "Usuário",
  onSair = () => {},
}) {
  return (
    <header className="menu-comunicador">
      <div className="menu-comunicador__marca">
        <img
          className="menu-comunicador__logo"
          src={logoNico}
          alt="Nico"
        />
      </div>

      <div className="menu-comunicador__seletor">
        <SeletorModo
          modo={modo}
          onChange={onChangeModo}
        />
      </div>

      <div className="menu-comunicador__acoes">
        <span className="menu-comunicador__usuario">
          {nomeUsuario || "Usuário"}
        </span>

        <button
          type="button"
          className="menu-comunicador__sair"
          onClick={onSair}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default MenuComunicador;