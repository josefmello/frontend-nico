import { useState } from "react"

function CadastroAdministrador() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [sexo, setSexo] = useState('')
  const [senha, setSenha] = useState('')
  const [pin, setPin] = useState('')

    const cadastrar = (e) => {
        e.preventDefault()
        const administrador = {nome, email, telefone: tel, dataNasc, sexo, senha, pin: Number(pin)}
        console.log(administrador)
    }

    const hoje = new Date().toISOString().split('T')[0]

  return (

    <form onSubmit={cadastrar}>

      <h1>Cadastro de Administrador</h1>

        <div>

        <label>Nome: </label>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

        </div>

        <div>

            <label>E-mail: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

        </div>

        <div>

                <label>Telefone: </label>
                <input
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />

        </div>

        <div>

                <label>Data de Nascimento: </label>
                <input
                    type="date"
                    min="1900-01-01"
                    max={hoje}
                    value={dataNasc}
                    onChange={(e) => setDataNasc(e.target.value)}
                />

        </div>

        <div>

                <label>Sexo: </label>
                <select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro(a)</option>
                </select>

        </div>

        <div>

                <label>Digite uma senha: </label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

        </div>


        <div>

                <label>Digite um PIN: </label>
                <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                />

        </div>

        <button
        
                type="submit">Cadastrar
                
        </button>

    </form>

  )
  
}

export default CadastroAdministrador;