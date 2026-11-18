import "./Auth.css"
import { nivelSenha, requisitosSenha } from "../utils/validacao.js"

const ROTULOS = { 1: "Fraca", 2: "Média", 3: "Forte" }

/**
 * Medidor de força + checklist de requisitos, atualizados em tempo real.
 * O nível é anunciado por texto (não só por cor) e por aria-live para leitores de tela.
 */
function ForcaSenha({ id, senha }) {
  if (!senha) return null

  const nivel = nivelSenha(senha)

  return (
    <div className="forca-senha" id={id}>
      <div className="forca-barra" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={n <= nivel ? `forca-seg forca-seg--${nivel}` : "forca-seg"} />
        ))}
      </div>
      <p className={`forca-rotulo forca-rotulo--${nivel}`} role="status">
        Força da senha: <strong>{ROTULOS[nivel]}</strong>
      </p>
      <ul className="forca-lista">
        {requisitosSenha(senha).map((r) => (
          <li key={r.id} className={r.ok ? "forca-item forca-item--ok" : "forca-item"}>
            <span aria-hidden="true">{r.ok ? "✓" : "○"} </span>
            {r.texto}
            <span className="forca-sr"> — {r.ok ? "atendido" : "falta"}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ForcaSenha
