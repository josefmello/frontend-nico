import "../css/ComponentesNico.css"

function LayoutNico({ titulo, children }) {
  return (
    <div className="nico-app">
      <header className="nico-topo">
        <div className="nico-logo" aria-label="Nico">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M50 8C27 8 9 24 9 46c0 13 7 24 18 31 0 6-2 11-6 15 8 0 16-3 21-8 3 .6 5 .8 8 .8 23 0 41-16 41-39S73 8 50 8Z"
              fill="#B3E0FA"
              stroke="#2B9BE8"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            <circle cx="36" cy="40" r="5" fill="#2B9BE8" />
            <circle cx="64" cy="40" r="5" fill="#2B9BE8" />
            <path d="M36 55c4 8 24 8 28 0" fill="none" stroke="#2B9BE8" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span>Nico</span>
        </div>
        <div className="nico-modos" aria-label="Modo atual">
          <span className="nico-modo nico-modo-ativo">Administrador</span>
          <span className="nico-modo">Usuário</span>
        </div>
      </header>

      <div className="nico-corpo">
        <aside className="nico-lateral" aria-hidden="true">
          <span className="nico-avatar">N</span>
        </aside>
        <main className="nico-principal">
          <section className="nico-cartao">
            <h1 className="nico-titulo">{titulo}</h1>
            {children}
          </section>
        </main>
      </div>
    </div>
  )
}

function CampoCor({ rotulo, valor, onChange }) {
  const id = `cor-${rotulo.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div className="nico-linha">
      <label className="nico-rotulo" htmlFor={id}>{rotulo}</label>
      <span className="nico-amostra" style={{ backgroundColor: valor }} aria-hidden="true" />
      <div className="nico-roda">
        <input
          id={id}
          type="color"
          value={valor}
          onChange={(event) => onChange(event.target.value)}
          aria-label={rotulo}
        />
      </div>
    </div>
  )
}

function Visualizacao({
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
    <div className="nico-previa">
      <span className="nico-mini-titulo">{titulo}</span>
      <div className="nico-tile">
        <div className="nico-tile-imagem" style={{ backgroundColor: corFundo }}>
          {imagem ? <img src={imagem} alt="" /> : padrao}
        </div>
        {mostrarLegenda && (
          <div className="nico-tile-legenda" style={{ backgroundColor: corFundoLegenda, color: corLegenda }}>
            {nome}
          </div>
        )}
      </div>
    </div>
  )
}

function IconeImagemMais() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
      <rect x="8" y="12" width="48" height="40" rx="5" />
      <circle cx="23" cy="26" r="5" />
      <path d="m12 46 14-13 10 9 6-6 10 10M32 17v16m-8-8h16" />
    </svg>
  )
}

function IconeMicrofone() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
      <rect x="24" y="8" width="16" height="32" rx="8" />
      <path d="M16 30a16 16 0 0 0 32 0M32 46v10m-10 0h20" />
    </svg>
  )
}

export { LayoutNico, CampoCor, Visualizacao, IconeImagemMais, IconeMicrofone }
