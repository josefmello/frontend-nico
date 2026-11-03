import MenuLateral from "../components/MenuLateral.jsx"
import "./Relatorio.css"
const cartoes = [
    { titulo: "Botões usados", valor: 30, legenda: "Vs dia anterior" },
    { titulo: "Média de botões", valor: 3, legenda: "Por hora" },
    { titulo: "Categoria mais usada", figura: "🏃", nome: "Ação", legenda: "Vs dia anterior" },
    { titulo: "Botão mais usado", figura: "👍", nome: "Sim", legenda: "Vs dia anterior" }
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
            </main>
        </div>
    )
}
export default Relatorio