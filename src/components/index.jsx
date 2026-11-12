import "./NicoForms.css"

// Casca do conteúdo das telas de edição. A barra de modos e o menu lateral ficam no
// layout do administrador (pages/Inicio.jsx), para que a troca de tela aconteça por estado.
export function LayoutNico({
  titulo,
  children,
  className = "",
}) {
  const classes = [
    "nico-formulario-pagina",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={classes}>
      <h1>{titulo}</h1>
      {children}
    </main>
  );
}

export function CampoCor({ rotulo, valor, onChange }) {
  const id = `cor-${rotulo.toLowerCase().replaceAll(" ", "-")}`
  return (
    <div className="nico-linha">
      <label className="nico-rotulo" htmlFor={id}>{rotulo}</label>
      {/* O <input type="color"> continua sendo o controle real (teclado e leitor de tela),
          mas fica invisível sobre um botão circular que exibe a cor escolhida. */}
      <div className="nico-cor-grupo">
        <span className="nico-cor-circulo" style={{ backgroundColor: valor }}>
          <input
            id={id}
            className="nico-cor"
            type="color"
            value={valor}
            onChange={(event) => onChange(event.target.value)}
          />
        </span>
        <span className="nico-cor-valor" aria-hidden="true">{valor.toUpperCase()}</span>
      </div>
    </div>
  )
}

export function Visualizacao({
  titulo,
  imagem,
  padrao,
  nome,
  mostrarLegenda,
  corFundo,
  corFundoLegenda,
  corLegenda,
}) {
  return (
    <div className="nico-visualizacao">
      <span className="nico-mini-titulo">{titulo}</span>
      <div className="nico-preview" style={{ backgroundColor: corFundo }}>
        {imagem ? (
          <img src={imagem} alt="" />
        ) : padrao ? (
          <span aria-hidden="true">{padrao}</span>
        ) : (
          <span className="nico-preview-vazio">Sem foto</span>
        )}
        {mostrarLegenda && (
          <span
            className="nico-preview-legenda"
            style={{ backgroundColor: corFundoLegenda, color: corLegenda }}
          >
            {nome || " "}
          </span>
        )}
      </div>
    </div>
  )
}

export function IconeImagemMais() {
  return <span className="nico-icone-upload" aria-hidden="true">＋</span>
}

export function IconeMicrofone() {
  return <span className="nico-icone-upload" aria-hidden="true">🎙</span>
}
