import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  buscarBotoesUsuario,
  buscarCategoriasUsuario,
  buscarRegistrosUsuario,
  buscarUsuariosDoAdministrador,
} from "../service/Relatorio.js";

import "./Relatorio.css";

function partesDataHora(valor) {
  const [data, horario = ""] =
    (valor ?? "").split("T");

  return {
    data,
    hora: horario.slice(0, 2),
  };
}

function quantidadeCliques(registro) {
  const quantidade = Number(
    registro.quantidadeCliques
  );

  return Number.isFinite(quantidade) &&
    quantidade > 0
    ? quantidade
    : 1;
}

function BotaoGraficoPonto({
  cx,
  cy,
  payload,
}) {
  if (
    cx == null ||
    cy == null ||
    !payload.idBotao
  ) {
    return null;
  }

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={18}
        fill="#ffffff"
        stroke="#d5dce0"
      />

      {payload.fotoBotao ? (
        <image
          href={payload.fotoBotao}
          x={cx - 14}
          y={cy - 14}
          width={28}
          height={28}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="#1D6FA3"
        />
      )}

      <title>
        {payload.nomeBotao}:{" "}
        {payload.quantidade}{" "}
        {payload.quantidade === 1
          ? "vez"
          : "vezes"}
      </title>
    </g>
  );
}

function TooltipGrafico({
  active,
  payload,
  label,
}) {
  const ponto = payload?.[0]?.payload;

  if (!active || !ponto?.idBotao) {
    return null;
  }

  return (
    <div className="grafico-tooltip">
      <p className="grafico-tooltip__horario">
        {label}
      </p>

      <div className="grafico-tooltip__item">
        {ponto.fotoBotao ? (
          <img
            className="grafico-tooltip__imagem"
            src={ponto.fotoBotao}
            alt=""
          />
        ) : null}

        <span>
          {ponto.nomeBotao}:{" "}
          {ponto.quantidade}{" "}
          {ponto.quantidade === 1
            ? "vez"
            : "vezes"}
        </span>
      </div>
    </div>
  );
}

