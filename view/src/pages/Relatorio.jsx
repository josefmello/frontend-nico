import "./Relatorio.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
const cartoes = [
    { titulo: "Botões usados", valor: 30, legenda: "Vs dia anterior" },
    { titulo: "Média de botões", valor: 3, legenda: "Por hora" },
    { titulo: "Categoria mais usada", figura: "🏃", nome: "Ação", legenda: "Vs dia anterior" },
    { titulo: "Botão mais usado", figura: "👍", nome: "Sim", legenda: "Vs dia anterior" }
]
const usoPorHora = [
    { hora: "09:00", botoes: 2 },
    { hora: "10:00", botoes: 3 },
    { hora: "11:00", botoes: 4 },
    { hora: "12:00", botoes: 5 },
    { hora: "13:00", botoes: 6 },
    { hora: "14:00", botoes: 7 },
    { hora: "15:00", botoes: 8 },
];



function Relatorio() {
    return (
                <main className="conteudo-main">
                    <h1>Relatório</h1>
                    <section className="periodo">
                        <label>Período dos dados:<input type="date" /></label>
                    </section>
                    <section className="cartoes">
                        {cartoes.map((cartao) => (
                            <article key={cartao.titulo} className="cartao">
                                <h2>{cartao.titulo}</h2>
                                {cartao.valor && <p className="valor">{cartao.valor}</p>}
                                {cartao.figura && <p className="figura">{cartao.figura}</p>}
                                {cartao.nome && <p className="nome">{cartao.nome}</p>}
                                <p className="legenda">{cartao.legenda}</p>
                            </article>
                        ))}
                    </section>
                    <section className="grafico">
                        <h2>Gráfico de utilização de botões</h2>
                        <p>Por dia</p>
                        <LineChart width={900} height={300} data={usoPorHora}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="hora" padding={{ left: 20, right: 20 }} />
                            <Tooltip />
                            <Line dataKey="botoes" stroke="#1D6FA3" />
                        </LineChart>
                    </section>
                </main>
    )
}
export default Relatorio