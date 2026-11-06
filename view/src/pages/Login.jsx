import { useState } from "react"
import "./Login.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import CampoSenha from "../components/CampoSenha.jsx"
import { validarEmail } from "../utils/validacao.js"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [tocados, setTocados] = useState({})

  // Erros derivados do estado: só aparecem depois que o campo foi "tocado" (blur ou envio)
  const erros = {
    email: validarEmail(email),
    senha: senha ? "" : "Digite sua senha.",
  }
  const visivel = (campo) => (tocados[campo] ? erros[campo] : "")
  const tocar = (campo) => setTocados((t) => (t[campo] ? t : { ...t, [campo]: true }))

  const entrar = (e) => {
    e.preventDefault()
    setTocados({ email: true, senha: true })

    const primeiroInvalido = ["email", "senha"].find((campo) => erros[campo])
    if (primeiroInvalido) {
      document.getElementById(primeiroInvalido)?.focus()
      return
    }

    // TODO: integrar com a API de autenticação quando o backend estiver pronto.
  }

  return (
    <AuthLayout titulo="Entrar" subtitulo="Que bom ver você de novo! Entre para continuar.">
      <form onSubmit={entrar} noValidate>
        <Campo id="email" label="E-mail" erro={visivel("email")}>
          {(a11y) => (
            <input
              {...a11y}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => tocar("email")}
            />
          )}
        </Campo>

        <CampoSenha
          id="senha"
          label="Senha"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={() => tocar("senha")}
          erro={visivel("senha")}
        />

        <div className="login-extras">
          <a className="auth-link" href="/esqueci-senha">
            Esqueci minha senha
          </a>
        </div>

        <div className="auth-acoes">
          <button type="submit" className="auth-btn auth-btn--primario">
            Entrar
          </button>

          <p className="login-divisor">
            <span>ainda não tem conta?</span>
          </p>

          <a className="auth-btn auth-btn--secundario" href="/cadastro-usuario">
            Criar conta
          </a>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login
