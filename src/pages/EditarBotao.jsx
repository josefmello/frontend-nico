import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  filtrarCategoriasResolvidas,
} from "../utils/categorias.js";
import {
  CampoCor,
  IconeImagemMais,
  IconeMicrofone,
  LayoutNico,
  Visualizacao,
} from "../components";

import {
  buscarMeusUsuarios,
} from "../service/Usuario.js";

import {
  buscarBotoesResolvidos,
  buscarCategoriasResolvidas,
} from "../service/Comunicador.js";

import {
  editarBotaoUsuario,
  excluirBotaoUsuario,
} from "../service/Botao.js";

const COR_FUNDO_PADRAO =
  "#FFFFFF";

const COR_FUNDO_LEGENDA_PADRAO =
  "#B3B4B7";

const COR_LEGENDA_PADRAO =
  "#000000";

function normalizarTexto(
  texto = ""
) {
  return String(texto)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim();
}

function EditarBotao() {
  const inputFotoRef =
    useRef(null);

  const inputAudioRef =
    useRef(null);

  const [usuarios, setUsuarios] =
    useState([]);

  const [
    botoesDisponiveis,
    setBotoesDisponiveis,
  ] = useState([]);

  const [
    categorias,
    setCategorias,
  ] = useState([]);

  const [
    idUsuario,
    setIdUsuario,
  ] = useState("");

  const [
    idCategoriaFiltro,
    setIdCategoriaFiltro,
  ] = useState("todas");

  const [
    buscaBotao,
    setBuscaBotao,
  ] = useState("");

  const [
    botaoSelecionado,
    setBotaoSelecionado,
  ] = useState(null);

  const [
    idCategoria,
    setIdCategoria,
  ] = useState("");

  const [legenda, setLegenda] =
    useState("");

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

  const [oculto, setOculto] =
    useState(false);

  const [fotoAtual, setFotoAtual] =
    useState("");

  const [novaFoto, setNovaFoto] =
    useState(null);

  const [
    novaFotoUrl,
    setNovaFotoUrl,
  ] = useState("");

  const [
    audioAtual,
    setAudioAtual,
  ] = useState("");

  const [
    novoAudio,
    setNovoAudio,
  ] = useState(null);

  const [erros, setErros] =
    useState({});

  const [
    mensagem,
    setMensagem,
  ] = useState("");

  const [
    tipoMensagem,
    setTipoMensagem,
  ] = useState("");

  const [
    carregandoUsuarios,
    setCarregandoUsuarios,
  ] = useState(true);

  const [
    carregandoDados,
    setCarregandoDados,
  ] = useState(false);

  const [salvando, setSalvando] =
    useState(false);

  const [excluindo, setExcluindo] =
    useState(false);

  /*
   * Carrega os usuários do administrador.
   */
  useEffect(() => {
    let ativo = true;

    async function carregarUsuarios() {
      try {
        setCarregandoUsuarios(true);

        const dados =
          await buscarMeusUsuarios();

        if (!ativo) {
          return;
        }

        const lista =
          Array.isArray(dados)
            ? dados
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
   * Carrega botões e categorias
   * quando o usuário muda.
   */
  useEffect(() => {
    if (!idUsuario) {
      setBotoesDisponiveis([]);
      setCategorias([]);
      setBotaoSelecionado(null);

      return undefined;
    }

    let ativo = true;

    async function carregarDados() {
      try {
        setCarregandoDados(true);
        setBotaoSelecionado(null);
        setBuscaBotao("");
        setIdCategoriaFiltro(
          "todas"
        );

        const [
          dadosBotoes,
          dadosCategorias,
        ] = await Promise.all([
          buscarBotoesResolvidos(
            idUsuario
          ),

          buscarCategoriasResolvidas(
            idUsuario
          ),
        ]);

        if (!ativo) {
          return;
        }

        const listaBotoes =
          Array.isArray(dadosBotoes)
            ? dadosBotoes
            : [];

        const listaCategorias =
          filtrarCategoriasResolvidas(
            dadosCategorias
          );

        setBotoesDisponiveis(
          listaBotoes
            .filter(
              (botao) =>
                botao?.idBotao != null &&
                !botao.oculto
            )
            .sort(
              (
                primeiro,
                segundo
              ) =>
                String(
                  primeiro.legenda ||
                  ""
                ).localeCompare(
                  String(
                    segundo.legenda ||
                    ""
                  ),
                  "pt-BR"
                )
            )
        );
        setCategorias(
          listaCategorias
        );
      } catch (erroDados) {
        console.error(
          "Erro ao carregar botões e categorias:",
          erroDados
        );

        if (ativo) {
          setBotoesDisponiveis([]);
          setCategorias([]);
          setTipoMensagem("erro");

          setMensagem(
            "Não foi possível carregar os botões e as categorias."
          );
        }
      } finally {
        if (ativo) {
          setCarregandoDados(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [idUsuario]);

  /*
   * Libera a URL temporária da imagem.
   */
  useEffect(() => {
    return () => {
      if (novaFotoUrl) {
        URL.revokeObjectURL(
          novaFotoUrl
        );
      }
    };
  }, [novaFotoUrl]);

  const botoesFiltrados =
    useMemo(() => {
      const buscaNormalizada =
        normalizarTexto(
          buscaBotao
        );

      const categoriaSelecionada =
        idCategoriaFiltro ===
          "todas"
          ? null
          : Number(
            idCategoriaFiltro
          );

      return botoesDisponiveis.filter(
        (botao) => {
          if (
            categoriaSelecionada !==
            null
          ) {
            const idsCategorias =
              Array.isArray(
                botao.idsCategorias
              )
                ? botao.idsCategorias.map(
                  Number
                )
                : [];

            if (
              !idsCategorias.includes(
                categoriaSelecionada
              )
            ) {
              return false;
            }
          }

          if (!buscaNormalizada) {
            return true;
          }

          return normalizarTexto(
            botao.legenda
          ).includes(
            buscaNormalizada
          );
        }
      );
    }, [
      botoesDisponiveis,
      buscaBotao,
      idCategoriaFiltro,
    ]);

  const imagemVisualizacao =
    novaFotoUrl || fotoAtual;

  const limparMensagem = () => {
    setMensagem("");
    setTipoMensagem("");
  };

  const limparErro = (campo) => {
    setErros((errosAtuais) => {
      if (!errosAtuais[campo]) {
        return errosAtuais;
      }

      const errosAtualizados = {
        ...errosAtuais,
      };

      delete errosAtualizados[
        campo
      ];

      return errosAtualizados;
    });
  };

  const limparArquivosNovos =
    () => {
      if (novaFotoUrl) {
        URL.revokeObjectURL(
          novaFotoUrl
        );
      }

      setNovaFoto(null);
      setNovaFotoUrl("");
      setNovoAudio(null);

      if (inputFotoRef.current) {
        inputFotoRef.current.value =
          "";
      }

      if (inputAudioRef.current) {
        inputAudioRef.current.value =
          "";
      }
    };

  const cancelarEdicao = () => {
    limparArquivosNovos();

    setBotaoSelecionado(null);
    setIdCategoria("");
    setLegenda("");
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
    setOculto(false);
    setFotoAtual("");
    setAudioAtual("");
    setErros({});
    limparMensagem();
  };

  const selecionarBotao = (
    botao
  ) => {
    limparArquivosNovos();

    setBotaoSelecionado(botao);

    setLegenda(
      botao.legenda || ""
    );

    setCorFundo(
      botao.corFundo ||
      COR_FUNDO_PADRAO
    );

    setCorFundoLegenda(
      botao.corFundoLegenda ||
      COR_FUNDO_LEGENDA_PADRAO
    );

    setCorLegenda(
      botao.corLegenda ||
      COR_LEGENDA_PADRAO
    );

    setExibirLegenda(
      botao.exibirLegenda !==
      false
    );

    setOculto(
      Boolean(botao.oculto)
    );

    setFotoAtual(
      botao.foto || ""
    );

    setAudioAtual(
      botao.audioResolvido || ""
    );
    const idsCategoriasBotao =
      Array.isArray(
        botao.idsCategorias
      )
        ? botao.idsCategorias.map(
          Number
        )
        : [];

    const categoriaDireta =
      categorias.find(
        (categoria) =>
          idsCategoriasBotao.includes(
            Number(
              categoria.idCategoria
            )
          )
      );

    let categoriaResolvida =
      categoriaDireta || null;

    if (categoriaResolvida) {
      setIdCategoria(
        String(
          categoriaResolvida
            .idCategoria
        )
      );
    } else {
      setIdCategoria("");
    }
    setErros({});
    limparMensagem();
  };

  const escolherFoto = (
    evento
  ) => {
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
        (atuais) => ({
          ...atuais,
          foto:
            "Escolha uma imagem PNG, JPEG ou WebP.",
        })
      );

      evento.target.value = "";
      return;
    }

    if (
      arquivo.size >
      5 * 1024 * 1024
    ) {
      setErros(
        (atuais) => ({
          ...atuais,
          foto:
            "A imagem deve ter no máximo 5 MB.",
        })
      );

      evento.target.value = "";
      return;
    }

    if (novaFotoUrl) {
      URL.revokeObjectURL(
        novaFotoUrl
      );
    }

    setNovaFoto(arquivo);

    setNovaFotoUrl(
      URL.createObjectURL(
        arquivo
      )
    );

    limparErro("foto");
    limparMensagem();
  };

  const escolherAudio = (
    evento
  ) => {
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
      "audio/mp4",
      "video/mp4",
    ];

    if (
      !tiposPermitidos.includes(
        arquivo.type
      )
    ) {
      setErros(
        (atuais) => ({
          ...atuais,
          audio:
            "Escolha um áudio MP3, WAV, OGG, MP4 ou WebM.",
        })
      );

      evento.target.value = "";
      return;
    }

    if (
      arquivo.size >
      10 * 1024 * 1024
    ) {
      setErros(
        (atuais) => ({
          ...atuais,
          audio:
            "O áudio deve ter no máximo 10 MB.",
        })
      );

      evento.target.value = "";
      return;
    }

    setNovoAudio(arquivo);

    limparErro("audio");
    limparMensagem();
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!botaoSelecionado) {
      novosErros.botao =
        "Selecione um botão.";
    }

    if (!idCategoria) {
      novosErros.categoria =
        "Selecione uma categoria.";
    }

    if (!legenda.trim()) {
      novosErros.legenda =
        "Informe a legenda do botão.";
    }

    setErros(novosErros);

    return (
      Object.keys(novosErros)
        .length === 0
    );
  };

  const removerBotao = async () => {
    if (!botaoSelecionado || !idUsuario) {
      return;
    }

    const botaoPersonalizado =
      Boolean(
        botaoSelecionado
          .exclusivoUsuario
      );

    const mensagemConfirmacao =
      botaoPersonalizado
        ? `O botão "${botaoSelecionado.legenda}" será excluído permanentemente.

Os registros de acionamento desse botão também serão excluídos dos relatórios.

Essa ação não pode ser desfeita.

Deseja continuar?`
        : `O botão padrão "${botaoSelecionado.legenda}" será retirado do comunicador deste usuário.

Deseja continuar?`;

    const confirmou =
      window.confirm(
        mensagemConfirmacao
      );

    if (!confirmou) {
      return;
    }

    try {
      setExcluindo(true);
      limparMensagem();

      const resposta = await excluirBotaoUsuario({
        idBotao: botaoSelecionado.idBotao,
        idUsuario,
      });

      const idRemovido = Number(
        botaoSelecionado.idBotao
      );

      setBotoesDisponiveis((atuais) =>
        atuais.filter(
          (botao) =>
            Number(botao.idBotao) !== idRemovido
        )
      );

      limparArquivosNovos();
      setBotaoSelecionado(null);
      setIdCategoria("");
      setLegenda("");
      setCorFundo(COR_FUNDO_PADRAO);
      setCorFundoLegenda(
        COR_FUNDO_LEGENDA_PADRAO
      );
      setCorLegenda(COR_LEGENDA_PADRAO);
      setExibirLegenda(true);
      setOculto(false);
      setFotoAtual("");
      setAudioAtual("");
      setErros({});
      setTipoMensagem("sucesso");
      setMensagem(
        resposta?.mensagem ||
        (botaoPersonalizado
          ? "Botão personalizado excluído permanentemente."
          : "Botão padrão removido do comunicador do usuário.")
      );
    } catch (erroExclusao) {
      console.error(
        "Erro ao remover botão:",
        erroExclusao
      );

      const dadosErro = erroExclusao.response?.data;
      const mensagemApi =
        typeof dadosErro === "string"
          ? dadosErro
          : dadosErro?.message ||
          dadosErro?.detail ||
          dadosErro?.error;

      setTipoMensagem("erro");
      setMensagem(
        mensagemApi ||
        "Não foi possível remover o botão."
      );
    } finally {
      setExcluindo(false);
    }
  };

  const salvarEdicao = async (
    evento
  ) => {
    evento.preventDefault();

    limparMensagem();

    if (!validarFormulario()) {
      return;
    }

    try {
      setSalvando(true);

      const resposta =
        await editarBotaoUsuario({
          idBotao:
            botaoSelecionado.idBotao,

          idUsuario,

          idCategoria,

          legenda,

          corFundo,

          corFundoLegenda,

          corLegenda,

          exibirLegenda,

          tamanhoBotao:
            botaoSelecionado
              .tamanhoBotao || 1,

          oculto,

          foto:
            novaFoto,

          audioPersonalizado:
            novoAudio,
        });

      // remover aqui dps
      console.log(
        "Botão editado:",
        {
          idBotaoOriginal:
            botaoSelecionado.idBotao,

          idBotaoNovo:
            resposta.idBotao,

          idCategoriaEnviada:
            idCategoria,

          idCategoriaRetornada:
            resposta.idCategoria,

          corFundoRetornada:
            resposta.corFundo,
        }
      );
      // ate aqui

      limparArquivosNovos();

      /*
       * Atualiza a lista local.
       *
       * Se um botão padrão foi editado,
       * o back-end devolve o novo ID da cópia.
       */
      setBotoesDisponiveis(
        (atuais) => {
          const semOriginal =
            atuais.filter(
              (botao) =>
                Number(
                  botao.idBotao
                ) !==
                Number(
                  botaoSelecionado
                    .idBotao
                )
            );

          return [
            ...semOriginal,
            {
              ...botaoSelecionado,

              idBotao:
                resposta.idBotao,

              legenda:
                resposta.legenda,

              corFundo:
                resposta.corFundo,

              corFundoLegenda:
                resposta
                  .corFundoLegenda,

              corLegenda:
                resposta.corLegenda,

              exibirLegenda:
                resposta
                  .exibirLegenda,

              tamanhoBotao:
                resposta
                  .tamanhoBotao,

              oculto:
                resposta.oculto,

              foto:
                resposta.foto,

              audioResolvido:
                resposta
                  .audioPersonalizado,

              personalizado:
                resposta
                  .personalizado,

              exclusivoUsuario:
                resposta
                  .exclusivoUsuario,

              idsCategorias: [
                resposta.idCategoria,
              ],
            },
          ].sort(
            (
              primeiro,
              segundo
            ) =>
              String(
                primeiro.legenda ||
                ""
              ).localeCompare(
                String(
                  segundo.legenda ||
                  ""
                ),
                "pt-BR"
              )
          );
        }
      );

      setBotaoSelecionado(
        (atual) => ({
          ...atual,
          idBotao:
            resposta.idBotao,
          legenda:
            resposta.legenda,
          corFundo:
            resposta.corFundo,
          corFundoLegenda:
            resposta
              .corFundoLegenda,
          corLegenda:
            resposta.corLegenda,
          exibirLegenda:
            resposta
              .exibirLegenda,
          tamanhoBotao:
            resposta.tamanhoBotao,
          oculto:
            resposta.oculto,
          foto:
            resposta.foto,
          audioResolvido:
            resposta
              .audioPersonalizado,
          personalizado:
            resposta.personalizado,
          exclusivoUsuario:
            resposta
              .exclusivoUsuario,
          idsCategorias: [
            resposta.idCategoria,
          ],
        })
      );

      setFotoAtual(
        resposta.foto || ""
      );

      setAudioAtual(
        resposta
          .audioPersonalizado || ""
      );

      setIdCategoria(
        String(
          resposta.idCategoria
        )
      );

      setTipoMensagem("sucesso");

      setMensagem(
        `Botão "${resposta.legenda}" atualizado com sucesso.`
      );
    } catch (erroEdicao) {
      console.error(
        "Erro ao editar botão:",
        erroEdicao
      );

      const dadosErro =
        erroEdicao.response?.data;

      const mensagemApi =
        typeof dadosErro === "string"
          ? dadosErro
          : dadosErro?.message ||
          dadosErro?.detail ||
          dadosErro?.error;

      setTipoMensagem("erro");

      setMensagem(
        mensagemApi ||
        "Não foi possível atualizar o botão."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <LayoutNico
      titulo="Editar Botão"
      className="nico-formulario-categoria"
    >
      <div className="nico-secao">
        <div className="nico-linha">
          <label
            className="nico-rotulo"
            htmlFor="editar-botao-usuario"
          >
            Usuário:
          </label>

          <select
            id="editar-botao-usuario"
            className="nico-entrada"
            value={idUsuario}
            disabled={
              carregandoUsuarios ||
              carregandoDados ||
              salvando
            }
            onChange={(evento) => {
              setIdUsuario(
                evento.target.value
              );

              cancelarEdicao();
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
      </div>

      {!botaoSelecionado ? (
        <div className="nico-secao">
          <div>
            <span className="nico-mini-titulo">
              Selecione o botão que deseja editar
            </span>

            <label
              className="nico-busca-rotulo"
              htmlFor="editar-botao-busca"
            >
              Buscar botão pelo nome
            </label>

            <input
              id="editar-botao-busca"
              className="nico-entrada"
              type="search"
              value={buscaBotao}
              placeholder="Ex.: Abraço"
              disabled={
                carregandoDados ||
                !idUsuario
              }
              onChange={(evento) =>
                setBuscaBotao(
                  evento.target.value
                )
              }
            />

            <div className="nico-filtro-categoria">
              <label
                className="nico-busca-rotulo"
                htmlFor="editar-botao-filtro"
              >
                Filtrar por categoria
              </label>

              <select
                id="editar-botao-filtro"
                className="nico-entrada"
                value={
                  idCategoriaFiltro
                }
                disabled={
                  carregandoDados ||
                  !idUsuario
                }
                onChange={(evento) =>
                  setIdCategoriaFiltro(
                    evento.target.value
                  )
                }
              >
                <option value="todas">
                  Todas as categorias
                </option>

                {categorias.map(
                  (categoria) => (
                    <option
                      key={
                        categoria
                          .idCategoria
                      }
                      value={
                        categoria
                          .idCategoria
                      }
                    >
                      {categoria.nome}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <section className="nico-lista-botoes nico-lista-edicao">
            <h2>
              Botões disponíveis
            </h2>

            {carregandoDados ? (
              <p className="nico-lista-vazia">
                Carregando botões...
              </p>
            ) : botoesFiltrados.length >
              0 ? (
              <ul>
                {botoesFiltrados.map(
                  (botao) => (
                    <li
                      key={
                        botao.idBotao
                      }
                    >
                      <button
                        type="button"
                        className="nico-botao-disponivel"
                        onClick={() =>
                          selecionarBotao(
                            botao
                          )
                        }
                      >
                        {botao.foto ? (
                          <img
                            src={
                              botao.foto
                            }
                            alt=""
                          />
                        ) : (
                          <span
                            className="nico-botao-sem-imagem"
                            aria-hidden="true"
                          >
                            Sem foto
                          </span>
                        )}

                        <span>
                          {botao.legenda}
                        </span>

                        <small className="nico-registro-tipo">
                          {botao
                            .exclusivoUsuario
                            ? "Personalizado"
                            : "Padrão"}
                        </small>

                        <strong
                          aria-hidden="true"
                        >
                          ✎
                        </strong>
                      </button>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="nico-lista-vazia">
                Nenhum botão encontrado.
              </p>
            )}
          </section>
        </div>
      ) : (
        <form
          onSubmit={
            salvarEdicao
          }
          noValidate
        >
          <div className="nico-secao nico-midia">
            <div>
              <span className="nico-mini-titulo">
                Foto do botão
              </span>

              <label className="nico-upload">
                {imagemVisualizacao ? (
                  <>
                    <img
                      src={
                        imagemVisualizacao
                      }
                      alt="Foto do botão"
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
                  ref={inputFotoRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  disabled={salvando}
                  onChange={
                    escolherFoto
                  }
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

                {novoAudio ? (
                  <span className="nico-upload-nome">
                    {novoAudio.name}
                  </span>
                ) : audioAtual ? (
                  <>
                    <span className="nico-upload-texto">
                      Áudio atual
                    </span>

                    <span className="nico-upload-dica">
                      Selecione outro
                      arquivo para trocar
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
                  ref={inputAudioRef}
                  type="file"
                  accept="audio/*,.mp3,.wav,.ogg,.webm,.mp4"
                  disabled={salvando}
                  onChange={
                    escolherAudio
                  }
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
              imagem={
                imagemVisualizacao
              }
              padrao=""
              nome={legenda}
              mostrarLegenda={
                exibirLegenda
              }
              corFundo={
                corFundo
              }
              corFundoLegenda={
                corFundoLegenda
              }
              corLegenda={
                corLegenda
              }
            />
          </div>

          <div className="nico-secao">
            <div className="nico-edicao-identificacao">
              <strong>
                {
                  botaoSelecionado
                    .legenda
                }
              </strong>

              <span>
                {botaoSelecionado
                  .exclusivoUsuario
                  ? "Botão personalizado"
                  : "Botão padrão. Ao salvar, será criada uma cópia exclusiva para o usuário."}
              </span>
            </div>

            <div className="nico-linha">
              <label
                className="nico-rotulo"
                htmlFor="editar-botao-categoria"
              >
                Categoria:
              </label>

              <select
                id="editar-botao-categoria"
                className={
                  erros.categoria
                    ? "nico-entrada nico-entrada-erro"
                    : "nico-entrada"
                }
                value={idCategoria}
                disabled={salvando}
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
                  Selecione uma categoria
                </option>

                {categorias.map(
                  (categoria) => (
                    <option
                      key={
                        categoria
                          .idCategoria
                      }
                      value={
                        categoria
                          .idCategoria
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
                htmlFor="editar-botao-legenda"
              >
                Nome:
              </label>

              <input
                id="editar-botao-legenda"
                className={
                  erros.legenda
                    ? "nico-entrada nico-entrada-erro"
                    : "nico-entrada"
                }
                type="text"
                value={legenda}
                maxLength={100}
                disabled={salvando}
                onChange={(evento) => {
                  setLegenda(
                    evento.target.value
                  );

                  limparErro(
                    "legenda"
                  );

                  limparMensagem();
                }}
              />
            </div>

            {erros.legenda && (
              <p className="nico-erro">
                {erros.legenda}
              </p>
            )}

            <CampoCor
              rotulo="Cor de fundo do botão"
              valor={corFundo}
              onChange={setCorFundo}
            />

            <CampoCor
              rotulo="Cor de fundo da legenda"
              valor={
                corFundoLegenda
              }
              onChange={
                setCorFundoLegenda
              }
            />

            <CampoCor
              rotulo="Cor do texto da legenda"
              valor={corLegenda}
              onChange={
                setCorLegenda
              }
            />

            <div className="nico-linha">
              <label
                className="nico-rotulo"
                htmlFor="editar-exibir-legenda"
              >
                Exibir legenda:
              </label>

              <input
                id="editar-exibir-legenda"
                className="nico-check"
                type="checkbox"
                checked={
                  exibirLegenda
                }
                disabled={salvando}
                onChange={(evento) =>
                  setExibirLegenda(
                    evento.target.checked
                  )
                }
              />
            </div>

            <div className="nico-linha">
              <label
                className="nico-rotulo"
                htmlFor="editar-botao-oculto"
              >
                Ocultar botão:
              </label>

              <input
                id="editar-botao-oculto"
                className="nico-check"
                type="checkbox"
                checked={oculto}
                disabled={salvando}
                onChange={(evento) =>
                  setOculto(
                    evento.target.checked
                  )
                }
              />
            </div>
          </div>

          {mensagem && (
            <p
              className={
                `nico-mensagem nico-mensagem--${tipoMensagem}`
              }
              role={
                tipoMensagem ===
                  "erro"
                  ? "alert"
                  : "status"
              }
            >
              {mensagem}
            </p>
          )}

          <div className="nico-acoes nico-acoes-edicao">
            <button
              className="nico-botao nico-botao-excluir"
              type="button"
              disabled={salvando || excluindo}
              onClick={removerBotao}
            >
              {excluindo
                ? "Removendo..."
                : botaoSelecionado.exclusivoUsuario
                  ? "Excluir permanentemente"
                  : "Remover do comunicador"}
            </button>

            <button
              className="nico-botao nico-botao-secundario"
              type="button"
              disabled={salvando || excluindo}
              onClick={cancelarEdicao}
            >
              Cancelar edição
            </button>

            <button
              className="nico-botao nico-botao-principal"
              type="submit"
              disabled={salvando || excluindo}
            >
              {salvando
                ? "Salvando..."
                : "Salvar alterações"}
            </button>
          </div>
        </form>
      )}

      {!botaoSelecionado &&
        mensagem && (
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
    </LayoutNico>
  );
}

export default EditarBotao;