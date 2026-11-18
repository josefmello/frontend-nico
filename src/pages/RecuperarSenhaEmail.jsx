import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import ForcaSenha from "../components/ForcaSenha.jsx"
import { validarSenhaNova } from "../utils/validacao.js"
import { solicitarRecuperacaoSenha, confirmarRecuperacaoSenha } from "../service/Administrador.js"

// Fluxo para quem NÃO está logado: e-mail -> código enviado por e-mail + nova senha.
function RecuperarSenhaEmail() {
  const tituloRef = useRef(null)
  const [etapa, setEtapa] = useState("email") // email | codigo | concluido
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [senha, setSenha] = useState("")
  const [csenha, setCSenha] = useState("")
  const [tocado, setTocado] = useState(false)
  const [erroApi, setErroApi] = useState("")
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { tituloRef.current?.focus() }, [etapa])

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const erros = {
    email: emailValido ? "" : "Digite um e-mail válido.",
    codigo: codigo.trim() ? "" : "Digite o código recebido por e-mail.",
    senha: validarSenhaNova(senha),
    csenha: csenha === senha ? "" : "As senhas não coincidem.",
  }

  const mensagemErro = (erro, padrao) => {
    const s = erro.response?.status
    if ([401, 403, 404, 405].includes(s) || !erro.response) return "Recuperação de senha indisponível no momento. Tente mais tarde."
    return padrao(s)
  }

  const enviarEmail = async (e) => {
    e.preventDefault()
    setTocado(true); setErroApi("")
    if (erros.email) return document.getElementById("rec-email")?.focus()
    try {
      setCarregando(true)
      await solicitarRecuperacaoSenha(email.trim())
      setTocado(false)
      setEtapa("codigo")
    } catch (erro) {
      setErroApi(mensagemErro(erro, () => "Não foi possível enviar o código. Tente novamente."))
    } finally { setCarregando(false) }
  }

  const redefinir = async (e) => {
    e.preventDefault()
    setTocado(true); setErroApi("")
    const primeiro = ["codigo", "senha", "csenha"].find((c) => erros[c])
    if (primeiro) return document.getElementById(`rec-${primeiro}`)?.focus()
    try {
      setCarregando(true)
      await confirmarRecuperacaoSenha(email.trim(), codigo.trim(), senha)
      setEtapa("concluido")
    } catch (erro) {
      setErroApi(mensagemErro(erro, (s) =>
        [400, 410].includes(s) ? "Código inválido ou expirado. Confira o e-mail ou peça um novo código."
          : "Não foi possível redefinir a senha. Tente novamente."))
    } finally { setCarregando(false) }
  }

  const erroBox = erroApi && (
    <p className="auth-msg auth-msg--erro" role="alert"><span aria-hidden="true">⚠ </span>{erroApi}</p>
  )

  if (etapa === "concluido") {
    return (
      <AuthLayout titulo="Senha redefinida" tituloRef={tituloRef}>
        <p className="esqueci-mensagem" role="status">Sua nova senha já está valendo. Entre com ela.</p>
        <div className="auth-acoes">
          <Link className="auth-btn auth-btn--primario" to="/">Ir para o Login</Link>
        </div>
      </AuthLayout>
    )
  }

  if (etapa === "codigo") {
    return (
      <AuthLayout titulo="Esqueci minha senha" tituloRef={tituloRef}
        subtitulo={`Se ${email.trim()} estiver cadastrado, enviamos um código de verificação para esse e-mail. Digite o código e escolha a nova senha.`}>
        <form onSubmit={redefinir} noValidate>
          <Campo id="rec-codigo" label="Código de verificação" erro={tocado ? erros.codigo : ""}>
            {(a11y) => <input {...a11y} type="text" autoComplete="one-time-code" value={codigo} onChange={(e) => setCodigo(e.target.value)} />}
          </Campo>
          <Campo id="rec-senha" label="Nova senha" erro={tocado ? erros.senha : ""}>
            {(a11y) => <input {...a11y} type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />}
          </Campo>
          <ForcaSenha id="rec-forca" senha={senha} />
          <Campo id="rec-csenha" label="Confirme a nova senha" erro={tocado ? erros.csenha : ""}>
            {(a11y) => <input {...a11y} type="password" autoComplete="new-password" value={csenha} onChange={(e) => setCSenha(e.target.value)} />}
          </Campo>
          {erroBox}
          <div className="auth-acoes">
            <button type="submit" className="auth-btn auth-btn--primario" disabled={carregando} aria-busy={carregando}>
              {carregando ? "Salvando..." : "Redefinir senha"}
            </button>
            <button type="button" className="auth-btn auth-btn--secundario" onClick={() => { setEtapa("email"); setErroApi(""); setTocado(false) }}>
              Usar outro e-mail
            </button>
          </div>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout titulo="Esqueci minha senha" subtitulo="Informe o e-mail da sua conta para receber um código de verificação." tituloRef={tituloRef}>
      <form onSubmit={enviarEmail} noValidate>
        <Campo id="rec-email" label="E-mail" erro={tocado ? erros.email : ""}>
          {(a11y) => <input {...a11y} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
        </Campo>
        {erroBox}
        <div className="auth-acoes">
          <button type="submit" className="auth-btn auth-btn--primario" disabled={carregando} aria-busy={carregando}>
            {carregando ? "Enviando..." : "Enviar código"}
          </button>
          <Link className="auth-btn auth-btn--secundario" to="/">Voltar ao Login</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default RecuperarSenhaEmail
