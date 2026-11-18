import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./EsqueciSenha.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import { lerIdAdministradorLogado, redefinirPinAdministrador } from "../service/Administrador.js"

function EsqueciPin() {
  const navigate = useNavigate()
  const tituloRef = useRef(null)
  const logado = Boolean(lerIdAdministradorLogado() && localStorage.getItem("token"))

  const [senha, setSenha] = useState("")
  const [pin, setPin] = useState("")
  const [cpin, setCPin] = useState("")
  const [tocado, setTocado] = useState(false)
  const [erroApi, setErroApi] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [concluido, setConcluido] = useState(false)

  const erros = {
    senha: senha ? "" : "Informe a senha da sua conta.",
    pin: pin.length === 4 ? "" : "O PIN precisa ter 4 dígitos.",
    cpin: cpin === pin ? "" : "Os PINs não coincidem.",
  }

  useEffect(() => {
    if (concluido) tituloRef.current?.focus()
  }, [concluido])

  const enviar = async (e) => {
    e.preventDefault()
    setTocado(true)
    setErroApi("")

    const primeiro = ["senha", "pin", "cpin"].find((c) => erros[c])
    if (primeiro) {
      document.getElementById(`pin-${primeiro}`)?.focus()
      return
    }

    try {
      setCarregando(true)
      await redefinirPinAdministrador(senha, pin)
      setConcluido(true)
    } catch (erro) {
      const status = erro.response?.status
      console.error("Erro ao redefinir o PIN (etapa: " + erro.etapa + "):", erro)
      setErroApi(
        erro.etapa === "login" && [400, 401, 403].includes(status)
          ? "Senha incorreta. Confira e tente novamente."
          : `Não foi possível redefinir o PIN (${erro.etapa ?? "rede"}${status ? ` · ${status}` : ""}). ${erro.response?.data?.message ?? "Tente novamente."}`,
      )
    } finally {
      setCarregando(false)
    }
  }

  if (!logado) {
    return (
      <AuthLayout titulo="Esqueci meu PIN" subtitulo="Para redefinir o PIN, entre primeiro na sua conta." tituloRef={tituloRef}>
        <div className="auth-acoes">
          <Link className="auth-btn auth-btn--primario" to="/">Ir para o Login</Link>
        </div>
      </AuthLayout>
    )
  }

  if (concluido) {
    return (
      <AuthLayout titulo="PIN redefinido" tituloRef={tituloRef}>
        <div className="esqueci-sucesso">
          <div className="esqueci-icone" aria-hidden="true">✓</div>
          <p className="esqueci-mensagem" role="status">Seu novo PIN já está valendo.</p>
        </div>
        <div className="auth-acoes">
          <button type="button" className="auth-btn auth-btn--primario" onClick={() => navigate("/comunicador")}>
            Voltar ao comunicador
          </button>
        </div>
      </AuthLayout>
    )
  }

  const so4 = (set) => (e) => set(e.target.value.replace(/\D/g, "").slice(0, 4))

  return (
    <AuthLayout
      titulo="Esqueci meu PIN"
      subtitulo="Confirme a senha da sua conta para criar um novo PIN de 4 dígitos."
      tituloRef={tituloRef}
    >
      <form onSubmit={enviar} noValidate>
        <Campo id="pin-senha" label="Senha da conta" erro={tocado ? erros.senha : ""}>
          {(a11y) => (
            <input {...a11y} type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          )}
        </Campo>
        <Campo id="pin-pin" label="Novo PIN" erro={tocado ? erros.pin : ""}>
          {(a11y) => (
            <input {...a11y} type="password" inputMode="numeric" autoComplete="off" maxLength={4} value={pin} onChange={so4(setPin)} />
          )}
        </Campo>
        <Campo id="pin-cpin" label="Confirme o novo PIN" erro={tocado ? erros.cpin : ""}>
          {(a11y) => (
            <input {...a11y} type="password" inputMode="numeric" autoComplete="off" maxLength={4} value={cpin} onChange={so4(setCPin)} />
          )}
        </Campo>

        {erroApi && (
          <p className="auth-msg auth-msg--erro" role="alert">
            <span aria-hidden="true">⚠ </span>
            {erroApi}
          </p>
        )}

        <div className="auth-acoes">
          <button type="submit" className="auth-btn auth-btn--primario" disabled={carregando} aria-busy={carregando}>
            {carregando ? "Salvando..." : "Redefinir PIN"}
          </button>
          <button type="button" className="auth-btn auth-btn--secundario" onClick={() => navigate("/comunicador")}>
            Cancelar
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default EsqueciPin
