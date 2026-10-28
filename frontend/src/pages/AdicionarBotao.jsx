import { useState } from "react"
import { LayoutNico, CampoCor, Visualizacao, IconeImagemMais, IconeMicrofone } from "../components"

function AdicionarBotao() {
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [legenda, setLegenda] = useState(false)
  const [foto, setFoto] = useState(null)
  const [fotoUrl, setFotoUrl] = useState('')
  const [audio, setAudio] = useState(null)
  const [corFundo, setCorFundo] = useState('#ffffff')
  const [corFundoLegenda, setCorFundoLegenda] = useState('#9e9e9e')
  const [corLegenda, setCorLegenda] = useState('#000000')
  const [erros, setErros] = useState({})

  // Futuro: virá da API (entidade Categoria)
  const categorias = ['Favoritos', 'Comida', 'Ação']

  const escolherFoto = (e) => {
    const arquivo = e.target.files[0]
    if (!arquivo) return
    setFoto(arquivo)
    setFotoUrl(URL.createObjectURL(arquivo))
  }

  const adicionar = (e) => {
    e.preventDefault()

    const novosErros = {}
    if (!nome.trim()) novosErros.nome = 'Informe o nome do botão.'
    if (!categoria) novosErros.categoria = 'Selecione uma categoria.'
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) return

    const botao = { nome: nome.trim(), categoria, legenda, corFundo, corFundoLegenda, corLegenda, foto, audio }
    console.log(botao)
  }

  const cancelar = () => {
    // Limpa o formulário sem sair da tela.
    setNome('')
    setCategoria('')
    setLegenda(false)
    setFoto(null)
    setFotoUrl('')
    setAudio(null)
    setErros({})
  }

  return (

    <LayoutNico titulo="Adicionar Botão">

      <form onSubmit={adicionar} noValidate>

        <div className="nico-secao nico-midia nico-midia-tres">

          <div>

            <span className="nico-mini-titulo">Adicionar Foto</span>
            <label className="nico-upload">
              {fotoUrl ? <img src={fotoUrl} alt="Foto escolhida" /> : <IconeImagemMais />}
              <input type="file" accept="image/*" onChange={escolherFoto} />
            </label>

          </div>

          <div>

            <span className="nico-mini-titulo">Adicionar Áudio</span>
            <label className="nico-upload">
              {audio ? <span className="nico-upload-nome">{audio.name}</span> : <IconeMicrofone />}
              <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0] || null)} />
            </label>

          </div>

          <Visualizacao
            titulo="Visualização Botão"
            imagem={fotoUrl}
            padrao=""
            nome={nome}
            mostrarLegenda={legenda}
            corFundo={corFundo}
            corFundoLegenda={corFundoLegenda}
            corLegenda={corLegenda}
          />

        </div>

        <div className="nico-secao">

          <div className="nico-linha">
            <label className="nico-rotulo" htmlFor="nome">Nome:</label>
            <input
              id="nome"
              className={erros.nome ? 'nico-entrada nico-entrada-erro' : 'nico-entrada'}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          {erros.nome && <p className="nico-erro">{erros.nome}</p>}

          <div className="nico-linha">
            <label className="nico-rotulo" htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              className={erros.categoria ? 'nico-entrada nico-entrada-erro' : 'nico-entrada'}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value=""></option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {erros.categoria && <p className="nico-erro">{erros.categoria}</p>}

          <div className="nico-linha">
            <label className="nico-rotulo" htmlFor="legenda">Legenda</label>
            <input
              id="legenda"
              className="nico-check"
              type="checkbox"
              checked={legenda}
              onChange={(e) => setLegenda(e.target.checked)}
            />
          </div>

          <CampoCor rotulo="Cor de fundo Botão" valor={corFundo} onChange={setCorFundo} />
          <CampoCor rotulo="Cor de fundo Legenda" valor={corFundoLegenda} onChange={setCorFundoLegenda} />
          <CampoCor rotulo="Cor da Legenda" valor={corLegenda} onChange={setCorLegenda} />

        </div>

        <div className="nico-acoes">

          <button className="nico-botao nico-botao-principal" type="submit">Adicionar</button>

          <button className="nico-botao nico-botao-secundario" type="button" onClick={cancelar}>Cancelar</button>

        </div>

      </form>

    </LayoutNico>

  )

}

export default AdicionarBotao;
