import { useRef, useState } from "react"
import "./CadastroUsuario.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import CampoSenha from "../components/CampoSenha.jsx"
import { validarEmail } from "../utils/validacao.js"

const LIMITE_BIOGRAFIA = 500
const MIN_SENHA = 8

function CadastroUsuario() {
  const [nome, setNome] = useState("")
  const [sexo, setSexo] = useState("")
  const [dataNasc, setDataNasc] = useState("")
  const [nivelAutismo, setNivelAutismo] = useState("")
  const [biografia, setBiografia] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [tocados, setTocados] = useState({})
  const [sucesso, setSucesso] = useState(false)
  const formRef = useRef(null)

  const hoje = new Date().toISOString().split("T")[0]
  const senhasDiferentes = confirmar !== "" && senha !== confirmar

  // Erros que bloqueiam o envio (derivados do estado)
  const erros = {
    nome: nome.trim() ? "" : "Informe o nome.",
    sexo: sexo ? "" : "Selecione o sexo.",
    dataNasc: !dataNasc
      ? "Informe a data de nascimento."
      : dataNasc > hoje
        ? "A data não pode ser no futuro."
        : dataNasc < "1900-01-01"
          ? "Confira o ano de nascimento."
          : "",
    nivelAutismo: nivelAutismo ? "" : "Selecione o nível.",
    email: validarEmail(email),
    senha: !senha ? "Crie uma senha." : senha.length < MIN_SENHA ? `Use pelo menos ${MIN_SENHA} caracteres.` : "",
    confirmar: !confirmar ? "Repita a senha para confirmar." : "",
  }
  const ordem = ["nome", "dataNasc", "sexo", "nivelAutismo", "email", "senha", "confirmar"]

  const visivel = (campo) => (tocados[campo] ? erros[campo] : "")
  const tocar = (campo) => setTocados((t) => (t[campo] ? t : { ...t, [campo]: true }))
  const editar = (setter) => (e) => {
    setSucesso(false)
    setter(e.target.value)
  }

  const cadastrar = (e) => {
    e.preventDefault()
    setTocados(Object.fromEntries(ordem.map((campo) => [campo, true])))

    const invalido = ordem.find((campo) => erros[campo]) || (senhasDiferentes && "confirmar")
    if (invalido) {
      setSucesso(false)
      document.getElementById(invalido)?.focus()
      return
    }

    // TODO: enviar para a API. Nunca registrar a senha em log.
    const usuario = {
      nome: nome.trim(),
      sexo,
      dataNasc,
      nivelAutismo: Number(nivelAutismo),
      biografia: biografia.trim(),
      email: email.trim(),
    }
    console.log(usuario)
    setSucesso(true)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const senhasIguais = senha !== "" && confirmar !== "" && senha === confirmar

  return (
    <AuthLayout
      titulo="Criar conta"
      subtitulo="Preencha os dados abaixo. Os campos sem “(opcional)” são obrigatórios."
      largo
    >
      <form ref={formRef} onSubmit={cadastrar} noValidate>
        {sucesso && (
          <p className="cu-sucesso" role="status">
            ✓ Tudo certo! Os dados foram conferidos.
          </p>
        )}

        <fieldset className="auth-grupo">
          <legend>Sobre o usuário</legend>

          <div className="cu-grade">
            <div className="cu-inteira">
              <Campo id="nome" label="Nome" erro={visivel("nome")}>
                {(a11y) => (
                  <input
                    {...a11y}
                    type="text"
                    autoComplete="name"
                    placeholder="Como devemos chamar?"
                    value={nome}
                    onChange={editar(setNome)}
                    onBlur={() => tocar("nome")}
                  />
                )}
              </Campo>
            </div>

            <Campo id="dataNasc" label="Data de nascimento" erro={visivel("dataNasc")}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="date"
                  min="1900-01-01"
                  max={hoje}
                  value={dataNasc}
                  onChange={editar(setDataNasc)}
                  onBlur={() => tocar("dataNasc")}
                />
              )}
            </Campo>

              <div className="cu-inteira">
            <Campo id="sexo" label="Sexo" erro={visivel("sexo")}>
              {(a11y) => (
                <select {...a11y} value={sexo} onChange={editar(setSexo)} onBlur={() => tocar("sexo")}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro(a)</option>
                </select>
              )}
            </Campo>
            </div>

            <div className="cu-inteira">
              <Campo id="nivelAutismo" label="Nível de autismo" dica="Conforme o laudo." erro={visivel("nivelAutismo")}>
                {(a11y) => (
                  <select
                    {...a11y}
                    value={nivelAutismo}
                    onChange={editar(setNivelAutismo)}
                    onBlur={() => tocar("nivelAutismo")}
                  >
                    <option value="">Selecione</option>
                    <option value="1">Nível 1</option>
                    <option value="2">Nível 2</option>
                    <option value="3">Nível 3</option>
                  </select>
                )}
              </Campo>
            </div>

            <div className="cu-inteira">
              <Campo
                id="biografia"
                label="Biografia"
                opcional
                dica={`Hiperfocos, gostos, remédios, rotina… (${biografia.length}/${LIMITE_BIOGRAFIA})`}
              >
                {(a11y) => (
                  <textarea
                    {...a11y}
                    maxLength={LIMITE_BIOGRAFIA}
                    value={biografia}
                    onChange={editar(setBiografia)}
                  />
                )}
              </Campo>
            </div>
          </div>
        </fieldset>

        <fieldset className="auth-grupo">
          <legend>Dados de acesso</legend>

          <div className="cu-grade">
            <div className="cu-inteira">
              <Campo id="email" label="E-mail" erro={visivel("email")}>
                {(a11y) => (
                  <input
                    {...a11y}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="nome@email.com"
                    value={email}
                    onChange={editar(setEmail)}
                    onBlur={() => tocar("email")}
                  />
                )}
              </Campo>
            </div>

            <CampoSenha
              id="senha"
              label="Senha"
              autoComplete="new-password"
              dica={`Mínimo de ${MIN_SENHA} caracteres.`}
              value={senha}
              onChange={editar(setSenha)}
              onBlur={() => tocar("senha")}
              erro={visivel("senha")}
            />

            <CampoSenha
              id="confirmar"
              label="Confirmar senha"
              autoComplete="new-password"
              value={confirmar}
              onChange={editar(setConfirmar)}
              onBlur={() => tocar("confirmar")}
              erro={visivel("confirmar")}
              aviso={senhasDiferentes ? "As senhas ainda não são iguais." : ""}
              ok={senhasIguais ? "As senhas coincidem." : ""}
            />
          </div>
        </fieldset>

        <div className="auth-acoes auth-acoes--linha">
          <button type="submit" className="auth-btn auth-btn--primario">
            Registrar
          </button>
          <a className="auth-btn auth-btn--secundario" href="/login">
            Voltar ao Login
          </a>
        </div>
       
      </form>
    </AuthLayout>
  )
}

export default CadastroUsuario
