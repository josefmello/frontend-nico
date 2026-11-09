import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BarraTopo from "../components/BarraTopo.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import {
  buscarBotoesUsuario,
  buscarCategoriasUsuario,
  buscarRegistrosUsuario,
  buscarUsuariosDoAdministrador,
} from "../service/Relatorio.js";
import "./Relatorio.css";

const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function diaDaSemana(data) {
  return new Date(`${data}T12:00:00Z`).getUTCDay();
}

function partesDataHora(valor) {
  const [data, horario = ""] = (valor ?? "").split("T");
  return { data, hora: horario.slice(0, 2) };
}

function quantidadeCliques(registro) {
  const quantidade = Number(registro.quantidadeCliques);
  return Number.isFinite(quantidade) && quantidade > 0 ? quantidade : 1;
}

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function Relatorio() {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const [registros, setRegistros] = useState([]);
  const [botoes, setBotoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [agrupamento, setAgrupamento] = useState("hora");
  const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);
  const [carregandoRelatorio, setCarregandoRelatorio] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    buscarUsuariosDoAdministrador()
      .then((dados) => {
        if (!ativo) return;
        const lista = Array.isArray(dados) ? dados : [];
        setUsuarios(lista);
        if (lista.length > 0) {
          setCarregandoRelatorio(true);
          setIdUsuario(String(lista[0].idUsuario));
        }
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar os usuários.");
      })
      .finally(() => {
        if (ativo) setCarregandoUsuarios(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!idUsuario) return undefined;
    let ativo = true;

    Promise.all([
      buscarRegistrosUsuario(idUsuario),
      buscarBotoesUsuario(idUsuario),
      buscarCategoriasUsuario(idUsuario),
    ])
      .then(([dadosRegistros, dadosBotoes, dadosCategorias]) => {
        if (!ativo) return;
        setRegistros(Array.isArray(dadosRegistros) ? dadosRegistros : []);
        setBotoes(Array.isArray(dadosBotoes) ? dadosBotoes : []);
        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar os dados do relatório.");
      })
      .finally(() => {
        if (ativo) setCarregandoRelatorio(false);
      });

    return () => {
      ativo = false;
    };
  }, [idUsuario]);

  const dados = useMemo(() => {
    const registrosFiltrados = registros.filter((registro) => {
      const { data, hora } = partesDataHora(registro.dataHora);
      if (!data) return false;
      if (dataInicial && data < dataInicial) return false;
      if (dataFinal && data > dataFinal) return false;
      if (diaSelecionado !== "" && diaDaSemana(data) !== Number(diaSelecionado)) return false;
      if (horaSelecionada !== "" && hora !== horaSelecionada) return false;
      return true;
    });

    const total = registrosFiltrados.reduce(
      (soma, registro) => soma + quantidadeCliques(registro),
      0,
    );
    const botoesPorId = new Map(botoes.map((botao) => [String(botao.idBotao), botao]));
    const contagemBotoes = new Map();
    const contagemCategorias = new Map();
    const intervalosAtivos = new Set();
    const usoPorPeriodo = new Map();

    registrosFiltrados.forEach((registro) => {
      const cliques = quantidadeCliques(registro);
      const { data, hora } = partesDataHora(registro.dataHora);
      const idBotao = String(registro.idBotao);
      const botao = botoesPorId.get(idBotao);

      contagemBotoes.set(idBotao, (contagemBotoes.get(idBotao) ?? 0) + cliques);
      intervalosAtivos.add(`${data}-${hora}`);

      const chavePeriodo = agrupamento === "dia" ? data : hora;
      usoPorPeriodo.set(chavePeriodo, (usoPorPeriodo.get(chavePeriodo) ?? 0) + cliques);

      const idsCategorias = botao?.idsCategorias ?? [];
      if (idsCategorias.length === 0) {
        contagemCategorias.set("sem-categoria", (contagemCategorias.get("sem-categoria") ?? 0) + cliques);
      } else {
        idsCategorias.forEach((idCategoria) => {
          const chave = String(idCategoria);
          contagemCategorias.set(chave, (contagemCategorias.get(chave) ?? 0) + cliques);
        });
      }
    });

    const maisUsado = [...contagemBotoes.entries()].sort((a, b) => b[1] - a[1])[0];
    const categoriaMaisUsada = [...contagemCategorias.entries()].sort((a, b) => b[1] - a[1])[0];
    const nomesCategorias = new Map(
      categorias.map((categoria) => [String(categoria.idCategoria), categoria.nome]),
    );
    const grafico = [...usoPorPeriodo.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([periodo, quantidade]) => ({
        periodo: agrupamento === "dia" ? formatarData(periodo) : `${periodo}:00`,
        botoes: quantidade,
      }));

    return {
      total,
      media: intervalosAtivos.size > 0 ? total / intervalosAtivos.size : 0,
      nomeBotao: maisUsado ? botoesPorId.get(maisUsado[0])?.legenda ?? "Botão" : "—",
      nomeCategoria: categoriaMaisUsada
        ? nomesCategorias.get(categoriaMaisUsada[0]) ?? "Sem categoria"
        : "—",
      grafico,
    };
  }, [
    agrupamento,
    botoes,
    categorias,
    dataFinal,
    dataInicial,
    diaSelecionado,
    horaSelecionada,
    registros,
  ]);

  return (
    <div>
      <BarraTopo />
      <div className="tela-admin">
        <MenuLateral />
        <main className="conteudo-main">
          <h1>Relatório</h1>
          <section className="periodo" aria-label="Filtros do relatório">
            <label>
              Usuário:
              <select
                value={idUsuario}
                onChange={(evento) => {
                  setCarregandoRelatorio(true);
                  setErro("");
                  setRegistros([]);
                  setBotoes([]);
                  setCategorias([]);
                  setIdUsuario(evento.target.value);
                }}
                disabled={carregandoUsuarios || usuarios.length === 0}
              >
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data inicial:
              <input type="date" value={dataInicial} onChange={(evento) => setDataInicial(evento.target.value)} />
            </label>
            <label>
              Data final:
              <input type="date" value={dataFinal} onChange={(evento) => setDataFinal(evento.target.value)} />
            </label>
            <label>
              Dia da semana:
              <select value={diaSelecionado} onChange={(evento) => setDiaSelecionado(evento.target.value)}>
                <option value="">Todos</option>
                {diasDaSemana.map((dia, indice) => (
                  <option key={dia} value={indice}>{dia}</option>
                ))}
              </select>
            </label>
            <label>
              Hora:
              <select value={horaSelecionada} onChange={(evento) => setHoraSelecionada(evento.target.value)}>
                <option value="">Todas</option>
                {Array.from({ length: 24 }, (_, hora) => String(hora).padStart(2, "0")).map((hora) => (
                  <option key={hora} value={hora}>{hora}:00</option>
                ))}
              </select>
            </label>
            <label>
              Exibir gráfico:
              <select value={agrupamento} onChange={(evento) => setAgrupamento(evento.target.value)}>
                <option value="hora">Por hora</option>
                <option value="dia">Por dia</option>
              </select>
            </label>
          </section>

          {erro && <p className="relatorio-mensagem erro" role="alert">{erro}</p>}
          {(carregandoUsuarios || carregandoRelatorio) && (
            <p className="relatorio-mensagem" role="status">Carregando relatório...</p>
          )}
          {!carregandoUsuarios && !erro && usuarios.length === 0 && (
            <p className="relatorio-mensagem">Nenhum usuário está vinculado a esta conta.</p>
          )}

          <section className="cartoes" aria-label="Resumo de utilização">
            <article className="cartao">
              <h2>Botões usados</h2>
              <p className="valor">{dados.total}</p>
              <p className="legenda">No período selecionado</p>
            </article>
            <article className="cartao">
              <h2>Média de botões</h2>
              <p className="valor">{dados.media.toFixed(1)}</p>
              <p className="legenda">Por hora ativa</p>
            </article>
            <article className="cartao">
              <h2>Categoria mais usada</h2>
              <p className="nome">{dados.nomeCategoria}</p>
              <p className="legenda">No período selecionado</p>
            </article>
            <article className="cartao">
              <h2>Botão mais usado</h2>
              <p className="nome">{dados.nomeBotao}</p>
              <p className="legenda">No período selecionado</p>
            </article>
          </section>

          <section className="grafico">
            <h2>Gráfico de utilização de botões</h2>
            <p>{agrupamento === "dia" ? "Por dia" : "Por hora"}</p>
            {dados.grafico.length === 0 ? (
              <p className="relatorio-mensagem">Não há utilizações para os filtros selecionados.</p>
            ) : (
              <div className="grafico-area">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dados.grafico} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="periodo" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="botoes" name="Botões usados" stroke="#1D6FA3" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Relatorio;