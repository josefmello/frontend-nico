import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    LayoutNico,
    IconeImagemMais,
} from "../components";

import {
    buscarMeusUsuarios,
} from "../service/Usuario.js";

import {
    buscarBotoesResolvidos,
    buscarCategoriasResolvidas,
} from "../service/Comunicador.js";

import {
    criarCategoriaUsuario,
} from "../service/Categoria.js";

function normalizarTexto(texto = "") {
    return texto
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();
}

function AdicionarCategoria() {
    const inputFotoRef = useRef(null);

    const [usuarios, setUsuarios] =
        useState([]);

    const [idUsuario, setIdUsuario] =
        useState("");

    const [nome, setNome] =
        useState("");

    const [foto, setFoto] =
        useState(null);

    const [fotoUrl, setFotoUrl] =
        useState("");

    const [
        botoesDisponiveis,
        setBotoesDisponiveis,
    ] = useState([]);
    const [
        categoriasFiltro,
        setCategoriasFiltro,
    ] = useState([]);

    const [
        idCategoriaFiltro,
        setIdCategoriaFiltro,
    ] = useState("todas");

    const [
        idBotaoArrastado,
        setIdBotaoArrastado,
    ] = useState(null);
    const [
        botoesSelecionados,
        setBotoesSelecionados,
    ] = useState([]);

    const [
        buscaBotao,
        setBuscaBotao,
    ] = useState("");

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
        carregandoBotoes,
        setCarregandoBotoes,
    ] = useState(false);

    const [enviando, setEnviando] =
        useState(false);

    /*
     * Carrega os usuários vinculados
     * ao administrador autenticado.
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
     * Carrega botões globais e botões
     * personalizados do usuário escolhido.
     */
    /*
    * Carrega os botões disponíveis e as
    * categorias do usuário selecionado.
    */
    useEffect(() => {
        if (!idUsuario) {
            setBotoesDisponiveis([]);
            setBotoesSelecionados([]);
            setCategoriasFiltro([]);
            setIdCategoriaFiltro("todas");

            return undefined;
        }

        let ativo = true;

        async function carregarDadosDoUsuario() {
            try {
                setCarregandoBotoes(true);
                setBotoesSelecionados([]);
                setBuscaBotao("");
                setIdCategoriaFiltro("todas");

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
                    Array.isArray(dadosCategorias)
                        ? dadosCategorias
                        : [];

                setBotoesDisponiveis(
                    listaBotoes
                        .filter(
                            (botao) =>
                                botao?.idBotao != null
                        )
                        .sort((primeiro, segundo) =>
                            String(
                                primeiro.legenda || ""
                            ).localeCompare(
                                String(
                                    segundo.legenda || ""
                                ),
                                "pt-BR"
                            )
                        )
                );

                setCategoriasFiltro(
                    listaCategorias
                        .filter(
                            (categoria) =>
                                categoria?.idCategoria !=
                                null
                        )
                        .sort((primeira, segunda) =>
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
            } catch (erroDados) {
                console.error(
                    "Erro ao carregar botões e categorias:",
                    erroDados
                );

                if (ativo) {
                    setBotoesDisponiveis([]);
                    setCategoriasFiltro([]);
                    setTipoMensagem("erro");

                    setMensagem(
                        "Não foi possível carregar os botões e as categorias disponíveis."
                    );
                }
            } finally {
                if (ativo) {
                    setCarregandoBotoes(false);
                }
            }
        }

        carregarDadosDoUsuario();

        return () => {
            ativo = false;
        };
    }, [idUsuario]);

    /*
     * Libera a URL temporária da imagem.
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

    const idsSelecionados = useMemo(
        () =>
            new Set(
                botoesSelecionados.map(
                    (botao) =>
                        Number(botao.idBotao)
                )
            ),
        [botoesSelecionados]
    );

    /*
     * A busca ignora acentos e diferenças
     * entre letras maiúsculas e minúsculas.
     */
    const botoesFiltrados = useMemo(
        () => {
            const buscaNormalizada =
                normalizarTexto(buscaBotao);

            const categoriaSelecionada =
                idCategoriaFiltro === "todas"
                    ? null
                    : Number(
                        idCategoriaFiltro
                    );

            return botoesDisponiveis.filter(
                (botao) => {
                    const idBotao =
                        Number(botao.idBotao);

                    if (
                        idsSelecionados.has(
                            idBotao
                        )
                    ) {
                        return false;
                    }

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
        },
        [
            botoesDisponiveis,
            buscaBotao,
            idCategoriaFiltro,
            idsSelecionados,
        ]
    );

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

            delete errosAtualizados[campo];

            return errosAtualizados;
        });
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
                (atuais) => ({
                    ...atuais,
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
                (atuais) => ({
                    ...atuais,
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

                const novaLista =
                    [...atuais];

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
        evento.dataTransfer.effectAllowed =
            "move";

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

                const novaLista =
                    [...atuais];

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

    const finalizarArrasteBotao = () => {
        setIdBotaoArrastado(null);
    };
    const validarFormulario = () => {
        const novosErros = {};

        if (!idUsuario) {
            novosErros.usuario =
                "Selecione um usuário.";
        }

        if (!nome.trim()) {
            novosErros.nome =
                "Informe o nome da categoria.";
        }

        if (!foto) {
            novosErros.foto =
                "Selecione uma imagem para a categoria.";
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

    const limparFormulario = () => {
        if (fotoUrl) {
            URL.revokeObjectURL(
                fotoUrl
            );
        }

        setNome("");
        setFoto(null);
        setFotoUrl("");
        setBuscaBotao("");

        // Volta o filtro para “Todas as categorias”.
        setIdCategoriaFiltro("todas");

        // Encerra qualquer estado visual de arraste.
        setIdBotaoArrastado(null);

        // Remove todos os botões selecionados.
        setBotoesSelecionados([]);

        // Limpa as mensagens de validação dos campos.
        setErros({});

        // Limpa o input de arquivo real.
        if (inputFotoRef.current) {
            inputFotoRef.current.value = "";
        }
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
                await criarCategoriaUsuario(
                    {
                        nome,
                        idUsuario,
                        botoes:
                            botoesSelecionados,
                        foto,
                    }
                );

            limparFormulario();

            setTipoMensagem("sucesso");

            setMensagem(
                `Categoria "${resposta.nome}" adicionada com sucesso para ${resposta.nomeUsuario}.`
            );
        } catch (erroCadastro) {
            console.error(
                "Erro ao adicionar categoria:",
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
                "Não foi possível adicionar a categoria."
            );
        } finally {
            setEnviando(false);
        }
    };

    return (
        <LayoutNico
            titulo="Adicionar Categoria"
            className="nico-formulario-categoria"
        >
            <form
                onSubmit={adicionar}
                noValidate
            >
                <div className="nico-secao nico-midia nico-midia-categoria">
                    <div>
                        <span className="nico-mini-titulo">
                            Imagem da categoria
                        </span>

                        <label className="nico-upload">
                            {fotoUrl ? (
                                <>
                                    <img
                                        src={fotoUrl}
                                        alt="Imagem selecionada para a categoria"
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

                    <div className="nico-visualizacao-categoria">
                        <span className="nico-mini-titulo">
                            Pré-visualização
                        </span>

                        <div className="nico-preview-categoria">
                            {fotoUrl ? (
                                <img
                                    src={fotoUrl}
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
                    <div className="nico-linha">
                        <label
                            className="nico-rotulo"
                            htmlFor="usuario-categoria"
                        >
                            Usuário:
                        </label>

                        <select
                            id="usuario-categoria"
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
                            htmlFor="nome-categoria"
                        >
                            Nome:
                        </label>

                        <input
                            id="nome-categoria"
                            className={
                                erros.nome
                                    ? "nico-entrada nico-entrada-erro"
                                    : "nico-entrada"
                            }
                            type="text"
                            value={nome}
                            maxLength={100}
                            placeholder="Ex.: Minha rotina"
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
                </div>

                <div className="nico-secao">
                    <div>
                        <span className="nico-mini-titulo">
                            Botões da categoria
                        </span>

                        <label
                            className="nico-busca-rotulo"
                            htmlFor="buscar-botao"
                        >
                            Buscar botão pelo nome
                        </label>

                        <input
                            id="buscar-botao"
                            className="nico-entrada"
                            type="search"
                            value={buscaBotao}
                            placeholder="Ex.: Abraço"
                            disabled={
                                enviando ||
                                carregandoBotoes ||
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
                                htmlFor="filtro-categoria-botao"
                            >
                                Filtrar por categoria
                            </label>

                            <select
                                id="filtro-categoria-botao"
                                className="nico-entrada"
                                value={idCategoriaFiltro}
                                disabled={
                                    enviando ||
                                    carregandoBotoes ||
                                    !idUsuario
                                }
                                onChange={(evento) => {
                                    setIdCategoriaFiltro(
                                        evento.target.value
                                    );
                                }}
                            >
                                <option value="todas">
                                    Todas as categorias
                                </option>

                                {categoriasFiltro.map(
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
                    </div>

                    <div className="nico-seletor-botoes">
                        <section
                            className="nico-lista-botoes"
                            aria-labelledby="titulo-disponiveis"
                        >
                            <h2 id="titulo-disponiveis">
                                Botões disponíveis
                            </h2>

                            {carregandoBotoes ? (
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
                                                    disabled={
                                                        enviando
                                                    }
                                                    onClick={() =>
                                                        selecionarBotao(
                                                            botao
                                                        )
                                                    }
                                                >
                                                    {botao.foto ? (
                                                        <img
                                                            src={botao.foto}
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
                            aria-labelledby="titulo-selecionados"
                        >
                            <h2 id="titulo-selecionados">
                                Botões selecionados
                            </h2>

                            {botoesSelecionados.length >
                                0 ? (
                                <ol>
                                    {botoesSelecionados.map(
                                        (
                                            botao,
                                            indice
                                        ) => (
                                            <li
                                                key={botao.idBotao}
                                                className={
                                                    Number(idBotaoArrastado) ===
                                                        Number(botao.idBotao)
                                                        ? "nico-botao-selecionado nico-botao-selecionado--arrastando"
                                                        : "nico-botao-selecionado"
                                                }
                                                onDragOver={
                                                    permitirSoltarBotao
                                                }
                                                onDrop={(evento) =>
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
                                                    aria-label={`Arrastar ${botao.legenda} para alterar a ordem`}
                                                    onDragStart={(evento) =>
                                                        iniciarArrasteBotao(
                                                            evento,
                                                            botao.idBotao
                                                        )
                                                    }
                                                    onDragEnd={
                                                        finalizarArrasteBotao
                                                    }
                                                >
                                                    ⋮⋮
                                                </span>
                                                <span className="nico-botao-ordem">
                                                    {indice + 1}
                                                </span>

                                                {botao.foto ? (
                                                    <img
                                                        src={botao.foto}
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
                                                        aria-label={`Mover ${botao.legenda} para cima`}
                                                        title="Mover para cima"
                                                        disabled={
                                                            enviando ||
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
                                                        aria-label={`Mover ${botao.legenda} para baixo`}
                                                        title="Mover para baixo"
                                                        disabled={
                                                            enviando ||
                                                            indice ===
                                                            botoesSelecionados.length -
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
                                                        aria-label={`Remover ${botao.legenda}`}
                                                        title="Remover"
                                                        disabled={
                                                            enviando
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
                        disabled={
                            enviando ||
                            carregandoUsuarios ||
                            carregandoBotoes
                        }
                    >
                        {enviando
                            ? "Adicionando..."
                            : "Adicionar categoria"}
                    </button>

                    <button
                        className="nico-botao nico-botao-secundario"
                        type="button"
                        disabled={enviando}
                        onClick={() => {
                            limparFormulario();
                            limparMensagem();
                        }}
                    >
                        Limpar
                    </button>
                </div>
            </form>
        </LayoutNico>
    );
}

export default AdicionarCategoria;