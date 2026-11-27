import {
  useEffect,
  useRef,
  useState,
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

  const [menuAberto, setMenuAberto] =
    useState(false);

  const secaoAtual =
    ITENS.find(
      (item) => item.id === secaoAtiva
    )?.rotulo || "Menu administrativo";

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

  useEffect(() => {
    const fecharComEscape = (evento) => {
      if (evento.key === "Escape") {
        setMenuAberto(false);
      }
    };

    document.addEventListener(
      "keydown",
      fecharComEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        fecharComEscape
      );
    };
  }, []);

  const selecionarItem = (idItem) => {
    onSelecionar(idItem);
    setMenuAberto(false);
  };

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

      <button
        type="button"
        className="menu-lateral__alternador"
        aria-expanded={menuAberto}
        aria-controls="menu-administrativo-opcoes"
        onClick={() =>
          setMenuAberto(
            (estadoAtual) => !estadoAtual
          )
        }
      >
        <span className="menu-lateral__secao-atual">
          {secaoAtual}
        </span>

        <span
          className="menu-lateral__chevron"
          aria-hidden="true"
        >
          {menuAberto ? "▲" : "▼"}
        </span>
      </button>

      <div
        id="menu-administrativo-opcoes"
        className={
          menuAberto
            ? "menu-lateral__opcoes menu-lateral__opcoes--abertas"
            : "menu-lateral__opcoes"
        }
      >
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
                selecionarItem(item.id)
              }
            >
              {item.rotulo}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MenuLateral;
