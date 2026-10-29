import "./TelaPrincipal.css"
const categorias = ["Comer", "Beber", "Sentir", "Brincar", "Lugares", "Pessoas"]

function TelaPrincipal() {
    return (
        <main>
            <section>
                <h2>Frase</h2>
                <div className="tira">
                    <p className="tira-vazia">Toque nos botões para montar sua frase</p>
                </div>
                <button disabled>Apagar</button>
                <button disabled>Falar</button>
            </section>

            <section>
                    <h2>Categorias</h2>
                    {categorias.map((categoria) => (
                        <button key={categoria}>{categoria}</button>
                    ))}
            </section>

            <section>
                <h2>Prancha</h2>
                <button className="botao-prancha">
                    <span role="img" aria-label="água">💧</span>
                    <span>Água</span>
                </button>
            </section>
        </main>
    )
}

export default TelaPrincipal