function Relatorio() {
  const [usuarios, setUsuarios] =
    useState([]);

  const [idUsuario, setIdUsuario] =
    useState("");

  const [registros, setRegistros] =
    useState([]);

  const [botoes, setBotoes] =
    useState([]);

  const [categorias, setCategorias] =
    useState([]);

  const [dataInicial, setDataInicial] =
    useState("");

  const [dataFinal, setDataFinal] =
    useState("");

  const [
    carregandoUsuarios,
    setCarregandoUsuarios,
  ] = useState(true);

  const [
    carregandoRelatorio,
    setCarregandoRelatorio,
  ] = useState(false);

  const [erro, setErro] =
    useState("");

  useEffect(() => {
    let ativo = true;

    buscarUsuariosDoAdministrador()
      .then((dados) => {
        if (!ativo) {
          return;
        }

        const lista = Array.isArray(dados)
          ? dados
          : [];

        setUsuarios(lista);

        if (lista.length > 0) {
          setCarregandoRelatorio(true);

          setIdUsuario(
            String(lista[0].idUsuario)
          );
        }
      })
      .catch((erroUsuarios) => {
        console.error(
          "Erro ao carregar usuários:",
          erroUsuarios
        );

        if (ativo) {
          setErro(
            "Não foi possível carregar os usuários."
          );
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregandoUsuarios(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!idUsuario) {
      return undefined;
    }

    let ativo = true;

    setCarregandoRelatorio(true);
    setErro("");

    Promise.all([
      buscarRegistrosUsuario(
        idUsuario
      ),
      buscarBotoesUsuario(
        idUsuario
      ),
      buscarCategoriasUsuario(
        idUsuario
      ),
    ])
      .then(
        ([
          dadosRegistros,
          dadosBotoes,
          dadosCategorias,
        ]) => {
          if (!ativo) {
            return;
          }

          setRegistros(
            Array.isArray(
              dadosRegistros
            )
              ? dadosRegistros
              : []
          );

          setBotoes(
            Array.isArray(dadosBotoes)
              ? dadosBotoes
              : []
          );

          setCategorias(
            Array.isArray(
              dadosCategorias
            )
              ? dadosCategorias
              : []
          );
        }
      )
      .catch((erroRelatorio) => {
        console.error(
          "Erro ao carregar relatório:",
          erroRelatorio
        );

        if (ativo) {
          setErro(
            "Não foi possível carregar os dados do relatório."
          );
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregandoRelatorio(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [idUsuario]);

  const dados = useMemo(() => {
    const registrosFiltrados =
      registros.filter((registro) => {
        const { data } =
          partesDataHora(
            registro.dataHora
          );

        if (!data) {
          return false;
        }

        if (
          dataInicial &&
          data < dataInicial
        ) {
          return false;
        }

        if (
          dataFinal &&
          data > dataFinal
        ) {
          return false;
        }

        return true;
      });

    const total =
      registrosFiltrados.reduce(
        (soma, registro) =>
          soma +
          quantidadeCliques(registro),
        0
      );

    const botoesPorId = new Map(
      botoes.map((botao) => [
        String(botao.idBotao),
        botao,
      ])
    );

    const contagemBotoes =
      new Map();

    const contagemCategorias =
      new Map();

    const intervalosAtivos =
      new Set();

    const cliquesPorHora =
      new Map();

    registrosFiltrados.forEach(
      (registro) => {
        const cliques =
          quantidadeCliques(registro);

        const { data, hora } =
          partesDataHora(
            registro.dataHora
          );

        const idBotao = String(
          registro.idBotao
        );

        const botao =
          botoesPorId.get(idBotao);

        contagemBotoes.set(
          idBotao,
          (contagemBotoes.get(
            idBotao
          ) ?? 0) + cliques
        );

        intervalosAtivos.add(
          `${data}-${hora}`
        );

        const botoesDaHora =
          cliquesPorHora.get(hora) ??
          new Map();

        botoesDaHora.set(
          idBotao,
          (botoesDaHora.get(idBotao) ?? 0) +
            cliques
        );
        cliquesPorHora.set(
          hora,
          botoesDaHora
        );

        const idsCategorias =
          Array.isArray(
            botao?.idsCategorias
          )
            ? botao.idsCategorias
            : [];

        if (
          idsCategorias.length === 0
        ) {
          contagemCategorias.set(
            "sem-categoria",
            (contagemCategorias.get(
              "sem-categoria"
            ) ?? 0) + cliques
          );
        } else {
          idsCategorias.forEach(
            (idCategoria) => {
              const chave = String(
                idCategoria
              );

              contagemCategorias.set(
                chave,
                (contagemCategorias.get(
                  chave
                ) ?? 0) + cliques
              );
            }
          );
        }
      }
    );

    const maisUsado = [
      ...contagemBotoes.entries(),
    ].sort(
      (a, b) => b[1] - a[1]
    )[0];

    const categoriaMaisUsada = [
      ...contagemCategorias.entries(),
    ].sort(
      (a, b) => b[1] - a[1]
    )[0];

    const nomesCategorias =
      new Map(
        categorias.map(
          (categoria) => [
            String(
              categoria.idCategoria
            ),
            categoria.nome,
          ]
        )
      );

    const grafico = Array.from(
      { length: 24 },
      (_, hora) => {
        const horaFormatada = String(
          hora
        ).padStart(2, "0");
        const maisUsadoNaHora = [
          ...(cliquesPorHora.get(
            horaFormatada
          ) ?? new Map()),
        ].sort(
          ([idA, quantidadeA], [idB, quantidadeB]) =>
            quantidadeB - quantidadeA ||
            idA.localeCompare(idB)
        )[0];
        const botao = maisUsadoNaHora
          ? botoesPorId.get(
              maisUsadoNaHora[0]
            )
          : null;

        return {
          periodo: `${horaFormatada}:00`,
          quantidade:
            maisUsadoNaHora?.[1] ?? 0,
          idBotao: maisUsadoNaHora?.[0] ?? "",
          nomeBotao:
            botao?.legenda ??
            botao?.nome ??
            (maisUsadoNaHora
              ? `Botão ${maisUsadoNaHora[0]}`
              : ""),
          fotoBotao: botao?.foto ?? "",
        };
      }
    );

    return {
      total,

      media:
        intervalosAtivos.size > 0
          ? total /
            intervalosAtivos.size
          : 0,

      nomeBotao: maisUsado
        ? botoesPorId.get(
            maisUsado[0]
          )?.legenda ?? "Botão"
        : "—",

      nomeCategoria:
        categoriaMaisUsada
          ? nomesCategorias.get(
              categoriaMaisUsada[0]
            ) ?? "Sem categoria"
          : "—",

      grafico,
    };
  }, [
    botoes,
    categorias,
    dataFinal,
    dataInicial,
    registros,
  ]);

  const alterarUsuario = (
    evento
  ) => {
    setCarregandoRelatorio(true);
    setErro("");
    setRegistros([]);
    setBotoes([]);
    setCategorias([]);
    setIdUsuario(
      evento.target.value
    );
  };

  const limparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
  };

  const carregando =
    carregandoUsuarios ||
    carregandoRelatorio;

  return (
    <section className="relatorio">
      <div className="relatorio__cabecalho">
        <div>
          <span className="relatorio__sobre-titulo">
            Área administrativa
          </span>

          <h1>Relatório</h1>
        </div>

        <button
          type="button"
          className="relatorio__limpar"
          onClick={limparFiltros}
        >
          Limpar filtros
        </button>
      </div>

      <section
        className="periodo"
        aria-label="Filtros do relatório"
      >
        <label>
          Usuário:

          <select
            value={idUsuario}
            onChange={alterarUsuario}
            disabled={
              carregandoUsuarios ||
              usuarios.length === 0
            }
          >
            {usuarios.length === 0 ? (
              <option value="">
                Nenhum usuário
              </option>
            ) : (
              usuarios.map(
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
              )
            )}
          </select>
        </label>

        <label>
          Data inicial:

          <input
            type="date"
            value={dataInicial}
            max={dataFinal || undefined}
            onChange={(evento) =>
              setDataInicial(
                evento.target.value
              )
            }
          />
        </label>

        <label>
          Data final:

          <input
            type="date"
            value={dataFinal}
            min={
              dataInicial || undefined
            }
            onChange={(evento) =>
              setDataFinal(
                evento.target.value
              )
            }
          />
        </label>

      </section>

      {erro && (
        <p
          className="relatorio-mensagem erro"
          role="alert"
        >
          {erro}
        </p>
      )}

      {carregando && (
        <p
          className="relatorio-mensagem"
          role="status"
        >
          Carregando relatório...
        </p>
      )}

      {!carregandoUsuarios &&
        !erro &&
        usuarios.length === 0 && (
          <p className="relatorio-mensagem">
            Nenhum usuário está
            vinculado a esta conta.
          </p>
        )}

      <section
        className="cartoes"
        aria-label="Resumo de utilização"
      >
        <article className="cartao">
          <h2>Botões usados</h2>

          <p className="valor">
            {dados.total}
          </p>

          <p className="legenda">
            No período selecionado
          </p>
        </article>

        <article className="cartao">
          <h2>Média de botões</h2>

          <p className="valor">
            {dados.media.toFixed(1)}
          </p>

          <p className="legenda">
            Por hora ativa
          </p>
        </article>

        <article className="cartao">
          <h2>
            Categoria mais usada
          </h2>

          <p className="nome">
            {dados.nomeCategoria}
          </p>

          <p className="legenda">
            No período selecionado
          </p>
        </article>

        <article className="cartao">
          <h2>Botão mais usado</h2>

          <p className="nome">
            {dados.nomeBotao}
          </p>

          <p className="legenda">
            No período selecionado
          </p>
        </article>
      </section>

      <section className="grafico">
        <div className="grafico__cabecalho">
          <div>
            <h2>
              Gráfico de utilização
              de botões
            </h2>

            <p>
              Botão mais utilizado em cada horário
            </p>
          </div>
        </div>

        {dados.total === 0 ? (
          <p className="relatorio-mensagem">
            Não há utilizações para
            os filtros selecionados.
          </p>
        ) : (
          <div className="grafico-area">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={dados.grafico}
                margin={{
                  top: 8,
                  right: 16,
                  left: 0,
                  bottom: 8,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="periodo"
                  interval={2}
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip
                  content={<TooltipGrafico />}
                />

                <Line
                  type="monotone"
                  dataKey="quantidade"
                  name="Cliques do botão mais utilizado"
                  stroke="#1D6FA3"
                  strokeWidth={2}
                  dot={<BotaoGraficoPonto />}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </section>
  );
}

export default Relatorio;