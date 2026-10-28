import { useState } from "react"
import "../css/LoginUsuario.css"

function LogoNico() {
  return (
    <div className="login-logo">
      <svg viewBox="0 0 100 100" role="img" aria-label="Logo do Nico">
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
  )
}

function LoginUsuario() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})

  const entrar = (e) => {
    e.preventDefault()

    const novosErros = {}
    if (!email.trim()) novosErros.email = 'Informe seu email.'
    if (!senha.trim()) novosErros.senha = 'Informe sua senha.'
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) return

    const usuario = { email: email.trim(), senha }
    console.log(usuario)
  }

  return (

    <div className="login-pagina">

      <main className="login-principal">

        <form className="login-card" onSubmit={entrar} noValidate>

          <LogoNico />

          <div className="login-campos">

            <div className="login-campo">

              <label className="login-label" htmlFor="email">Login</label>
              <input
                id="email"
                className={erros.email ? 'login-input login-input-erro' : 'login-input'}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erros.email && <p className="login-erro">{erros.email}</p>}

            </div>

            <div className="login-campo">

              <label className="login-label" htmlFor="senha">Senha</label>
              <input
                id="senha"
                className={erros.senha ? 'login-input login-input-erro' : 'login-input'}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {erros.senha && <p className="login-erro">{erros.senha}</p>}

            </div>

            <button className="login-esqueci" type="button">Esqueci minha senha</button>

            <div className="login-acoes">

              <button className="login-botao login-botao-secundario" type="button">Criar Conta</button>

              <button className="login-botao login-botao-principal" type="submit">Entrar</button>

            </div>

          </div>

        </form>

      </main>

      <footer className="login-rodape">

        <a className="login-fale-conosco" href="#fale-conosco">Fale Conosco</a>

        <div className="login-redes">

          <a href="#instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>

          <a href="#linkedin" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 0 1 6 0v4" />
            </svg>
          </a>

          <a href="#x" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>

        </div>

      </footer>

    </div>

  )

}

export default LoginUsuario;
