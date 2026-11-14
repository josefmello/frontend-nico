import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MenuComunicador from "../components/MenuComunicador.jsx";
import PinAuthModal from "../components/PinAuthModal.jsx";

import {
  buscarBotoesResolvidos,
  buscarCategoriasResolvidas,
  registrarAcionamento,
} from "../service/Comunicador.js";

import "./TelaPrincipal.css";

const LIMITE_ITENS_FRASE = 20;

function TelaPrincipal() {
  const navigate = useNavigate();
  const [modo, setModo] =
    useState("comunicacao");

  const [modalPinAberto, setModalPinAberto] =
    useState(false);

  const [frase, setFrase] =
    useState([]);

  const [
    categoriaAtiva,
    setCategoriaAtiva,
  ] = useState(0);

  const [
    arrastandoId,
    setArrastandoId,
  ] = useState(null);

  const [
    sobreTira,
    setSobreTira,
  ] = useState(false);

  const [
    itemTiraArrastado,
    setItemTiraArrastado,
  ] = useState(null);

  const [
    itemReproduzindo,
    setItemReproduzindo,
  ] = useState(null);

  const [
    reproduzindoFrase,
    setReproduzindoFrase,
  ] = useState(false);

  const [botoes, setBotoes] =
    useState([]);

  const [categorias, setCategorias] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  const audioAtualRef = useRef(null);
  const reproducaoIdRef = useRef(0);

  const usuario = useMemo(() => {
    try {
      const usuarioSalvo =
        localStorage.getItem("usuario");

      return usuarioSalvo
        ? JSON.parse(usuarioSalvo)
        : null;
    } catch (erroLeitura) {
      console.error(
        "Não foi possível ler o usuário salvo:",
        erroLeitura
      );

      return null;
    }
  }, []);

  const carregarComunicador =
    useCallback(async () => {
      const idUsuario =
        localStorage.getItem("idUsuario");

      if (!idUsuario) {
        setErro(
          "Usuário do comunicador não encontrado. Faça login novamente."
        );

        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const [
          botoesRecebidos,
          categoriasRecebidas,
        ] = await Promise.all([
          buscarBotoesResolvidos(
            idUsuario
          ),
          buscarCategoriasResolvidas(
            idUsuario
          ),
        ]);

        const botoesVisiveis =
          Array.isArray(
            botoesRecebidos
          )
            ? botoesRecebidos.filter(
              (botao) =>
                !botao.oculto
            )
            : [];

        console.table(
          botoesRecebidos.map(
            (botao) => ({
              id:
                botao.idBotao,

              legenda:
                botao.legenda,

              oculto:
                botao.oculto,

              exclusivo:
                botao.exclusivoUsuario,

              categorias:
                Array.isArray(
                  botao.idsCategorias
                )
                  ? botao.idsCategorias.join(
                    ", "
                  )
                  : "",
            })
          )
        );

        const categoriasVisiveis =
          Array.isArray(
            categoriasRecebidas
          )
            ? categoriasRecebidas.filter(
              (categoria) =>
                !categoria.oculto
            )
            : [];

        setBotoes(botoesVisiveis);
        setCategorias(
          categoriasVisiveis
        );
        setCategoriaAtiva(0);
      } catch (erroRequisicao) {
        console.error(
          "Erro ao carregar o comunicador:",
          erroRequisicao
        );

        const status =
          erroRequisicao.response
            ?.status;

        if (status === 401) {
          setErro(
            "Sua sessão expirou. Faça login novamente."
          );
        } else if (status === 403) {
          setErro(
            "O administrador não possui acesso a este comunicador."
          );
        } else {
          setErro(
            "Não foi possível carregar os botões e categorias."
          );
        }
      } finally {
        setCarregando(false);
      }
    }, []);

  useEffect(() => {
    carregarComunicador();
  }, [
    carregarComunicador
  ]);

  useEffect(() => {
    return () => {
      reproducaoIdRef.current += 1;

      if (audioAtualRef.current) {
        audioAtualRef.current.pause();
        audioAtualRef.current = null;
      }
    };
  }, []);

  const alterarModo = (novoModo) => {
    if (novoModo === "comunicacao") {
      setModo("comunicacao");
      return;
    }

    setModalPinAberto(true);
  };

  const fecharModalPin = () => {
    setModalPinAberto(false);
    setModo("comunicacao");
  };

  const liberarModoEdicao = () => {
    setModalPinAberto(false);
    setModo("edicao");

    navigate("/administrador", {
      replace: true,
    });
  };

  const abrirRecuperacaoSenha = () => {
    setModalPinAberto(false);
    setModo("comunicacao");

    navigate("/esqueci-senha");
  };

  const categoriaAtual =
    categorias[categoriaAtiva] ??
    null;

  const botoesFiltrados =
    useMemo(() => {
      if (!categoriaAtual) {
        return botoes;
      }

      const idCategoriaAtual =
        Number(
          categoriaAtual.idCategoria
        );

      const botoesDaCategoria =
        botoes.filter(
          (botao) => {
            if (
              !Array.isArray(
                botao.idsCategorias
              )
            ) {
              return false;
            }

            return botao.idsCategorias
              .map(Number)
              .includes(
                idCategoriaAtual
              );
          }
        );

      const relacoesOrdenadas =
        Array.isArray(
          categoriaAtual.botoes
        )
          ? [...categoriaAtual.botoes]
          : [];

      if (
        relacoesOrdenadas.length === 0
      ) {
        return botoesDaCategoria;
      }

      const posicaoPorBotao =
        new Map(
          relacoesOrdenadas.map(
            (relacao) => [
              Number(
                relacao.idBotao
              ),
              Number(
                relacao.posicao
              ),
            ]
          )
        );

      return [
        ...botoesDaCategoria,
      ].sort(
        (
          primeiro,
          segundo
        ) => {
          const posicaoPrimeiro =
            posicaoPorBotao.get(
              Number(
                primeiro.idBotao
              )
            );

          const posicaoSegundo =
            posicaoPorBotao.get(
              Number(
                segundo.idBotao
              )
            );

          const primeiroTemPosicao =
            Number.isFinite(
              posicaoPrimeiro
            );

          const segundoTemPosicao =
            Number.isFinite(
              posicaoSegundo
            );

          if (
            primeiroTemPosicao &&
            segundoTemPosicao
          ) {
            return (
              posicaoPrimeiro -
              posicaoSegundo
            );
          }

          if (primeiroTemPosicao) {
            return -1;
          }

          if (segundoTemPosicao) {
            return 1;
          }

          return String(
            primeiro.legenda || ""
          ).localeCompare(
            String(
              segundo.legenda || ""
            ),
            "pt-BR"
          );
        }
      );
    }, [
      botoes,
      categoriaAtual,
    ]);

  useEffect(() => {
    console.table(
      botoesFiltrados.map(
        (botao) => ({
          id: botao.idBotao,
          legenda: botao.legenda,
          oculto: botao.oculto,
          categorias:
            Array.isArray(
              botao.idsCategorias
            )
              ? botao.idsCategorias.join(
                ", "
              )
              : "",
        })
      )
    );
  }, [
    botoesFiltrados,
    categoriaAtual,
  ]);

  const criarItemDaTira = (
    botao
  ) => ({
    ...botao,

    idItemTira:
      `${botao.idBotao}-${Date.now()}-${Math.random()}`,
  });

  const pararReproducao =
    useCallback(() => {
      reproducaoIdRef.current += 1;

      if (audioAtualRef.current) {
        audioAtualRef.current.pause();
        audioAtualRef.current.currentTime =
          0;
        audioAtualRef.current =
          null;
      }

      setItemReproduzindo(null);
      setReproduzindoFrase(false);
    }, []);

  const acionarBotao = (
    botao
  ) => {
    const idUsuario =
      localStorage.getItem("idUsuario");

    pararReproducao();

    if (botao.audioResolvido) {
      const audio = new Audio(
        botao.audioResolvido
      );

      audioAtualRef.current =
        audio;

      audio.onended = () => {
        audioAtualRef.current =
          null;

        setItemReproduzindo(
          null
        );
      };

      audio.onerror = () => {
        audioAtualRef.current =
          null;

        setItemReproduzindo(
          null
        );

        console.error(
          `Não foi possível reproduzir o áudio do botão ${botao.legenda}.`
        );
      };

      audio
        .play()
        .catch((erroAudio) => {
          audioAtualRef.current =
            null;

          console.error(
            "Não foi possível reproduzir o áudio:",
            erroAudio
          );
        });
    } else {
      console.warn(
        `O botão "${botao.legenda}" não possui áudio.`
      );
    }

    if (!idUsuario) {
      console.error(
        "Usuário não encontrado para registrar o acionamento."
      );

      return;
    }

    registrarAcionamento(
      idUsuario,
      botao.idBotao
    ).catch((erroRegistro) => {
      console.error(
        "Não foi possível registrar o acionamento:",
        erroRegistro
      );
    });
  };

  const iniciarArraste = (
    evento,
    botao
  ) => {
    evento.dataTransfer.effectAllowed =
      "copy";

    evento.dataTransfer.setData(
      "application/json",
      JSON.stringify(botao)
    );

    setArrastandoId(
      botao.idBotao
    );
  };

  const finalizarArraste = () => {
    setArrastandoId(null);
    setSobreTira(false);
  };

  const permitirSoltarNaTira = (
    evento
  ) => {
    evento.preventDefault();

    evento.dataTransfer.dropEffect =
      "copy";

    setSobreTira(true);
  };

  const sairDaTira = (
    evento
  ) => {
    const novoElemento =
      evento.relatedTarget;

    if (
      novoElemento &&
      evento.currentTarget.contains(
        novoElemento
      )
    ) {
      return;
    }

    setSobreTira(false);
  };

  const soltarNaTira = (
    evento
  ) => {
    evento.preventDefault();

    setSobreTira(false);
    setArrastandoId(null);

    const idItemExistente =
      evento.dataTransfer.getData(
        "application/x-item-tira"
      );

    if (idItemExistente) {
      return;
    }

    const dados =
      evento.dataTransfer.getData(
        "application/json"
      );

    if (!dados) {
      return;
    }

    try {
      const botao =
        JSON.parse(dados);

      setFrase(
        (fraseAtual) => {
          if (
            fraseAtual.length >=
            LIMITE_ITENS_FRASE
          ) {
            return fraseAtual;
          }

          return [
            ...fraseAtual,
            criarItemDaTira(
              botao
            ),
          ];
        }
      );
    } catch (erroLeitura) {
      console.error(
        "Não foi possível adicionar o botão à tira:",
        erroLeitura
      );
    }
  };

  const adicionarPeloTeclado = (
    evento,
    botao
  ) => {
    if (
      evento.key !== "Enter" &&
      evento.key !== " "
    ) {
      return;
    }

    evento.preventDefault();

    setFrase(
      (fraseAtual) => {
        if (
          fraseAtual.length >=
          LIMITE_ITENS_FRASE
        ) {
          return fraseAtual;
        }

        return [
          ...fraseAtual,
          criarItemDaTira(
            botao
          ),
        ];
      }
    );
  };

  const removerItemDaTira = (
    idItemTira
  ) => {
    if (
      idItemTira ===
      itemReproduzindo
    ) {
      pararReproducao();
    }

    setFrase(
      (fraseAtual) =>
        fraseAtual.filter(
          (item) =>
            item.idItemTira !==
            idItemTira
        )
    );
  };

  const iniciarArrasteNaTira = (
    evento,
    item
  ) => {
    evento.stopPropagation();

    evento.dataTransfer.effectAllowed =
      "move";

    evento.dataTransfer.setData(
      "application/x-item-tira",
      item.idItemTira
    );

    setItemTiraArrastado(
      item.idItemTira
    );
  };

  const permitirReordenacao = (
    evento
  ) => {
    evento.preventDefault();
    evento.stopPropagation();

    evento.dataTransfer.dropEffect =
      "move";
  };

  const soltarSobreItem = (
    evento,
    idItemDestino
  ) => {
    evento.preventDefault();
    evento.stopPropagation();

    const idItemOrigem =
      evento.dataTransfer.getData(
        "application/x-item-tira"
      );

    if (
      !idItemOrigem ||
      idItemOrigem ===
      idItemDestino
    ) {
      setItemTiraArrastado(
        null
      );

      return;
    }

    setFrase(
      (fraseAtual) => {
        const indiceOrigem =
          fraseAtual.findIndex(
            (item) =>
              item.idItemTira ===
              idItemOrigem
          );

        const indiceDestino =
          fraseAtual.findIndex(
            (item) =>
              item.idItemTira ===
              idItemDestino
          );

        if (
          indiceOrigem < 0 ||
          indiceDestino < 0
        ) {
          return fraseAtual;
        }

        const novaFrase = [
          ...fraseAtual,
        ];

        const [itemMovido] =
          novaFrase.splice(
            indiceOrigem,
            1
          );

        novaFrase.splice(
          indiceDestino,
          0,
          itemMovido
        );

        return novaFrase;
      }
    );

    setItemTiraArrastado(
      null
    );
  };

  const apagarUltimo = () => {
    setFrase(
      (fraseAtual) =>
        fraseAtual.slice(0, -1)
    );
  };

  const limparFrase = () => {
    pararReproducao();
    setFrase([]);
  };

  const falarFrase = () => {
    if (
      frase.length === 0 ||
      reproduzindoFrase
    ) {
      return;
    }

    pararReproducao();

    const idReproducao =
      reproducaoIdRef.current;

    setReproduzindoFrase(
      true
    );

    let indice = 0;

    const tocarProximo = () => {
      if (
        idReproducao !==
        reproducaoIdRef.current
      ) {
        return;
      }

      if (
        indice >= frase.length
      ) {
        audioAtualRef.current =
          null;

        setItemReproduzindo(
          null
        );

        setReproduzindoFrase(
          false
        );

        return;
      }

      const item =
        frase[indice];

      indice += 1;

      if (!item.audioResolvido) {
        tocarProximo();
        return;
      }

      setItemReproduzindo(
        item.idItemTira
      );

      const audio = new Audio(
        item.audioResolvido
      );

      audioAtualRef.current =
        audio;

      audio.onended =
        tocarProximo;

      audio.onerror = () => {
        console.error(
          `Não foi possível reproduzir: ${item.legenda}`
        );

        tocarProximo();
      };

      audio
        .play()
        .catch((erroAudio) => {
          console.error(
            "Erro ao reproduzir áudio:",
            erroAudio
          );

          tocarProximo();
        });
    };

    tocarProximo();
  };

  const selecionarCategoria = (
    indice
  ) => {
    setCategoriaAtiva(indice);
  };

  const categoriaAnterior =
    () => {
      if (
        categorias.length === 0
      ) {
        return;
      }

      setCategoriaAtiva(
        (indiceAtual) =>
          indiceAtual === 0
            ? categorias.length - 1
            : indiceAtual - 1
      );
    };

  const proximaCategoria =
    () => {
      if (
        categorias.length === 0
      ) {
        return;
      }

      setCategoriaAtiva(
        (indiceAtual) =>
          indiceAtual ===
            categorias.length - 1
            ? 0
            : indiceAtual + 1
      );
    };

  const sair = () => {
    pararReproducao();

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "idUsuario"
    );

    localStorage.removeItem(
      "usuario"
    );
    localStorage.removeItem(
      "administrador"
    );

    navigate("/", {
      replace: true,
    });
  };

  if (carregando) {
    return (
      <div className="tela-comunicador">
        <div className="estado-comunicador">
          <p>
            Carregando comunicador...
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="tela-comunicador">
        <div className="estado-comunicador">
          <p
            className="estado-comunicador__erro"
            role="alert"
          >
            {erro}
          </p>

          <button
            type="button"
            onClick={
              carregarComunicador
            }
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tela-comunicador">
      <MenuComunicador
        modo={modo}
        onChangeModo={
          alterarModo
        }
        nomeUsuario={
          usuario?.nome
        }
        onSair={sair}
      />

      {modalPinAberto && (
        <PinAuthModal
          onFechar={
            fecharModalPin
          }
          onSucesso={
            liberarModoEdicao
          }
          onEsqueciSenha={
            abrirRecuperacaoSenha
          }
        />
      )}

      <div className="comunicador-conteudo">
        <section className="cartao-tira">
          <div className="cartao-tira__cabecalho">
            <div>
              <span className="sobre-titulo">
                Tira de sentença
              </span>

              <h1>
                Monte sua frase
              </h1>
            </div>

            <span className="cartao-tira__contador">
              {frase.length}{" "}
              {frase.length === 1
                ? "item"
                : "itens"}
            </span>
          </div>

          <div
            className={
              sobreTira
                ? "tira-sentenca tira-sentenca--ativa"
                : "tira-sentenca"
            }
            onDragOver={
              permitirSoltarNaTira
            }
            onDragEnter={() =>
              setSobreTira(true)
            }
            onDragLeave={
              sairDaTira
            }
            onDrop={soltarNaTira}
          >
            {frase.length === 0 ? (
              <div className="tira-sentenca__vazia">
                <span
                  className="tira-sentenca__icone"
                  aria-hidden="true"
                >
                  +
                </span>

                <div>
                  <strong>
                    Arraste os botões
                    para esta área
                  </strong>

                  <p>
                    Os itens aparecerão
                    aqui na ordem
                    escolhida.
                  </p>
                </div>
              </div>
            ) : (
              <div className="tira-sentenca__itens">
                {frase.map(
                  (botao) => (
                    <div
                      className={[
                        "tira-sentenca__item",

                        itemTiraArrastado ===
                          botao.idItemTira
                          ? "tira-sentenca__item--arrastando"
                          : "",

                        itemReproduzindo ===
                          botao.idItemTira
                          ? "tira-sentenca__item--reproduzindo"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={
                        botao.idItemTira
                      }
                      draggable
                      title={
                        botao.legenda
                      }
                      aria-label={
                        botao.legenda
                      }
                      onDragStart={(
                        evento
                      ) =>
                        iniciarArrasteNaTira(
                          evento,
                          botao
                        )
                      }
                      onDragOver={
                        permitirReordenacao
                      }
                      onDrop={(
                        evento
                      ) =>
                        soltarSobreItem(
                          evento,
                          botao.idItemTira
                        )
                      }
                      onDragEnd={() =>
                        setItemTiraArrastado(
                          null
                        )
                      }
                    >
                      <button
                        type="button"
                        className="tira-sentenca__remover"
                        aria-label={`Remover ${botao.legenda} da frase`}
                        onClick={() =>
                          removerItemDaTira(
                            botao.idItemTira
                          )
                        }
                      >
                        ×
                      </button>

                      {botao.foto ? (
                        <img
                          className="tira-sentenca__imagem"
                          src={
                            botao.foto
                          }
                          alt=""
                          draggable={
                            false
                          }
                        />
                      ) : (
                        <span
                          className="tira-sentenca__item-placeholder"
                          aria-hidden="true"
                        >
                          ?
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="cartao-tira__acoes">
            <button
              type="button"
              disabled={
                frase.length === 0
              }
              onClick={
                apagarUltimo
              }
            >
              Apagar último
            </button>

            <button
              type="button"
              disabled={
                frase.length === 0 ||
                reproduzindoFrase
              }
              onClick={falarFrase}
            >
              {reproduzindoFrase
                ? "Reproduzindo..."
                : "Falar frase"}
            </button>

            {reproduzindoFrase && (
              <button
                type="button"
                onClick={
                  pararReproducao
                }
              >
                Parar
              </button>
            )}

            <button
              type="button"
              disabled={
                frase.length === 0
              }
              onClick={limparFrase}
            >
              Limpar
            </button>
          </div>

          <p className="cartao-tira__limite">
            {frase.length} de{" "}
            {LIMITE_ITENS_FRASE} itens
          </p>
        </section>

        <section className="cartao-prancha">
          <main className="prancha-botoes">
            <div className="prancha-botoes__cabecalho">
              <div>
                <span className="sobre-titulo">
                  Categoria selecionada
                </span>

                <h2>
                  {categoriaAtual?.nome ||
                    "Todas as categorias"}
                </h2>
              </div>

              <span className="prancha-botoes__quantidade">
                {
                  botoesFiltrados.length
                }{" "}
                {botoesFiltrados.length ===
                  1
                  ? "botão"
                  : "botões"}
              </span>
            </div>

            <p className="prancha-botoes__instrucao">
              Clique para ouvir ou
              arraste para a tira de
              sentença.
            </p>

            <div className="prancha-botoes__grade">
              {botoesFiltrados.length ===
                0 ? (
                <p className="prancha-botoes__vazia">
                  Nenhum botão
                  cadastrado nesta
                  categoria.
                </p>
              ) : (
                botoesFiltrados.map(
                  (botao) => (
                    <div
                      key={
                        botao.idBotao
                      }
                      className={
                        arrastandoId ===
                          botao.idBotao
                          ? "botao-comunicador botao-comunicador--arrastando"
                          : "botao-comunicador"
                      }
                      style={{
                        "--cor-fundo-botao":
                          botao.corFundo ||
                          "#FFFFFF",

                        "--cor-faixa":
                          botao.corFundoLegenda ||
                          "#B3B4B7",

                        "--cor-texto-legenda":
                          botao.corLegenda ||
                          "#000000",
                      }}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`${botao.legenda}. Clique para ouvir ou arraste para a tira.`}
                      onDragStart={(
                        evento
                      ) =>
                        iniciarArraste(
                          evento,
                          botao
                        )
                      }
                      onDragEnd={
                        finalizarArraste
                      }
                      onClick={() =>
                        acionarBotao(
                          botao
                        )
                      }
                      onKeyDown={(
                        evento
                      ) =>
                        adicionarPeloTeclado(
                          evento,
                          botao
                        )
                      }
                    >
                      <div className="botao-comunicador__conteudo">
                        {botao.foto ? (
                          <img
                            className="botao-comunicador__imagem"
                            src={
                              botao.foto
                            }
                            alt=""
                            draggable={
                              false
                            }
                          />
                        ) : (
                          <span
                            className="botao-comunicador__placeholder"
                            aria-hidden="true"
                          >
                            ?
                          </span>
                        )}
                      </div>

                      {botao.exibirLegenda !== false && (
                        <div className="botao-comunicador__faixa">
                          <span className="botao-comunicador__legenda">
                            {botao.legenda}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                )
              )}
            </div>

            {botoesFiltrados.length > 10 && (
              <p className="prancha-botoes__aviso-rolagem">
                Role para baixo para ver mais botões
              </p>
            )}
          </main>
          <aside
            className="carrossel-categorias"
            aria-label="Categorias"
          >
            <h2>Categorias</h2>

            <button
              type="button"
              className="carrossel-categorias__seta"
              onClick={
                categoriaAnterior
              }
              aria-label="Categoria anterior"
              disabled={
                categorias.length === 0
              }
            >
              ▲
            </button>

            <div className="carrossel-categorias__lista">
              {categorias.length ===
                0 ? (
                <p className="carrossel-categorias__vazia">
                  Nenhuma categoria
                  cadastrada.
                </p>
              ) : (
                categorias.map(
                  (
                    categoria,
                    indice
                  ) => (
                    <button
                      type="button"
                      key={
                        categoria.idCategoria
                      }
                      className={
                        indice ===
                          categoriaAtiva
                          ? "categoria-lateral categoria-lateral--ativa"
                          : "categoria-lateral"
                      }
                      onClick={() =>
                        selecionarCategoria(
                          indice
                        )
                      }
                    >
                      {categoria.foto ? (
                        <img
                          src={
                            categoria.foto
                          }
                          alt=""
                        />
                      ) : (
                        <span
                          className="categoria-lateral__placeholder"
                          aria-hidden="true"
                        >
                          {categoria.nome
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}

                      <span>
                        {
                          categoria.nome
                        }
                      </span>
                    </button>
                  )
                )
              )}
            </div>

            <button
              type="button"
              className="carrossel-categorias__seta"
              onClick={
                proximaCategoria
              }
              aria-label="Próxima categoria"
              disabled={
                categorias.length === 0
              }
            >
              ▼
            </button>
          </aside>
        </section>
      </div>
    </div>
  );
}


export default TelaPrincipal;