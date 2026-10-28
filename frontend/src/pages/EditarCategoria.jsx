import { useState } from "react"
import { LayoutNico, CampoCor, Visualizacao, IconeImagemMais } from "../components"

function EditarCategoria() {
  const [nome, setNome] = useState('Favoritos')
  const [legenda, setLegenda] = useState(true)
  const [foto, setFoto] = useState(null)
  const [fotoUrl, setFotoUrl] = useState('')
  const [corFundo, setCorFundo] = useState('#ffffff')
  const [corFundoLegenda, setCorFundoLegenda] = useState('#9e9e9e')
  const [corLegenda, setCorLegenda] = useState('#000000')
  const [erro, setErro] = useState('')

  const escolherFoto = (e) => {
    const arquivo = e.target.files[0]
    if (!arquivo) return
    setFoto(arquivo)
    setFotoUrl(URL.createObjectURL(arquivo))
  }

  const editar = (e) => {
    e.preventDefault()

    if (!nome.trim()) {
      setErro('Informe o nome da categoria.')
      return
    }
    setErro('')

    const categoria = { nome: nome.trim(), legenda, corFundo, corFundoLegenda, corLegenda, foto }
    console.log(categoria)
  }

  const cancelar = () => {
    // Sem rotas por enquanto: apenas limpa a foto escolhida
    setFoto(null)
    setFotoUrl('')
  }

  return (

    <LayoutNico titulo="Editar Categoria">

      <form onSubmit={editar} noValidate>

        <div className="nico-secao nico-midia">

          <div>

            <span className="nico-mini-titulo">Adicionar Foto</span>
            <label className="nico-upload">
              {fotoUrl ? <img src={fotoUrl} alt="Foto escolhida" /> : <IconeImagemMais />}
              <input type="file" accept="image/*" onChange={escolherFoto} />
            </label>

          </div>

          <Visualizacao
            titulo="Visualização da Categoria"
            imagem={fotoUrl}
            padrao="⭐"
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
              className={erro ? 'nico-entrada nico-entrada-erro' : 'nico-entrada'}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          {erro && <p className="nico-erro">{erro}</p>}

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

          <CampoCor rotulo="Cor de fundo Categoria" valor={corFundo} onChange={setCorFundo} />
          <CampoCor rotulo="Cor de fundo Legenda" valor={corFundoLegenda} onChange={setCorFundoLegenda} />
          <CampoCor rotulo="Cor da Legenda" valor={corLegenda} onChange={setCorLegenda} />

        </div>

        <div className="nico-acoes">

          <button className="nico-botao nico-botao-principal" type="submit">Editar</button>

          <button className="nico-botao nico-botao-secundario" type="button" onClick={cancelar}>Cancelar</button>

        </div>

      </form>

    </LayoutNico>

  )

}

export default EditarCategoria;
