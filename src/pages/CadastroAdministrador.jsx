import { useState } from "react"
import "./CadastroAdministrador.css"
import nicoLogo from "../assets/logo-nico.svg"

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

        const administrador = { nome, email, telefone: tel, dataNasc, sexo, senha, pin: Number(pin) }

        try {
            const resposta = await fetch("/api/administradores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(administrador)
            })
            if (resposta.ok) {
                alert("Administrador cadastrado com sucesso!") // deu certo :)
            } else {
                alert("Erro ao cadastrar administrador!") // deu errado :(
            }

        }
        catch (erro) {
            alert("Não foi possível conectar-se ao servidor. Tente novamente mais tarde.")
        }
    }

    const hoje = new Date().toISOString().split('T')[0]

    return (
        <>
            <img src={nicoLogo} alt="Logo da Nico" className="nicoLogo" />

            <form onSubmit={cadastrar} className="cartao">

                <h1>Cadastro de Administrador</h1>

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

                <div>

                    <label>Digite uma senha: *</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                </div>

                <div>

                    <label>Confirme sua senha: *</label>
                    <input
                        type="password"
                        value={csenha}
                        onChange={(e) => setCSenha(e.target.value)}
                        required
                    />

                </div>


                <div>

                    <label>Digite um PIN: *</label>
                    <input
                        type="password"
                        maxLength={4}
                        minLength={4}
                        inputMode="numeric"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        required
                    />

                </div>

                <div>

                    <label>Confirme seu PIN: *</label>
                    <input
                        type="password"
                        maxLength={4}
                        minLength={4}
                        inputMode="numeric"
                        value={cpin}
                        onChange={(e) => setCPin(e.target.value.replace(/\D/g, ''))}
                        required
                    />

                </div>

                <button

                    type="submit">Cadastrar

                </button>


                <button

                    type="button" className="sair">Sair

                </button>

            </form>

        </>

    )

}

export default CadastroAdministrador;