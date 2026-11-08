import { useEffect, useRef, useState } from "react"
import "./EsqueciSenha.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import { validarEmail } from "../utils/validacao.js"

function EsqueciSenha() {
  const [email, setEmail] = useState("")
  const [tocado, setTocado] = useState(false)
  const [enviado, setEnviado] = useState(false) // alterna entre o estado 1 (formulário) e o 2 (feedback)
  const tituloRef = useRef(null)

  const erro = tocado ? validarEmail(email) : ""

  // Ao trocar de estado, leva o foco ao título para leitores de tela anunciarem a nova tela
  useEffect(() => {
    if (enviado) tituloRef.current?.focus()
  }, [enviado])

  const enviar = (e) => {
    e.preventDefault()
    setTocado(true)

    if (validarEmail(email)) {
      document.getElementById("email")?.focus()
      return
    }

    // TODO: chamar a API de recuperação de senha. A mensagem do estado 2 é neutra de propósito
    // (não revela se o e-mail existe), então ela serve igual para sucesso e para e-mail inexistente.
    setEnviado(true)
  }

  const usarOutroEmail = () => {
    setEnviado(false)
    setTocado(false)
  }

  if (enviado) {
    return (
      <AuthLayout titulo="Confira seu e-mail" tituloRef={tituloRef}>
        <div className="esqueci-sucesso">
          <div className="esqueci-icone" aria-hidden="true">
            ✉
          </div>

          <p className="esqueci-mensagem" role="status">
            Se este e-mail estiver cadastrado, enviamos as instruções de recuperação.
          </p>

        </div>

        <div className="auth-acoes">
          <a className="auth-btn auth-btn--primario" href="/login">
            Voltar ao Login
          </a>
          <button type="button" className="auth-btn auth-btn--secundario" onClick={usarOutroEmail}>
            Usar outro e-mail
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      titulo="Esqueci minha senha"
      subtitulo="Informe o e-mail da sua conta e enviaremos as instruções para criar uma nova senha."
      tituloRef={tituloRef}
    >
      <form onSubmit={enviar} noValidate>
        <Campo id="email" label="E-mail" erro={erro}>
          {(a11y) => (
            <input
              {...a11y}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTocado(true)}
            />
          )}
        </Campo>

        <div className="auth-acoes">
          <button type="submit" className="auth-btn auth-btn--primario">
            Enviar instruções
          </button>
          <a className="auth-btn auth-btn--secundario" href="/login">
            Voltar ao Login
          </a>
        </div>
      </form>
    </AuthLayout>
  )
}

export default EsqueciSenha
