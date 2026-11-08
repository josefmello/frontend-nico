import "./TelaPrincipal.css"
import { useState } from "react"
const categorias = ["Comer", "Beber", "Sentir", "Brincar", "Lugares", "Pessoas"]

function TelaPrincipal() {
    const [frase, setFrase] = useState([])
    return (
        <main>
            <section>
                <h2>Frase</h2>
                <div className="tira">
                    {frase.length === 0 && <p className="tira-vazia">Toque nos botões para montar sua frase</p>}
                    {frase.length > 0 && <p>{frase.join(" ")}</p>}
                </div>
                <button disabled={frase.length === 0} onClick={() => setFrase(frase.slice(0, -1))}>
                    Apagar
                </button>
                <button disabled={frase.length === 0} onClick={() => console.log(frase.join(" "))}>
                    Falar
                </button>
                <button disabled={frase.length === 0} onClick={() => setFrase([])}>
                    Limpar
                </button>
            </section>

            <section>
                <h2>Categorias</h2>
                {categorias.map((categoria) => (
                    <button key={categoria}>{categoria}</button>
                ))}
            </section>

            <section>
                <h2>Prancha</h2>
                <button className="botao-prancha" onClick={() => setFrase([...frase, "Água"])}>
                    <span role="img" aria-label="água">💧</span>
                    <span>Água</span>
                </button>
            </section>
        </main>
    )
}

export default TelaPrincipal