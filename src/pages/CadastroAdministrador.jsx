import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/CadastroAdministrador.css"
import { registarAdministrador } from "../service/Administrador.js"
import CampoSenha from "../components/CampoSenha.jsx"
import AuthLayout from "../components/AuthLayout.jsx"
import ForcaSenha from "../components/ForcaSenha.jsx"
import { validarSenhaNova } from "../utils/validacao.js"
import AcessibilidadeAuth from "../components/AcessibilidadeAuth.jsx"

function CadastroAdministrador() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [sexo, setSexo] = useState('')
    const [senha, setSenha] = useState('')
    const [csenha, setCSenha] = useState('')
    const [pin, setPin] = useState('')
    const [cpin, setCPin] = useState('')

    const [erroSenha, setErroSenha] = useState('')
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()

    const cadastrar = async (e) => {
        e.preventDefault()

        const faltaNaSenha = validarSenhaNova(senha)
        if (faltaNaSenha) {
            setErroSenha(faltaNaSenha)
            document.getElementById("senha")?.focus()
            return
        }
        setErroSenha('')

        if (senha !== csenha) {
            alert("As senhas não coincidem!")
            return
        }
        if (pin !== cpin) {
            alert("Os PINs não coincidem!")
            return
        }

        const administrador = { nome, email, telefone: tel, dataNasc, sexo, senha, pin: Number(pin) }

        try {
            setCarregando(true)
            await registarAdministrador(administrador)
            alert("Administrador cadastrado com sucesso!")
            navigate("/") 
        } catch (erro) {
            if (erro.response && erro.response.status === 409) {
                alert("Já existe um cadastro com este e-mail e/ou telefone!") 
            } else {
                console.error("Erro no registo:", erro)
                alert("Erro ao cadastrar administrador. Tente novamente.") 
            }
        } finally {
            setCarregando(false)
        }
    }

    const hoje = new Date().toISOString().split('T')[0]

    return (
        <AcessibilidadeAuth>
            <AuthLayout
                titulo="Criar conta"
                subtitulo="Preencha os dados abaixo. Os campos sem “(opcional)” são obrigatórios."
                largo
            >
                <form onSubmit={cadastrar} className="cartao cartao--embutido">

                    <div>
                        <label>Nome: *</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>E-mail: *</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Telefone: *</label>
                        <input
                            type="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Data de Nascimento: *</label>
                        <input
                            type="date"
                            min="1900-01-01"
                            max={hoje}
                            value={dataNasc}
                            onChange={(e) => setDataNasc(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Sexo: *</label>
                        <select
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro(a)</option>
                        </select>
                    </div>

      
                        <CampoSenha
                            id="senha"
                            label="Digite uma senha: *"
                            value={senha}
                            onChange={(e) => { setSenha(e.target.value); setErroSenha('') }}
                            required
                            descricaoId="senha-forca"
                        />
                        <ForcaSenha id="senha-forca" senha={senha} />
                        {erroSenha && <p className="auth-msg auth-msg--erro" role="alert"><span aria-hidden="true">⚠ </span>{erroSenha}</p>}
   


                        <CampoSenha
                            id="csenha"
                            label="Confirme sua senha: *"
                            value={csenha}
                            onChange={(e) => setCSenha(e.target.value)}
                            required
                        />
                        {csenha && senha !== csenha && <p className="auth-msg auth-msg--aviso" role="status"><span aria-hidden="true">ℹ </span>As senhas ainda não coincidem.</p>}


                   <CampoSenha
                        id="pin"
                        label="Digite um PIN: *"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        required
                        maxLength={4}
                        minLength={4}
                        inputMode="numeric"
                    />

                    <CampoSenha
                        id="cpin"
                        label="Confirme seu PIN: *"
                        value={cpin}
                        onChange={(e) => setCPin(e.target.value.replace(/\D/g, ''))}
                        required
                        maxLength={4}
                        minLength={4}
                        inputMode="numeric"
                    />
                            <button type="submit" disabled={carregando}>
                                {carregando ? "Cadastrando..." : "Cadastrar"}
                            </button>

                            <button type="button" className="sair" onClick={() => navigate("/")}>
                                Sair
                            </button>
                        </form>
            </AuthLayout>
        </AcessibilidadeAuth>
    )
}

export default CadastroAdministrador