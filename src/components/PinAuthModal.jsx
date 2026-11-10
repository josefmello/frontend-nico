import { useEffect, useRef, useState } from "react"
import "./PinAuthModal.css"
import nicoLogo from "../assets/logo-nico.svg"
import { validarPin } from "../service/auth.js"

const TAMANHO_PIN = 4 
function PinAuthModal({ onFechar, onSucesso, onEsqueciSenha }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const requisicaoRef = useRef(0) // invalida respostas de tentativas abandonadas (cancelou durante o carregamento)

  const [pin, setPin] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  // <dialog> nativo em modo modal: backdrop, foco preso dentro dele e tecla ESC já vêm do navegador.
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    inputRef.current?.focus()
    return () => dialog.close()
  }, [])

  const fechar = () => {
    requisicaoRef.current += 1
    onFechar()
  }

  const entrar = async (e) => {
    e.preventDefault()
    if (carregando) return

    if (pin.length < TAMANHO_PIN) {
      setErro(pin ? `O PIN tem ${TAMANHO_PIN} dígitos.` : "Digite o PIN.")
      inputRef.current?.focus()
      return
    }

    const id = ++requisicaoRef.current
    setErro("")
    setCarregando(true)

    try {
      const dados = await validarPin(pin)
      if (id !== requisicaoRef.current) return // o usuário cancelou enquanto esperava

      // Se o back devolver um token de sessão para o modo de edição, ele substitui o atual.
      if (dados?.token) localStorage.setItem("token", dados.token)
      onSucesso()
    } catch (erroApi) {
      if (id !== requisicaoRef.current) return

      const status = erroApi.response?.status
      setErro(
        [400, 401].includes(status)
          ? "PIN incorreto. Tente novamente."
          : status === 403
            ? "Sua sessão expirou. Saia e entre novamente pelo login."
            : "Não foi possível conectar ao servidor. Tente novamente.",
      )
      setPin("")
      setCarregando(false)
      inputRef.current?.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="pin-modal"
      aria-labelledby="pin-titulo"
      onCancel={(e) => {
        e.preventDefault() // ESC: quem fecha é o estado do pai, não o navegador
        fechar()
      }}
      onClick={(e) => {
        // Clique fora do card (no backdrop) cancela
        if (e.target === dialogRef.current) fechar()
      }}
    >
      <form className="pin-card" onSubmit={entrar} noValidate>
        <img src={nicoLogo} alt="Nico" className="pin-logo" />

        <div className="pin-painel">
          <h2 id="pin-titulo" className="pin-titulo">
            Modo Edição
          </h2>
          <p className="pin-explica">Digite o PIN do administrador para continuar.</p>

          <label className="pin-rotulo" htmlFor="pin-campo">
            PIN:
          </label>
          {/* Em <div> própria: o Auth.css tem uma regra global que posiciona de forma absoluta
              qualquer <button> irmão de um input de senha (ex.: o "Esqueci minha senha" daqui). */}
          <div className="pin-campo">
            <input
              ref={inputRef}
              id="pin-campo"
              className={erro ? "pin-entrada pin-entrada--erro" : "pin-entrada"}
              type="password" /* mascarado */
              inputMode="numeric" /* teclado numérico no celular */
              pattern="[0-9]*"
              autoComplete="off" /* não é uma senha para o gerenciador de senhas guardar */
              maxLength={TAMANHO_PIN}
              value={pin}
              readOnly={carregando}
              aria-invalid={erro ? true : undefined}
              aria-describedby={erro ? "pin-erro" : undefined}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          {erro && (
            <p id="pin-erro" className="pin-erro" role="alert">
              <span aria-hidden="true">⚠ </span>
              {erro}
            </p>
          )}

          <div className="pin-acoes">
            <button type="button" className="pin-botao pin-botao--secundario" onClick={fechar}>
              Cancelar
            </button>
            <button type="submit" className="pin-botao pin-botao--principal" disabled={carregando} aria-busy={carregando}>
              {carregando && <span className="pin-spinner" aria-hidden="true" />}
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </div>

          <button type="button" className="pin-esqueci" onClick={onEsqueciSenha}>
            Esqueci minha senha
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default PinAuthModal
