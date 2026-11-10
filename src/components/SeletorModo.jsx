import "./SeletorModo.css";

function SeletorModo({
  modo = "comunicacao",
  onChange,
  desabilitado = false,
}) {
  const selecionarModo = (novoModo) => {
    if (
      desabilitado ||
      novoModo === modo
    ) {
      return;
    }

    onChange?.(novoModo);
  };

  return (
    <div
      className="seletor-modo"
      role="group"
      aria-label="Selecionar modo da aplicação"
    >
      <button
        type="button"
        className={
          modo === "comunicacao"
            ? "seletor-modo__opcao seletor-modo__opcao--ativa"
            : "seletor-modo__opcao"
        }
        aria-pressed={
          modo === "comunicacao"
        }
        disabled={desabilitado}
        onClick={() =>
          selecionarModo("comunicacao")
        }
      >
        Modo Comunicação
      </button>

      <button
        type="button"
        className={
          modo === "edicao"
            ? "seletor-modo__opcao seletor-modo__opcao--ativa"
            : "seletor-modo__opcao"
        }
        aria-pressed={
          modo === "edicao"
        }
        disabled={desabilitado}
        onClick={() =>
          selecionarModo("edicao")
        }
      >
        Modo Edição
      </button>
    </div>
  );
}

export default SeletorModo;
