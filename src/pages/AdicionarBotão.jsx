import {
  useEffect,
  useState,
} from "react";

import {
  LayoutNico,
  CampoCor,
  Visualizacao,
  IconeImagemMais,
  IconeMicrofone,
} from "../components";

import {
  buscarMeusUsuarios,
} from "../service/Usuario.js";

import {
  buscarCategoriasResolvidas,
} from "../service/Comunicador.js";

import {
  criarBotaoUsuario,
} from "../service/Botao.js";

const COR_FUNDO_PADRAO =
  "#FFFFFF";

const COR_FUNDO_LEGENDA_PADRAO =
  "#B3B4B7";

const COR_LEGENDA_PADRAO =
  "#000000";

function AdicionarBotao() {
  const [usuarios, setUsuarios] =
    useState([]);

  const [categorias, setCategorias] =
    useState([]);

  const [idUsuario, setIdUsuario] =
    useState("");

  const [idCategoria, setIdCategoria] =
    useState("");

  const [nome, setNome] =
    useState("");

  const [foto, setFoto] =
    useState(null);

  const [fotoUrl, setFotoUrl] =
    useState("");

  const [
    audioPersonalizado,
    setAudioPersonalizado,
  ] = useState(null);

  const [
    corFundo,
    setCorFundo,
  ] = useState(
    COR_FUNDO_PADRAO
  );

  const [
    corFundoLegenda,
    setCorFundoLegenda,
  ] = useState(
    COR_FUNDO_LEGENDA_PADRAO
  );

  const [
    corLegenda,
    setCorLegenda,
  ] = useState(
    COR_LEGENDA_PADRAO
  );

  const [
    exibirLegenda,
    setExibirLegenda,
  ] = useState(true);

  const [erros, setErros] =
    useState({});

  const [mensagem, setMensagem] =
    useState("");

  const [
    tipoMensagem,
    setTipoMensagem,
  ] = useState("");

  const [
    carregandoUsuarios,
    setCarregandoUsuarios,
  ] = useState(true);

  const [
    carregandoCategorias,
    setCarregandoCategorias,
  ] = useState(false);

  const [enviando, setEnviando] =
    useState(false);

  /*
   * Carrega os usuários pertencentes
   * ao administrador autenticado.
   */
  useEffect(() => {
    let ativo = true;

    async function carregarUsuarios() {
      try {
        setCarregandoUsuarios(true);
        setMensagem("");
        setTipoMensagem("");

        const dadosUsuarios =
          await buscarMeusUsuarios();

        if (!ativo) {
          return;
        }

        const lista =
          Array.isArray(dadosUsuarios)
            ? dadosUsuarios
            : [];

        setUsuarios(lista);

        if (lista.length > 0) {
          setIdUsuario(
            String(
              lista[0].idUsuario
            )
          );
        }
      } catch (erroUsuarios) {
        console.error(
          "Erro ao carregar usuários:",
          erroUsuarios
        );

        if (ativo) {
          setTipoMensagem("erro");

          setMensagem(
            "Não foi possível carregar os usuários."
          );
        }
      } finally {
        if (ativo) {
          setCarregandoUsuarios(
            false
          );
        }
      }
    }

    carregarUsuarios();

    return () => {
      ativo = false;
    };
  }, []);

  /*
   * Carrega as categorias resolvidas
   * quando o usuário é alterado.
   */
  useEffect(() => {
    if (!idUsuario) {
      setCategorias([]);
      setIdCategoria("");

      return undefined;
    }

    let ativo = true;

    async function carregarCategorias() {
      try {
        setCarregandoCategorias(
          true
        );

        setIdCategoria("");

        const dadosCategorias =
          await buscarCategoriasResolvidas(
            idUsuario
          );

        if (!ativo) {
          return;
        }

        const lista =
          Array.isArray(
            dadosCategorias
          )
            ? dadosCategorias
            : [];

        setCategorias(lista);

        if (lista.length > 0) {
          setIdCategoria(
            String(
              lista[0].idCategoria
            )
          );
        }
      } catch (erroCategorias) {
        console.error(
          "Erro ao carregar categorias:",
          erroCategorias
        );

        if (ativo) {
          setCategorias([]);
          setTipoMensagem("erro");

          setMensagem(
            "Não foi possível carregar as categorias do usuário."
          );
        }
      } finally {
        if (ativo) {
          setCarregandoCategorias(
            false
          );
        }
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, [idUsuario]);

  /*
   * Libera a URL temporária usada
   * para visualizar a imagem.
   */
  useEffect(() => {
    return () => {
      if (fotoUrl) {
        URL.revokeObjectURL(
          fotoUrl
        );
      }
    };
  }, [fotoUrl]);

  const limparErro = (campo) => {
    setErros((errosAtuais) => {
      if (!errosAtuais[campo]) {
        return errosAtuais;
      }

      return {
        ...errosAtuais,
        [campo]: "",
      };
    });
  };

  const limparMensagem = () => {
    setMensagem("");
    setTipoMensagem("");
  };

  const escolherFoto = (evento) => {
    const arquivo =
      evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const tiposPermitidos = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (
      !tiposPermitidos.includes(
        arquivo.type
      )
    ) {
      setErros(
        (errosAtuais) => ({
          ...errosAtuais,
          foto:
            "Escolha uma imagem PNG, JPEG ou WebP.",
        })
      );

      evento.target.value = "";
      return;
    }

    const limiteImagem =
      5 * 1024 * 1024;

    if (
      arquivo.size > limiteImagem
    ) {
      setErros(
        (errosAtuais) => ({
          ...errosAtuais,
          foto:
            "A imagem deve ter no máximo 5 MB.",
        })
      );

      evento.target.value = "";
      return;
    }

    if (fotoUrl) {
      URL.revokeObjectURL(
        fotoUrl
      );
    }

    setFoto(arquivo);

    setFotoUrl(
      URL.createObjectURL(
        arquivo
      )
    );

    limparErro("foto");
    limparMensagem();
  };

  const escolherAudio = (evento) => {
    const arquivo =
      evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const tiposPermitidos = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/x-wav",
      "audio/ogg",
      "audio/webm",
      "video/mp4",
      "audio/mp4",
    ];

    if (
      !tiposPermitidos.includes(
        arquivo.type
      )
    ) {
      setErros(
        (errosAtuais) => ({
          ...errosAtuais,
          audio:
            "Escolha um áudio MP3, WAV, OGG, MP4 ou WebM.",
        })
      );

      evento.target.value = "";
      return;
    }

    const limiteAudio =
      10 * 1024 * 1024;

    if (
      arquivo.size > limiteAudio
    ) {
      setErros(
        (errosAtuais) => ({
          ...errosAtuais,
          audio:
            "O áudio deve ter no máximo 10 MB.",
        })
      );vento.target.value = "";
      return;
    }

    setAudioPersonalizado(
      arquivo
    );

    limparErro("audio");
    limparMensagem();
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!idUsuario) {
      novosErros.usuario =
        "Selecione um usuário.";
    }

    if (!idCategoria) {
      novosErros.categoria =
        "Selecione uma categoria.";
    }

    if (!nome.trim()) {
      novosErros.nome =
        "Informe o nome do botão.";
    }

    if (!foto) {
      novosErros.foto =
        "Selecione a foto do botão.";
    }

    if (!audioPersonalizado) {
      novosErros.audio =
        "Selecione o áudio personalizado.";
    }

    setErros(novosErros);

    return (
      Object.keys(novosErros)
        .length === 0
    );
  };

  const limparFormulario = () => {
    if (fotoUrl) {
      URL.revokeObjectURL(
        fotoUrl
      );
    }

    setNome("");
    setFoto(null);
    setFotoUrl("");
    setAudioPersonalizado(null);

    setCorFundo(
      COR_FUNDO_PADRAO
    );

    setCorFundoLegenda(
      COR_FUNDO_LEGENDA_PADRAO
    );

    setCorLegenda(
      COR_LEGENDA_PADRAO
    );

    setExibirLegenda(true);
    setErros({});
  };

  const adicionar = async (
    evento
  ) => {
    evento.preventDefault();

    limparMensagem();

    if (!validarFormulario()) {
      return;
    }

    try {
      setEnviando(true);

      const resposta =
        await criarBotaoUsuario({
          legenda: nome,
          corFundo,
          corFundoLegenda,
          corLegenda,
          exibirLegenda,
          tamanhoBotao: 1,
          idUsuario,
          idCategoria,
          foto,
          audioPersonalizado,
        });

      limparFormulario();

      setTipoMensagem("sucesso");

      setMensagem(
        `Botão "${resposta.legenda}" adicionado com sucesso para ${resposta.nomeUsuario}.`
      );
    } catch (erroCadastro) {
      console.error(
        "Erro ao adicionar botão:",
        erroCadastro
      );

      const dadosErro =
        erroCadastro.response?.data;

      const mensagemApi =
        typeof dadosErro === "string"
          ? dadosErro
          : dadosErro?.message ||
            dadosErro?.detail ||
            dadosErro?.error;

      setTipoMensagem("erro");

      setMensagem(
        mensagemApi ||
          "Não foi possível adicionar o botão."
      );
    } finally {
      setEnviando(false);
    }
  };

  const cancelar = () => {
    limparFormulario();
    limparMensagem();
  };

  return (
    <LayoutNico titulo="Adicionar Botão">
      <form
        onSubmit={adicionar}
        noValidate
      >
        <div className="nico-secao nico-midia">
          <div>
            <span className="nico-mini-titulo">
              Foto do botão
            </span>

            <label className="nico-upload">
              {fotoUrl ? (
                <>
                  <img
                    src={fotoUrl}
                    alt="Foto selecionada para o botão"
                  />

                  <span className="nico-upload-trocar">
                    Trocar foto
                  </span>
                </>
              ) : (
                <>
                  <IconeImagemMais />

                  <span className="nico-upload-texto">
                    Enviar foto
                  </span>

                  <span className="nico-upload-dica">
                    PNG, JPEG ou WebP,
                    até 5 MB
                  </span>
                </>
              )}

              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                onChange={
                  escolherFoto
                }
                disabled={enviando}
              />
            </label>

            {erros.foto && (
              <p className="nico-erro">
                {erros.foto}
              </p>
            )}
          </div>

          <div>
            <span className="nico-mini-titulo">
              Áudio personalizado
            </span>

            <label className="nico-upload">
              <IconeMicrofone />

              {audioPersonalizado ? (
                <>
                  <span className="nico-upload-nome">
                    {
                      audioPersonalizado.name
                    }
                  </span>

                  <span className="nico-upload-trocar">
                    Trocar áudio
                  </span>
                </>
              ) : (
                <>
                  <span className="nico-upload-texto">
                    Enviar áudio
                  </span>

                  <span className="nico-upload-dica">
                    MP3, WAV, OGG,
                    MP4 ou WebM,
                    até 10 MB
                  </span>
                </>
              )}

              <input
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.webm,.mp4"
                onChange={
                  escolherAudio
                }
                disabled={enviando}
              />
            </label>

            {erros.audio && (
              <p className="nico-erro">
                {erros.audio}
              </p>
            )}
          </div>

          <Visualizacao
            titulo="Pré-visualização"
            imagem={fotoUrl}
            padrao=""
            nome={nome}
            mostrarLegenda={
              exibirLegenda
            }
            corFundo={corFundo}
            corFundoLegenda={
              corFundoLegenda
            }
            corLegenda={
              corLegenda
            }
          />
        </div>

        <div className="nico-secao">
          <div className="nico-linha">
            <label
              className="nico-rotulo"
              htmlFor="usuario"
            >
              Usuário:
            </label>

            <select
              id="usuario"
              className={
                erros.usuario
                  ? "nico-entrada nico-entrada-erro"
                  : "nico-entrada"
              }
              value={idUsuario}
              disabled={
                enviando ||
                carregandoUsuarios
              }
              onChange={(evento) => {
                setIdUsuario(
                  evento.target.value
                );

                limparErro("usuario");
                limparMensagem();
              }}
            >
              <option value="">
                {carregandoUsuarios
                  ? "Carregando usuários..."
                  : "Selecione um usuário"}
              </option>

              {usuarios.map(
                (usuario) => (
                  <option
                    key={
                      usuario.idUsuario
                    }
                    value={
                      usuario.idUsuario
                    }
                  >
                    {usuario.nome}
                  </option>
                )
              )}
            </select>
          </div>

          {erros.usuario && (
            <p className="nico-erro">
              {erros.usuario}
            </p>
          )}

          <div className="nico-linha">
            <label
              className="nico-rotulo"
              htmlFor="categoria"
            >
              Categoria:
            </label>

            <select
              id="categoria"
              className={
                erros.categoria
                  ? "nico-entrada nico-entrada-erro"
                  : "nico-entrada"
              }
              value={idCategoria}
              disabled={
                enviando ||
                !idUsuario ||
                carregandoCategorias
              }
              onChange={(evento) => {
                setIdCategoria(
                  evento.target.value
                );

                limparErro(
                  "categoria"
                );

                limparMensagem();
              }}
            >
              <option value="">
                {carregandoCategorias
                  ? "Carregando categorias..."
                  : "Selecione uma categoria"}
              </option>

              {categorias.map(
                (categoria) => (
                  <option
                    key={
                      categoria.idCategoria
                    }
                    value={
                      categoria.idCategoria
                    }
                  >
                    {categoria.nome}
                  </option>
                )
              )}
            </select>
          </div>

          {erros.categoria && (
            <p className="nico-erro">
              {erros.categoria}
            </p>
          )}

          <div className="nico-linha">
            <label
              className="nico-rotulo"
              htmlFor="nome"
            >
              Nome:
            </label>

            <input
              id="nome"
              className={
                erros.nome
                  ? "nico-entrada nico-entrada-erro"
                  : "nico-entrada"
              }
              type="text"
              value={nome}
              maxLength={100}
              placeholder="Ex.: Quero desenhar"
              disabled={enviando}
              onChange={(evento) => {
                setNome(
                  evento.target.value
                );

                limparErro("nome");
                limparMensagem();
              }}
            />
          </div>

          {erros.nome && (
            <p className="nico-erro">
              {erros.nome}
            </p>
          )}

          <CampoCor
            rotulo="Cor de fundo do botão"
            valor={corFundo}
            onChange={setCorFundo}
          />

          <CampoCor
            rotulo="Cor de fundo da legenda"
            valor={corFundoLegenda}
            onChange={
              setCorFundoLegenda
            }
          />

          <CampoCor
            rotulo="Cor do texto da legenda"
            valor={corLegenda}
            onChange={setCorLegenda}
          />

          <div className="nico-linha">
            <label
              className="nico-rotulo"
              htmlFor="exibir-legenda"
            >
              Exibir legenda:
            </label>

            <input
              id="exibir-legenda"
              className="nico-check"
              type="checkbox"
              checked={
                exibirLegenda
              }
              disabled={enviando}
              onChange={(evento) => {
                setExibirLegenda(
                  evento.target.checked
                );

                limparMensagem();
              }}
            />
          </div>
        </div>

        {mensagem && (
          <p
            className={
              `nico-mensagem nico-mensagem--${tipoMensagem}`
            }
            role={
              tipoMensagem === "erro"
                ? "alert"
                : "status"
            }
          >
            {mensagem}
          </p>
        )}

        <div className="nico-acoes">
          <button
            className="nico-botao nico-botao-principal"
            type="submit"
            disabled={
              enviando ||
              carregandoUsuarios
            }
          >
            {enviando
              ? "Adicionando..."
              : "Adicionar botão"}
          </button>

          <button
            className="nico-botao nico-botao-secundario"
            type="button"
            onClick={cancelar}
            disabled={enviando}
          >
            Limpar
          </button>
        </div>
      </form>
    </LayoutNico>
  );
}

export default AdicionarBotao;