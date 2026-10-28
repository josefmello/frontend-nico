import { useState } from "react"
import "../css/CadastroUsuario.css"

function LogoNico() {
  return (
    <div className="cu-logo">
      <svg viewBox="0 0 100 100" role="img" aria-label="Logo do Nico">
        <path
          d="M50 8C27 8 9 24 9 46c0 13 7 24 18 31 0 6-2 11-6 15 8 0 16-3 21-8 3 .6 5 .8 8 .8 23 0 41-16 41-39S73 8 50 8Z"
          fill="#B3E0FA"
          stroke="#2B9BE8"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="40" r="5" fill="#2B9BE8" />
        <circle cx="64" cy="40" r="5" fill="#2B9BE8" />
        <path d="M36 55c4 8 24 8 28 0" fill="none" stroke="#2B9BE8" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <span>Nico</span>
    </div>
  )
}

function CadastroUsuario() {
  const [nome, setNome] = useState('')
  const [sexo, setSexo] = useState('')
  const [nivelAutismo, setNivelAutismo] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [voz, setVoz] = useState(false)
  const [erros, setErros] = useState({})

  const hoje = new Date().toISOString().split('T')[0]

  const cadastrar = (e) => {
    e.preventDefault()

    const novosErros = {}
    if (!nome.trim()) novosErros.nome = 'Informe o nome.'
    if (!sexo) novosErros.sexo = 'Selecione o sexo.'
    if (!nivelAutismo) novosErros.nivelAutismo = 'Selecione o nível.'
    if (!dataNasc) novosErros.dataNasc = 'Informe a data de nascimento.'
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) return

    const usuario = { nome: nome.trim(), sexo, nivelAutismo: Number(nivelAutismo), dataNasc, voz }
    console.log(usuario)
  }

  const cancelar = () => {
    // Sem rotas por enquanto: apenas limpa o formulário
    setNome('')
    setSexo('')
    setNivelAutismo('')
    setDataNasc('')
    setVoz(false)
    setErros({})
  }

  const classe = (campo) => (erros[campo] ? 'cu-input cu-input-erro' : 'cu-input')

  return (

    <div className="cu-pagina">

      <main className="cu-principal">

        <form className="cu-card" onSubmit={cadastrar} noValidate>

          <LogoNico />

          <div className="cu-campos">

            <div className="cu-campo cu-inteira">
              <label className="cu-label" htmlFor="nome">Nome</label>
              <input
                id="nome"
                className={classe('nome')}
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="cu-campo">
              <label className="cu-label" htmlFor="sexo">Sexo</label>
              <select id="sexo" className={classe('sexo')} value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro(a)</option>
              </select>
            </div>

            <div className="cu-campo">
              <label className="cu-label" htmlFor="dataNasc">Data de nascimento</label>
              <input
                id="dataNasc"
                className={classe('dataNasc')}
                type="date"
                min="1900-01-01"
                max={hoje}
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />
            </div>

            <div className="cu-campo">
              <label className="cu-label" htmlFor="nivelAutismo">Nível de autismo</label>
              <select
                id="nivelAutismo"
                className={classe('nivelAutismo')}
                value={nivelAutismo}
                onChange={(e) => setNivelAutismo(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="1">Nível 1</option>
                <option value="2">Nível 2</option>
                <option value="3">Nível 3</option>
              </select>
            </div>

            <div className="cu-campo">
              <span className="cu-label">Voz</span>
              <label className="cu-voz" htmlFor="voz">
                <input id="voz" type="checkbox" checked={voz} onChange={(e) => setVoz(e.target.checked)} />
                <span className="cu-trilho"><span className="cu-bolinha" /></span>
                <span className="cu-voz-texto">{voz ? 'Ativada' : 'Desativada'}</span>
              </label>
            </div>

          </div>

          {/* Linha de aviso com altura fixa: o layout não "pula" quando aparece um erro */}
          <p className="cu-aviso" role="alert">{Object.values(erros)[0] || ''}</p>

          <div className="cu-acoes">

            <button className="cu-botao cu-botao-secundario" type="button" onClick={cancelar}>Cancelar</button>

            <button className="cu-botao cu-botao-principal" type="submit">Registrar</button>

          </div>

        </form>

      </main>

    </div>

  )

}

export default CadastroUsuario;
