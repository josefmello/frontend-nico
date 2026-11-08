import "./TelaPrincipal.css"
import { useState } from "react"
const categorias = ["Comer", "Beber", "Sentir", "Brincar", "Lugares", "Pessoas"]
const botoes = [
    { texto: "Eu", emoji: "🙋", audio: "/audios/eu.mp3" },
    { texto: "Quero", emoji: "👉", audio: "/audios/quero.mp3" },
    { texto: "Água", emoji: "💧", audio: "/audios/agua.mp3" },
]

function TelaPrincipal() {
    const [frase, setFrase] = useState([])
    return (
        <main>
            <section>
                <h2>Frase</h2>
                <div className="tira">
                    {frase.length === 0 && <p className="tira-vazia">Toque nos botões para montar sua frase</p>}
                    {frase.length > 0 && <p>{frase.map((b) => b.texto).join(" ")}</p>}
                </div>
                <button disabled={frase.length === 0} onClick={() => setFrase(frase.slice(0, -1))}>
                    Apagar
                </button>
                <button disabled={frase.length === 0} onClick={() => console.log(frase.map((b) => b.texto).join(" "))}>
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
                {botoes.map((botao) => (
                    <button key={botao.texto} className="botao-prancha" onClick={() => setFrase([...frase, botao])}>
                        <span role="img" aria-label={botao.texto}>{botao.emoji}</span>
                        <span>{botao.texto}</span>
                    </button>
                ))}
            </section>
        </main>
    )
}

export default TelaPrincipal