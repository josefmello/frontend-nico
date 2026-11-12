import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  IconeImagemMais,
  LayoutNico,
} from "../components";

import {
  buscarMeusUsuarios,
} from "../service/Usuario.js";

import {
  buscarBotoesResolvidos,
  buscarCategoriasResolvidas,
} from "../service/Comunicador.js";

import {
  editarCategoriaUsuario,
} from "../service/Categoria.js";

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

function EditarCategoria() {
  const inputFotoRef =
    useRef(null);

  const [usuarios, setUsuarios] =
    useState([]);

  const [
    categoriasDisponiveis,
    setCategoriasDisponiveis,
  ] = useState([]);

  const [
    botoesDisponiveis,
    setBotoesDisponiveis,
  ] = useState([]);

  const [
    botoesSelecionados,
    setBotoesSelecionados,
  ] = useState([]);

  const [
    idUsuario,
    setIdUsuario,
  ] = useState("");

  const [
    categoriaSelecionada,
    setCategoriaSelecionada,
  ] = useState(null);

  const [
    buscaCategoria,
    setBuscaCategoria,
  ] = useState("");

  const [
    buscaBotao,
    setBuscaBotao,
  ] = useState("");

  const [
    idCategoriaFiltro,
    setIdCategoriaFiltro,
  ] = useState("todas");

  const [nome, setNome] =
    useState("");

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
    idBotaoArrastado,
    setIdBotaoArrastado,
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

  useEffect(() => {
    if (!idUsuario) {
      setCategoriasDisponiveis([]);
      setBotoesDisponiveis([]);
      setCategoriaSelecionada(null);

      return undefined;
    }

    let ativo = true;

    async function carregarDados() {
      try {
        setCarregandoDados(true);
        setCategoriaSelecionada(null);
        setBotoesSelecionados([]);
        setBuscaCategoria("");
        setBuscaBotao("");
        setIdCategoriaFiltro(
          "todas"
        );

        const [
          dadosCategorias,
          dadosBotoes,
        ] = await Promise.all([
          buscarCategoriasResolvidas(
            idUsuario
          ),

          buscarBotoesResolvidos(
            idUsuario
          ),
        ]);

        if (!ativo) {
          return;
        }

        const listaCategorias =
          Array.isArray(
            dadosCategorias
          )
            ? dadosCategorias
            : [];

        const listaBotoes =
          Array.isArray(dadosBotoes)
            ? dadosBotoes
            : [];

        setCategoriasDisponiveis(
          listaCategorias
            .filter(
              (categoria) =>
                categoria
                  ?.idCategoria != null
            )
            .sort(
              (
                primeira,
                segunda
              ) =>
                String(
                  primeira.nome || ""
                ).localeCompare(
                  String(
                    segunda.nome || ""
                  ),
                  "pt-BR"
                )
            )
        );

        setBotoesDisponiveis(
          listaBotoes
            .filter(
              (botao) =>
                botao?.idBotao != null
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
      } catch (erroDados) {
        console.error(
          "Erro ao carregar categorias e botões:",
          erroDados
        );

        if (ativo) {
          setCategoriasDisponiveis([]);
          setBotoesDisponiveis([]);
          setTipoMensagem("erro");

          setMensagem(
            "Não foi possível carregar as categorias e os botões."
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

  useEffect(() => {
    return () => {
      if (novaFotoUrl) {
        URL.revokeObjectURL(
          novaFotoUrl
        );
      }
    };
  }, [novaFotoUrl]);

  const categoriasFiltradas =
    useMemo(() => {
      const buscaNormalizada =
        normalizarTexto(
          buscaCategoria
        );

      if (!buscaNormalizada) {
        return categoriasDisponiveis;
      }

      return categoriasDisponiveis
        .filter((categoria) =>
          normalizarTexto(
            categoria.nome
          ).includes(
            buscaNormalizada
          )
        );
    }, [
      categoriasDisponiveis,
      buscaCategoria,
    ]);

  const idsBotoesSelecionados =
    useMemo(
      () =>
        new Set(
          botoesSelecionados.map(
            (botao) =>
              Number(botao.idBotao)
          )
        ),
      [botoesSelecionados]
    );

  const botoesFiltrados =
    useMemo(() => {
      const buscaNormalizada =
        normalizarTexto(
          buscaBotao
        );

      const categoriaFiltro =
        idCategoriaFiltro ===
        "todas"
          ? null
          : Number(
              idCategoriaFiltro
            );

      return botoesDisponiveis.filter(
        (botao) => {
          if (
            idsBotoesSelecionados.has(
              Number(botao.idBotao)
            )
          ) {
            return false;
          }

          if (
            categoriaFiltro !== null
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
                categoriaFiltro
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
      botoesDisponiveis.length,
      buscaBotao,
      idCategoriaFiltro,
      idsBotoesSelecionados,
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

  const limparNovaFoto = () => {
    if (novaFotoUrl) {
      URL.revokeObjectURL(
        novaFotoUrl
      );
    }

    setNovaFoto(null);
    setNovaFotoUrl("");

    if (inputFotoRef.current) {
      inputFotoRef.current.value =
        "";
    }
  };

  const cancelarEdicao = () => {
    limparNovaFoto();

    setCategoriaSelecionada(null);
    setBotoesSelecionados([]);
    setNome("");
    setOculto(false);
    setFotoAtual("");
    setBuscaBotao("");
    setIdCategoriaFiltro(
      "todas"
    );

    setIdBotaoArrastado(null);
    setErros({});
    limparMensagem();
  };

  const selecionarCategoria = (
    categoria
  ) => {
    limparNovaFoto();

    setCategoriaSelecionada(
      categoria
    );

    setNome(
      categoria.nome || ""
    );

    setFotoAtual(
      categoria.foto || ""
    );

    setOculto(
      Boolean(categoria.oculto)
    );

    const relacoes =
      Array.isArray(
        categoria.botoes
      )
        ? [...categoria.botoes]
        : [];

    relacoes.sort(
      (
        primeira,
        segunda
      ) =>
        Number(
          primeira.posicao
        ) -
        Number(
          segunda.posicao
        )
    );

    const botoesDaCategoria =
      relacoes
        .map((relacao) =>
          botoesDisponiveis.find(
            (botao) =>
              Number(
                botao.idBotao
              ) ===
              Number(
                relacao.idBotao
              )
          )
        )
        .filter(Boolean);

    setBotoesSelecionados(
      botoesDaCategoria
    );

    setBuscaBotao("");
    setIdCategoriaFiltro(
      "todas"
    );

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

  const selecionarBotao = (
    botao
  ) => {
    setBotoesSelecionados(
      (atuais) => {
        const jaSelecionado =
          atuais.some(
            (item) =>
              Number(
                item.idBotao
              ) ===
              Number(
                botao.idBotao
              )
          );

        if (jaSelecionado) {
          return atuais;
        }

        return [
          ...atuais,
          botao,
        ];
      }
    );

    limparErro("botoes");
    limparMensagem();
  };

  const removerBotao = (
    idBotao
  ) => {
    setBotoesSelecionados(
      (atuais) =>
        atuais.filter(
          (botao) =>
            Number(
              botao.idBotao
            ) !==
            Number(idBotao)
        )
    );

    limparMensagem();
  };

  const moverBotao = (
    indiceAtual,
    novoIndice
  ) => {
    setBotoesSelecionados(
      (atuais) => {
        if (
          novoIndice < 0 ||
          novoIndice >= atuais.length
        ) {
          return atuais;
        }

        const novaLista = [
          ...atuais,
        ];

        const [botaoMovido] =
          novaLista.splice(
            indiceAtual,
            1
          );

        novaLista.splice(
          novoIndice,
          0,
          botaoMovido
        );

        return novaLista;
      }
    );

    limparMensagem();
  };

  const iniciarArrasteBotao = (
    evento,
    idBotao
  ) => {
    evento.dataTransfer
      .effectAllowed = "move";

    evento.dataTransfer.setData(
      "text/plain",
      String(idBotao)
    );

    setIdBotaoArrastado(
      Number(idBotao)
    );
  };

  const permitirSoltarBotao = (
    evento
  ) => {
    evento.preventDefault();

    evento.dataTransfer.dropEffect =
      "move";
  };

  const soltarBotao = (
    evento,
    idBotaoDestino
  ) => {
    evento.preventDefault();

    const idOrigem =
      Number(
        evento.dataTransfer.getData(
          "text/plain"
        ) || idBotaoArrastado
      );

    const idDestino =
      Number(idBotaoDestino);

    if (
      !idOrigem ||
      idOrigem === idDestino
    ) {
      setIdBotaoArrastado(null);
      return;
    }

    setBotoesSelecionados(
      (atuais) => {
        const indiceOrigem =
          atuais.findIndex(
            (botao) =>
              Number(
                botao.idBotao
              ) === idOrigem
          );

        const indiceDestino =
          atuais.findIndex(
            (botao) =>
              Number(
                botao.idBotao
              ) === idDestino
          );

        if (
          indiceOrigem < 0 ||
          indiceDestino < 0
        ) {
          return atuais;
        }

        const novaLista = [
          ...atuais,
        ];

        const [botaoMovido] =
          novaLista.splice(
            indiceOrigem,
            1
          );

        novaLista.splice(
          indiceDestino,
          0,
          botaoMovido
        );

        return novaLista;
      }
    );

    setIdBotaoArrastado(null);
    limparMensagem();
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!categoriaSelecionada) {
      novosErros.categoria =
        "Selecione uma categoria.";
    }

    if (!nome.trim()) {
      novosErros.nome =
        "Informe o nome da categoria.";
    }

    if (
      botoesSelecionados.length === 0
    ) {
      novosErros.botoes =
        "Selecione pelo menos um botão.";
    }

    setErros(novosErros);

    return (
      Object.keys(novosErros)
        .length === 0
    );
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

      const idCategoriaOriginal =
        categoriaSelecionada
          .idCategoria;

      const resposta =
        await editarCategoriaUsuario(
          {
            idCategoria:
              idCategoriaOriginal,

            idUsuario,

            nome,

            oculto,

            botoes:
              botoesSelecionados,

            foto:
              novaFoto,
          }
        );

      limparNovaFoto();

      const categoriaAtualizada = {
        ...categoriaSelecionada,

        idCategoria:
          resposta.idCategoria,

        nome:
          resposta.nome,

        foto:
          resposta.foto,

        posicao:
          resposta.posicao,

        oculto:
          resposta.oculto,

        personalizada:
          resposta.personalizada,

        exclusivaUsuario:
          resposta
            .exclusivaUsuario,

        botoes:
          resposta.botoes,
      };

      setCategoriasDisponiveis(
        (atuais) => {
          const semOriginal =
            atuais.filter(
              (categoria) =>
                Number(
                  categoria
                    .idCategoria
                ) !==
                Number(
                  idCategoriaOriginal
                )
            );

          return [
            ...semOriginal,
            categoriaAtualizada,
          ].sort(
            (
              primeira,
              segunda
            ) =>
              String(
                primeira.nome || ""
              ).localeCompare(
                String(
                  segunda.nome || ""
                ),
                "pt-BR"
              )
          );
        }
      );

      setCategoriaSelecionada(
        categoriaAtualizada
      );

      setNome(
        resposta.nome || ""
      );

      setFotoAtual(
        resposta.foto || ""
      );

      setOculto(
        Boolean(
          resposta.oculto
        )
      );

      setTipoMensagem("sucesso");

      setMensagem(
        `Categoria "${resposta.nome}" atualizada com sucesso.`
      );
    } catch (erroEdicao) {
      console.error(
        "Erro ao editar categoria:",
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
          "Não foi possível atualizar a categoria."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <LayoutNico
      titulo="Editar Categoria"
      className="nico-formulario-categoria"
    >
      <div className="nico-secao">
        <div className="nico-linha">
          <label
            className="nico-rotulo"
            htmlFor="editar-categoria-usuario"
          >
            Usuário:
          </label>

          <select
            id="editar-categoria-usuario"
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

      {!categoriaSelecionada ? (
        <div className="nico-secao">
          <div>
            <span className="nico-mini-titulo">
              Selecione a categoria que deseja editar
            </span>

            <label
              className="nico-busca-rotulo"
              htmlFor="editar-categoria-busca"
            >
              Buscar categoria pelo nome
            </label>

            <input
              id="editar-categoria-busca"
              className="nico-entrada"
              type="search"
              value={buscaCategoria}
              placeholder="Ex.: Higiene"
              disabled={
                carregandoDados ||
                !idUsuario
              }
              onChange={(evento) =>
                setBuscaCategoria(
                  evento.target.value
                )
              }
            />
          </div>

          <section className="nico-lista-botoes nico-lista-edicao">
            <h2>
              Categorias disponíveis
            </h2>

            {carregandoDados ? (
              <p className="nico-lista-vazia">
                Carregando categorias...
              </p>
            ) : categoriasFiltradas
                .length > 0 ? (
              <ul>
                {categoriasFiltradas.map(
                  (categoria) => (
                    <li
                      key={
                        categoria
                          .idCategoria
                      }
                    >
                      <button
                        type="button"
                        className="nico-botao-disponivel"
                        onClick={() =>
                          selecionarCategoria(
                            categoria
                          )
                        }
                      >
                        {categoria.foto ? (
                          <img
                            src={
                              categoria
                                .foto
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
                          {categoria.nome}
                        </span>

                        <small className="nico-registro-tipo">
                          {categoria
                            .exclusivaUsuario
                            ? "Personalizada"
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
                Nenhuma categoria encontrada.
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
          <div className="nico-secao nico-midia nico-midia-categoria">
            <div>
              <span className="nico-mini-titulo">
                Imagem da categoria
              </span>

              <label className="nico-upload">
                {imagemVisualizacao ? (
                  <>
                    <img
                      src={
                        imagemVisualizacao
                      }
                      alt="Imagem da categoria"
                    />

                    <span className="nico-upload-trocar">
                      Trocar imagem
                    </span>
                  </>
                ) : (
                  <>
                    <IconeImagemMais />

                    <span className="nico-upload-texto">
                      Enviar imagem
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

            <div className="nico-visualizacao-categoria">
              <span className="nico-mini-titulo">
                Pré-visualização
              </span>

              <div className="nico-preview-categoria">
                {imagemVisualizacao ? (
                  <img
                    src={
                      imagemVisualizacao
                    }
                    alt={
                      nome.trim()
                        ? `Pré-visualização da categoria ${nome.trim()}`
                        : "Pré-visualização da categoria"
                    }
                  />
                ) : (
                  <span className="nico-preview-categoria__vazio">
                    Sem imagem
                  </span>
                )}
              </div>

              {nome.trim() && (
                <strong className="nico-preview-categoria__nome">
                  {nome.trim()}
                </strong>
              )}
            </div>
          </div>

          <div className="nico-secao">
            <div className="nico-edicao-identificacao">
              <strong>
                {
                  categoriaSelecionada
                    .nome
                }
              </strong>

              <span>
                {categoriaSelecionada
                  .exclusivaUsuario
                  ? "Categoria personalizada."
                  : "Categoria padrão. Ao salvar, será criada uma cópia exclusiva para o usuário."}
              </span>
            </div>

            <div className="nico-linha">
              <label
                className="nico-rotulo"
                htmlFor="editar-categoria-nome"
              >
                Nome:
              </label>

              <input
                id="editar-categoria-nome"
                className={
                  erros.nome
                    ? "nico-entrada nico-entrada-erro"
                    : "nico-entrada"
                }
                type="text"
                value={nome}
                maxLength={100}
                disabled={salvando}
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

            <div className="nico-linha">
              <label
                className="nico-rotulo"
                htmlFor="editar-categoria-oculta"
              >
                Ocultar categoria:
              </label>

              <input
                id="editar-categoria-oculta"
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

          <div className="nico-secao">
            <div>
              <span className="nico-mini-titulo">
                Botões da categoria
              </span>

              <label
                className="nico-busca-rotulo"
                htmlFor="editar-categoria-botao"
              >
                Buscar botão pelo nome
              </label>

              <input
                id="editar-categoria-botao"
                className="nico-entrada"
                type="search"
                value={buscaBotao}
                placeholder="Ex.: Abraço"
                disabled={salvando}
                onChange={(evento) =>
                  setBuscaBotao(
                    evento.target.value
                  )
                }
              />

              <div className="nico-filtro-categoria">
                <label
                  className="nico-busca-rotulo"
                  htmlFor="editar-categoria-filtro"
                >
                  Filtrar botões por categoria
                </label>

                <select
                  id="editar-categoria-filtro"
                  className="nico-entrada"
                  value={
                    idCategoriaFiltro
                  }
                  disabled={salvando}
                  onChange={(evento) =>
                    setIdCategoriaFiltro(
                      evento.target.value
                    )
                  }
                >
                  <option value="todas">
                    Todas as categorias
                  </option>

                  {categoriasDisponiveis.map(
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

            <div className="nico-seletor-botoes">
              <section className="nico-lista-botoes">
                <h2>
                  Botões disponíveis
                </h2>

                {botoesFiltrados.length >
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
                            disabled={
                              salvando
                            }
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
                              {
                                botao.legenda
                              }
                            </span>

                            <strong
                              aria-hidden="true"
                            >
                              ＋
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

              <section
                className={
                  erros.botoes
                    ? "nico-lista-botoes nico-lista-botoes--erro"
                    : "nico-lista-botoes"
                }
              >
                <h2>
                  Botões selecionados
                </h2>

                {botoesSelecionados
                  .length > 0 ? (
                  <ol>
                    {botoesSelecionados.map(
                      (
                        botao,
                        indice
                      ) => (
                        <li
                          key={
                            botao.idBotao
                          }
                          className={
                            Number(
                              idBotaoArrastado
                            ) ===
                            Number(
                              botao.idBotao
                            )
                              ? "nico-botao-selecionado nico-botao-selecionado--arrastando"
                              : "nico-botao-selecionado"
                          }
                          onDragOver={
                            permitirSoltarBotao
                          }
                          onDrop={(
                            evento
                          ) =>
                            soltarBotao(
                              evento,
                              botao.idBotao
                            )
                          }
                        >
                          <span
                            className="nico-botao-arraste"
                            draggable
                            role="button"
                            tabIndex={0}
                            title="Arraste para alterar a ordem"
                            onDragStart={(
                              evento
                            ) =>
                              iniciarArrasteBotao(
                                evento,
                                botao.idBotao
                              )
                            }
                            onDragEnd={() =>
                              setIdBotaoArrastado(
                                null
                              )
                            }
                          >
                            ⋮⋮
                          </span>

                          <span className="nico-botao-ordem">
                            {indice + 1}
                          </span>

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

                          <span className="nico-botao-selecionado__nome">
                            {botao.legenda}
                          </span>

                          <div className="nico-botao-selecionado__acoes">
                            <button
                              type="button"
                              title="Mover para cima"
                              disabled={
                                salvando ||
                                indice === 0
                              }
                              onClick={() =>
                                moverBotao(
                                  indice,
                                  indice - 1
                                )
                              }
                            >
                              ↑
                            </button>

                            <button
                              type="button"
                              title="Mover para baixo"
                              disabled={
                                salvando ||
                                indice ===
                                  botoesSelecionados
                                    .length -
                                    1
                              }
                              onClick={() =>
                                moverBotao(
                                  indice,
                                  indice + 1
                                )
                              }
                            >
                              ↓
                            </button>

                            <button
                              type="button"
                              title="Remover"
                              disabled={
                                salvando
                              }
                              onClick={() =>
                                removerBotao(
                                  botao.idBotao
                                )
                              }
                            >
                              ×
                            </button>
                          </div>
                        </li>
                      )
                    )}
                  </ol>
                ) : (
                  <p className="nico-lista-vazia">
                    Selecione pelo menos
                    um botão.
                  </p>
                )}
              </section>
            </div>

            {erros.botoes && (
              <p className="nico-erro nico-erro-lista">
                {erros.botoes}
              </p>
            )}
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
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : "Salvar alterações"}
            </button>

            <button
              className="nico-botao nico-botao-secundario"
              type="button"
              disabled={salvando}
              onClick={
                cancelarEdicao
              }
            >
              Cancelar edição
            </button>
          </div>
        </form>
      )}

      {!categoriaSelecionada &&
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

export default EditarCategoria;