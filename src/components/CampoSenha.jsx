import { useState } from "react"
import Campo from "./Campo.jsx"

/** Campo de senha com botão "Mostrar/Ocultar" (ajuda muito em celular e para quem digita devagar). */
function CampoSenha({ id, label, value, onChange, onBlur, autoComplete, ...campo }) {
  const [visivel, setVisivel] = useState(false)

  return (
    <Campo id={id} label={label} {...campo}>
      {(a11y) => (
        <div className="auth-senha">
          <input
            {...a11y}
            type={visivel ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
          />
          <button
            type="button"
            className="auth-mostrar"
            onClick={() => setVisivel((v) => !v)}
            aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          >
            {visivel ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      )}
    </Campo>
  )
}

export default CampoSenha
