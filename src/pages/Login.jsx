import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"
import AuthLayout from "../components/AuthLayout.jsx"
import Campo from "../components/Campo.jsx"
import CampoSenha from "../components/CampoSenha.jsx"
import { validarEmail } from "../utils/validacao.js"
import { realizarLogin } from "../service/Auth.js"
// IMPORTANTE: Importe a função que vai buscar os usuários (vamos criá-la no seu service)
import { buscarMeusUsuarios } from "../service/Usuario.js" 

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [tocados, setTocados] = useState({})

  const [erroApi, setErroApi] = useState("")
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  const erros = {
    email: validarEmail(email),
    senha: senha ? "" : "Digite sua senha.",
  }
  const visivel = (campo) => (tocados[campo] ? erros[campo] : "")
  const tocar = (campo) => setTocados((t) => (t[campo] ? t : { ...t, [campo]: true }))

  const entrar = async (e) => {
    e.preventDefault()
    setTocados({ email: true, senha: true })
    setErroApi("")

    const primeiroInvalido = ["email", "senha"].find((campo) => erros[campo])
    if (primeiroInvalido) {
      document.getElementById(primeiroInvalido)?.focus()
      return
    }

    try {
      setCarregando(true)

      // 1. Faz o login e guarda o token
      const dados = await realizarLogin(email, senha)
      localStorage.setItem('token', dados.token)

      // 2. Busca os usuários associados a este administrador logado
      try {
        const meusUsuarios = await buscarMeusUsuarios()
        
        // 3. Valida e Redireciona
        if (meusUsuarios && meusUsuarios.length > 0) {
          navigate("/comunicador") // Já tem usuário, vai para o comunicador (ou /relatorio)
        } else {
          navigate("/cadastro-usuario") // Não tem usuário, vai obrigatoriamente cadastrar
        }
      } catch (erroBusca) {
        console.error("Erro ao verificar usuários vinculados:", erroBusca)
        // Se der erro na busca por algum motivo, mandamos para o cadastro por segurança
        navigate("/cadastro-usuario") 
      }

    } catch (erro) {
      console.error("Erro no login:", erro)
      
      if (erro.response && erro.response.data && erro.response.data.message) {
        setErroApi(erro.response.data.message)
      } else if (erro.response && [401, 403, 404].includes(erro.response.status)) {
        setErroApi("E-mail ou senha incorretos. Tente novamente ou clique em Esqueci minha senha")
      } else {
        setErroApi("Não foi possível conectar ao servidor. Tente novamente mais tarde.")
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AuthLayout titulo="Entrar" subtitulo="Que bom ver você de novo! Entre para continuar.">
      <form onSubmit={entrar} noValidate>

        {erroApi && <div className="mensagem-erro-api" style={{ color: 'red', marginBottom: '15px' }}>{erroApi}</div>}

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
          <Link className="auth-link" to="/esqueci-senha">
            Esqueci minha senha
          </Link>
        </div>

        <div className="auth-acoes">
          <button type="submit" className="auth-btn auth-btn--primario" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <p className="login-divisor">
            <span>ainda não tem conta?</span>
          </p>

          <Link className="auth-btn auth-btn--secundario" to="/cadastroadm">
            Criar conta
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login