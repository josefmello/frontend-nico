import MenuLateral from "../components/MenuLateral.jsx"
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
        <div className="tela-admin">
            <MenuLateral />
            <main className="conteudo-main">
                <h1>Relatório</h1>
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
                <LineChart width={900} height={300} data={usoPorHora}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hora" />
                    <Tooltip />
                    <Line dataKey="botoes" stroke="#1D6FA3" />
                </LineChart>
            </main>
        </div>
    )
}
export default Relatorio