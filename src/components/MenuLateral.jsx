import {
  useEffect,
  useRef,
} from "react";

import "./MenuLateral.css";

import nicoLogo from "../assets/logo-nico.svg";

const ITENS = [
  {
    id: "perfil",
    rotulo: "Editar Perfil",
  },
  {
    id: "usuario",
    rotulo: "Edição de Usuário",
  },
  {
    id: "adicionarBotao",
    rotulo: "Adicionar Botão",
  },
  {
    id: "editarBotao",
    rotulo: "Editar Botões",
  },
  {
    id: "adicionarCategoria",
    rotulo: "Adicionar Categoria",
  },
  {
    id: "editarCategoria",
    rotulo: "Editar Categorias",
  },
  {
    id: "relatorios",
    rotulo: "Relatórios",
  },
];

function MenuLateral({
  secaoAtiva,
  onSelecionar = () => { },
}) {
  const menuRef =
    useRef(null);

  useEffect(() => {
    menuRef.current
      ?.querySelector(
        '[aria-current="page"]'
      )
      ?.scrollIntoView({
        inline: "center",
        block: "nearest",
      });
  }, [secaoAtiva]);

  return (
    <nav
      className="menu-lateral"
      aria-label="Menu de edição"
      ref={menuRef}
    >
      <img
        src={nicoLogo}
        alt="Nico"
        className="menu-logo"
      />

      {ITENS.map((item) => {
        const ativo =
          secaoAtiva === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={
              ativo
                ? "menu-item ativo"
                : "menu-item"
            }
            aria-current={
              ativo
                ? "page"
                : undefined
            }
            onClick={() =>
              onSelecionar(item.id)
            }
          >
            {item.rotulo}
          </button>
        );
      })}
    </nav>
  );
}

export default MenuLateral;