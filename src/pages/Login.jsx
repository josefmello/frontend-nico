import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./Login.css";

import AuthLayout from "../components/AuthLayout.jsx";
import Campo from "../components/Campo.jsx";
import CampoSenha from "../components/CampoSenha.jsx";

import { validarEmail } from "../utils/validacao.js";
import { realizarLogin } from "../service/auth.js";
import { buscarMeusUsuarios } from "../service/Usuario.js";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tocados, setTocados] = useState({});

  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] =
    useState(false);

  const navigate = useNavigate();

  const erros = {
    email: validarEmail(email),
    senha: senha
      ? ""
      : "Digite sua senha.",
  };

  const visivel = (campo) =>
    tocados[campo]
      ? erros[campo]
      : "";

  const tocar = (campo) => {
    setTocados((estadoAtual) => {
      if (estadoAtual[campo]) {
        return estadoAtual;
      }

      return {
        ...estadoAtual,
        [campo]: true,
      };
    });
  };

  const entrar = async (evento) => {
    evento.preventDefault();

    setTocados({
      email: true,
      senha: true,
    });

    setErroApi("");

    const primeiroInvalido = [
      "email",
      "senha",
    ].find((campo) => erros[campo]);

    if (primeiroInvalido) {
      document
        .getElementById(primeiroInvalido)
        ?.focus();

      return;
    }

    try {
      setCarregando(true);

      const dados = await realizarLogin(
        email,
        senha
      );

      if (!dados?.token) {
        throw new Error(
          "A API não retornou o token de autenticação."
        );
      }

      localStorage.setItem(
        "token",
        dados.token
      );

      const administradorLogado = {
        idAdministrador: dados.idAdministrador,
        nome: dados.nome?.trim() || "",
      };

      localStorage.setItem(
        "administrador",
        JSON.stringify(administradorLogado)
      );

      console.log(
        "Administrador salvo:",
        administradorLogado
      );


      const meusUsuarios =
        await buscarMeusUsuarios();

      if (
        Array.isArray(meusUsuarios) &&
        meusUsuarios.length > 0
      ) {
        const usuarioPrincipal =
          meusUsuarios[0];

        localStorage.setItem(
          "idUsuario",
          String(
            usuarioPrincipal.idUsuario
          )
        );

        localStorage.setItem(
          "usuario",
          JSON.stringify(
            usuarioPrincipal
          )
        );

        navigate("/comunicador");
        return;
      }

      localStorage.removeItem(
        "idUsuario"
      );

      localStorage.removeItem(
        "usuario"
      );

      navigate("/cadastro-usuario");
    } catch (erro) {
      console.error(
        "Erro no login:",
        erro
      );

      localStorage.removeItem("token");
      localStorage.removeItem(
        "idUsuario"
      );
      localStorage.removeItem(
        "usuario"
      );
      localStorage.removeItem("administrador");

      const mensagemApi =
        erro.response?.data?.message;

      const status =
        erro.response?.status;

      if (mensagemApi) {
        setErroApi(mensagemApi);
      } else if (
        status === 401 ||
        status === 403
      ) {
        setErroApi(
          "E-mail ou senha incorretos. Tente novamente."
        );
      } else if (status === 404) {
        setErroApi(
          "Não foi possível localizar os dados da conta."
        );
      } else {
        setErroApi(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthLayout
      titulo="Entrar"
      subtitulo="Que bom ver você de novo! Entre para continuar."
    >
      <form
        onSubmit={entrar}
        noValidate
      >
        {erroApi && (
          <div
            className="mensagem-erro-api"
            role="alert"
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {erroApi}
          </div>
        )}

        <Campo
          id="email"
          label="E-mail"
          erro={visivel("email")}
        >
          {(a11y) => (
            <input
              {...a11y}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nome@email.com"
              value={email}
              onChange={(evento) =>
                setEmail(
                  evento.target.value
                )
              }
              onBlur={() =>
                tocar("email")
              }
            />
          )}
        </Campo>

        <CampoSenha
          id="senha"
          label="Senha"
          autoComplete="current-password"
          value={senha}
          onChange={(evento) =>
            setSenha(
              evento.target.value
            )
          }
          onBlur={() =>
            tocar("senha")
          }
          erro={visivel("senha")}
        />

        <div className="login-extras">
          <Link
            className="auth-link"
            to="/esqueci-senha"
          >
            Esqueci minha senha
          </Link>
        </div>

        <div className="auth-acoes">
          <button
            type="submit"
            className="auth-btn auth-btn--primario"
            disabled={carregando}
          >
            {carregando
              ? "Entrando..."
              : "Entrar"}
          </button>

          <p className="login-divisor">
            <span>
              ainda não tem conta?
            </span>
          </p>

          <Link
            className="auth-btn auth-btn--secundario"
            to="/cadastroadm"
          >
            Criar conta
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;