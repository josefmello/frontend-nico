import "./BarraTopo.css"

/**
 * Barra superior com a alternância entre os dois modos de uso.
 * É "controlada": quem guarda o estado é o layout (Inicio.jsx), que passa `modo` e `onMudarModo`.
 */
function BarraTopo({ modo = "comunicacao", onMudarModo = () => {} }) {
    const edicao = modo === "edicao"

    return (
        <header className="barra-topo">
            <div className="barra-modos" role="group" aria-label="Modo de uso">
                <button
                    type="button"
                    className={`modo-comunicacao${edicao ? "" : " ativo"}`}
                    aria-pressed={!edicao}
                    onClick={() => onMudarModo("comunicacao")}
                >
                    Modo Comunicação
                </button>
                <button
                    type="button"
                    className={`modo-edicao${edicao ? " ativo" : ""}`}
                    aria-pressed={edicao}
                    aria-haspopup="dialog" /* pede a senha antes de abrir */
                    onClick={() => onMudarModo("edicao")}
                >
                    Modo Edição
                </button>
            </div>
        </header>
    )
}

export default BarraTopo
