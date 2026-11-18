import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EsqueciSenha.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import RecuperarSenhaEmail from "./RecuperarSenhaEmail.jsx"
import ForcaSenha from "../components/ForcaSenha.jsx"
import { validarSenhaNova } from "../utils/validacao.js"
import { lerIdAdministradorLogado, redefinirSenhaAdministrador } from "../service/Administrador.js"

// Sem rota de recuperação por e-mail no back-end: a senha só pode ser trocada com a sessão
// do administrador ativa, confirmando o PIN atual (POST /api/login/pin) e salvando via PUT.
function EsqueciSenha() {
  const navigate = useNavigate()
  const tituloRef = useRef(null)
  const logado = Boolean(lerIdAdministradorLogado() && localStorage.getItem("token"))

  const [pin, setPin] = useState("")
  const [senha, setSenha] = useState("")
  const [csenha, setCSenha] = useState("")
  const [tocado, setTocado] = useState(false)
  const [erroApi, setErroApi] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [concluido, setConcluido] = useState(false)

  const erros = {
    pin: pin.length === 4 ? "" : "Digite o PIN de 4 dígitos.",
    senha: validarSenhaNova(senha),
    csenha: csenha === senha ? "" : "As senhas não coincidem.",
  }

  useEffect(() => {
    if (concluido) tituloRef.current?.focus()
  }, [concluido])

  const enviar = async (e) => {
    e.preventDefault()
    setTocado(true)
    setErroApi("")

    const primeiro = ["pin", "senha", "csenha"].find((c) => erros[c])
    if (primeiro) {
      document.getElementById(`esq-${primeiro}`)?.focus()
      return
    }

    try {
      setCarregando(true)
      await redefinirSenhaAdministrador(pin, senha)
      setConcluido(true)
    } catch (erro) {
      const status = erro.response?.status
      setErroApi(
        [400, 401].includes(status)
          ? "PIN incorreto. Tente novamente."
          : "Não foi possível redefinir a senha. Tente novamente.",
      )
    } finally {
      setCarregando(false)
    }
  }

  if (!logado) return <RecuperarSenhaEmail />

  if (concluido) {
    return (
      <AuthLayout titulo="Senha redefinida" tituloRef={tituloRef}>
        <div className="esqueci-sucesso">
          <div className="esqueci-icone" aria-hidden="true">✓</div>
          <p className="esqueci-mensagem" role="status">Sua nova senha já está valendo.</p>
        </div>
        <div className="auth-acoes">
          <button type="button" className="auth-btn auth-btn--primario" onClick={() => navigate("/comunicador")}>
            Voltar ao comunicador
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      titulo="Esqueci minha senha"
      subtitulo="Confirme o seu PIN para criar uma nova senha."
      tituloRef={tituloRef}
    >
      <form onSubmit={enviar} noValidate>
        <Campo id="esq-pin" label="PIN atual" erro={tocado ? erros.pin : ""}>
          {(a11y) => (
            <input
              {...a11y}
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          )}
        </Campo>

        <Campo id="esq-senha" label="Nova senha" erro={tocado ? erros.senha : ""}>
          {(a11y) => (
            <input
              {...a11y}
              type="password"
              autoComplete="new-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          )}
        </Campo>
        <ForcaSenha id="esq-forca" senha={senha} />

        <Campo id="esq-csenha" label="Confirme a nova senha" erro={tocado ? erros.csenha : ""}>
          {(a11y) => (
            <input
              {...a11y}
              type="password"
              autoComplete="new-password"
              value={csenha}
              onChange={(e) => setCSenha(e.target.value)}
            />
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
            {carregando ? "Salvando..." : "Redefinir senha"}
          </button>
          <button type="button" className="auth-btn auth-btn--secundario" onClick={() => navigate("/comunicador")}>
            Cancelar
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default EsqueciSenha
