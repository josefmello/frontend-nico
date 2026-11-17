import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/CadastroAdministrador.css"
import nicoLogo from "../assets/logo-nico.svg"
import { registarAdministrador } from "../service/Administrador.js"
import CampoSenha from "../components/CampoSenha.jsx"
import AcessibilidadeAuth from "../components/AcessibilidadeAuth.jsx"

function CadastroAdministrador() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [dataNasc, setDataNasc] = useState("")
    const [sexo, setSexo] = useState("")
    const [senha, setSenha] = useState("")
    const [csenha, setCSenha] = useState("")
    const [pin, setPin] = useState("")
    const [cpin, setCPin] = useState("")

    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    const cadastrar = async (e) => {
        e.preventDefault()

        if (senha !== csenha) {
            alert("As senhas não coincidem!")
            return
        }

        if (pin !== cpin) {
            alert("Os PINs não coincidem!")
            return
        }

        const administrador = {
            nome,
            email,
            telefone: tel,
            dataNasc,
            sexo,
            senha,
            pin: Number(pin)
        }

        try {
            setCarregando(true)

            await registarAdministrador(administrador)

            alert("Administrador cadastrado com sucesso!")
            navigate("/")
        } catch (erro) {
            if (erro.response?.status === 409) {
                alert("Já existe um cadastro com este e-mail e/ou telefone!")
            } else {
                console.error("Erro no cadastro:", erro)
                alert("Erro ao cadastrar administrador. Tente novamente.")
            }
        } finally {
            setCarregando(false)
        }
    }

    const hoje = new Date().toISOString().split("T")[0]

    return (
        <AcessibilidadeAuth>
            <main className="cadastro-container">
                <div className="cadastro-wrapper">
                    <form
                        onSubmit={cadastrar}
                        className="cartao cadastro-administrador-cartao"
                    >
                        <header className="cadastro-administrador-cabecalho">
                            <img
                                src={nicoLogo}
                                alt="Logo da Nico"
                                className="nicoLogo"
                            />

                            <h1>Cadastro de Administrador</h1>

                            <p>
                                Preencha os dados abaixo. Todos os campos são
                                obrigatórios.
                            </p>
                        </header>

                        <div className="cadastro-administrador-grade">
                            <div className="cadastro-administrador-campo">
                                <label htmlFor="nome">
                                    Nome: <span aria-hidden="true">*</span>
                                </label>

                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <label htmlFor="email">
                                    E-mail: <span aria-hidden="true">*</span>
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <label htmlFor="telefone">
                                    Telefone: <span aria-hidden="true">*</span>
                                </label>

                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    autoComplete="tel"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <label htmlFor="dataNasc">
                                    Data de nascimento:{" "}
                                    <span aria-hidden="true">*</span>
                                </label>

                                <input
                                    id="dataNasc"
                                    name="dataNasc"
                                    type="date"
                                    min="1900-01-01"
                                    max={hoje}
                                    value={dataNasc}
                                    onChange={(e) =>
                                        setDataNasc(e.target.value)
                                    }
                                    autoComplete="bday"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo cadastro-administrador-inteiro">
                                <label htmlFor="sexo">
                                    Sexo: <span aria-hidden="true">*</span>
                                </label>

                                <select
                                    id="sexo"
                                    name="sexo"
                                    value={sexo}
                                    onChange={(e) => setSexo(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="masculino">
                                        Masculino
                                    </option>
                                    <option value="feminino">
                                        Feminino
                                    </option>
                                    <option value="outro">Outro(a)</option>
                                </select>
                            </div>

                            <div className="cadastro-administrador-campo">
                                <CampoSenha
                                    id="senha"
                                    label="Digite uma senha: *"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <CampoSenha
                                    id="csenha"
                                    label="Confirme sua senha: *"
                                    value={csenha}
                                    onChange={(e) => setCSenha(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <CampoSenha
                                    id="pin"
                                    label="Digite um PIN: *"
                                    value={pin}
                                    onChange={(e) =>
                                        setPin(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 4)
                                        )
                                    }
                                    required
                                    maxLength={4}
                                    minLength={4}
                                    inputMode="numeric"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="cadastro-administrador-campo">
                                <CampoSenha
                                    id="cpin"
                                    label="Confirme seu PIN: *"
                                    value={cpin}
                                    onChange={(e) =>
                                        setCPin(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 4)
                                        )
                                    }
                                    required
                                    maxLength={4}
                                    minLength={4}
                                    inputMode="numeric"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="cadastro-administrador-acoes">
                            <button
                                type="submit"
                                className="cadastro-administrador-cadastrar"
                                disabled={carregando}
                            >
                                {carregando
                                    ? "Cadastrando..."
                                    : "Cadastrar"}
                            </button>

                            <button
                                type="button"
                                className="sair"
                                onClick={() => navigate("/")}
                                disabled={carregando}
                            >
                                Sair
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AcessibilidadeAuth>
    )
}

export default CadastroAdministrador