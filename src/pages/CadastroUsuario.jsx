import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css"
import AuthLayout from "../components/AuthLayout.jsx"
import AcessibilidadeAuth from "../components/AcessibilidadeAuth.jsx"
import Campo from "../components/Campo.jsx";
import { registarUsuario, buscarMeusUsuarios } from "../service/Usuario.js";

const LIMITE_BIOGRAFIA = 500

function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("")
  const [sexo, setSexo] = useState("")
  const [dataNascAut, setDataNascAut] = useState("")
  const [nivelAutismo, setNivelAutismo] = useState("")
  const [voz, setVoz] = useState("") // Estado para o Tipo de voz
  const [biografia, setBiografia] = useState("")
  const [tocados, setTocados] = useState({})

  const [sucesso, setSucesso] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const formRef = useRef(null)

  const hoje = new Date().toISOString().split("T")[0]

  // Erros que bloqueiam o envio
  const erros = {
    nome: nome.trim() ? "" : "Informe o nome.",
    sexo: sexo ? "" : "Selecione o sexo.",
    dataNascAut: !dataNascAut
      ? "Informe a data de nascimento."
      : dataNascAut > hoje
        ? "A data não pode ser no futuro."
        : dataNascAut < "1900-01-01"
          ? "Confira o ano de nascimento."
          : "",
    voz: voz !== "" ? "" : "Selecione o tipo de voz.",
    nivelAutismo: nivelAutismo ? "" : "Selecione o nível.",
  }
  const ordem = ["nome", "dataNascAut", "sexo", "voz", "nivelAutismo"]

  const visivel = (campo) => (tocados[campo] ? erros[campo] : "")
  const tocar = (campo) => setTocados((t) => (t[campo] ? t : { ...t, [campo]: true }))
  const editar = (setter) => (e) => {
    setSucesso(false)
    setter(e.target.value)
  }

  const cadastrar = async (e) => {
    e.preventDefault()
    setTocados(Object.fromEntries(ordem.map((campo) => [campo, true])))

    const invalido = ordem.find((campo) => erros[campo])
    if (invalido) {
      setSucesso(false)
      document.getElementById(invalido)?.focus()
      return
    }

    // Objeto formatado incluindo a biografia e a conversão de "voz" para booleano
    const usuario = {
      nome: nome.trim(),
      sexo,
      nivelAutismo: `Nivel ${nivelAutismo}`,
      dataNascAut,
      voz: voz === "true", // Converte string "true" para boolean true e "false" para boolean false
      biografia: biografia.trim() // Incluído para não faltar no payload
    }

    try {
      setCarregando(true)

      await registarUsuario(usuario);

      const meusUsuarios =
        await buscarMeusUsuarios();

      if (
        !Array.isArray(meusUsuarios) ||
        meusUsuarios.length === 0
      ) {
        throw new Error(
          "O usuário foi cadastrado, mas não foi localizado."
        );
      }

      const usuarioCriado = meusUsuarios[0];

      localStorage.setItem(
        "idUsuario",
        String(usuarioCriado.idUsuario)
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioCriado)
      );

      setSucesso(true);

      navigate("/comunicador", {
        replace: true,
      });

    } catch (erro) {
      console.error("Erro no registo do usuário:", erro)
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.")
      setSucesso(false)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AcessibilidadeAuth>
      <AuthLayout
        titulo="Criar conta"
        subtitulo="Preencha os dados abaixo. Os campos sem “(opcional)” são obrigatórios."
        largo
      >
        <form ref={formRef} onSubmit={cadastrar} noValidate>
          {sucesso && (
            <p className="cu-sucesso" role="status">
              ✓ Tudo certo! Usuário cadastrado com sucesso.
            </p>
          )}

        <fieldset className="auth-grupo" disabled={carregando}>
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

            <Campo id="dataNascAut" label="Data de nascimento" erro={visivel("dataNascAut")}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="date"
                  min="1900-01-01"
                  max={hoje}
                  value={dataNascAut}
                  onChange={editar(setDataNascAut)}
                  onBlur={() => tocar("dataNascAut")}
                />
              )}
            </Campo>

            <div className="cu-inteira">
              <Campo id="sexo" label="Sexo" erro={visivel("sexo")}>
                {(a11y) => (
                  <select {...a11y} value={sexo} onChange={editar(setSexo)} onBlur={() => tocar("sexo")}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro(a)</option>
                  </select>
                )}
              </Campo>
            </div>

            {/* Novo campo: Tipo de voz */}
            <div className="cu-inteira">
              <Campo id="voz" label="Tipo de voz" erro={visivel("voz")}>
                {(a11y) => (
                  <select {...a11y} value={voz} onChange={editar(setVoz)} onBlur={() => tocar("voz")}>
                    <option value="">Selecione</option>
                    <option value="true">Voz Masculina</option>
                    <option value="false">Voz Feminina</option>
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

        <div className="auth-acoes auth-acoes--linha">
          <button type="submit" className="auth-btn auth-btn--primario" disabled={carregando}>
            {carregando ? "Registrando..." : "Registrar"}
          </button>
        </div>
        </form>
      </AuthLayout>
    </AcessibilidadeAuth>
  )
}

export default CadastroUsuario