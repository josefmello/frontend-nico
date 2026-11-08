import "./Auth.css"
import nicoLogo from "../assets/logo-nico.svg"

/**
 * Casca visual das telas de acesso (login, cadastro, recuperação de senha):
 * logo + card central com título. Mantém o design system em um só lugar.
 */
function AuthLayout({ titulo, subtitulo, largo = false, tituloRef, children }) {
  return (
    <main className="auth-pagina">
      {/* <div>, e não <section>: o TelaPrincipal.css tem um seletor global "section" que vazaria para cá */}
      <div className={largo ? "auth-card auth-card--largo" : "auth-card"}>
        {/* Logo (que já traz o nome do app) DENTRO do card, no topo do formulário */}
        <img src={nicoLogo} alt="Nico — Comunicador Aumentativo Alternativo" className="auth-logo" />

        <h1 id="auth-titulo" className="auth-titulo" ref={tituloRef} tabIndex={-1}>
          {titulo}
        </h1>
        {subtitulo && <p className="auth-subtitulo">{subtitulo}</p>}
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
