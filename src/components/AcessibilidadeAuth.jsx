import { useEffect, useRef, useState } from "react"
import "./AcessibilidadeAuth.css"

const NIVEIS = [100, 115, 130, 150, 175] // % de ampliação
const CHAVE_FONTE = "nico.acessibilidade.fonte"
const SELETOR_LEITURA = "h1, h2, h3, p, label, legend, button, a, img[alt]"

function lerNivelSalvo() {
  try {
    const salvo = Number(localStorage.getItem(CHAVE_FONTE))
    return NIVEIS.includes(salvo) ? salvo : NIVEIS[0]
  } catch {
    return NIVEIS[0]
  }
}

/** Monta a lista de textos a falar, na ordem da tela. Nunca lê valores digitados nos campos. */
function extrairTextos(raiz) {
  const textos = []

  raiz.querySelectorAll(SELETOR_LEITURA).forEach((el) => {
    if (el.closest('[aria-hidden="true"]')) return
    if (el.getClientRects().length === 0) return // elemento oculto (display: none)

    let texto
    if (el.tagName === "IMG") {
      texto = el.getAttribute("alt")
    } else {
      const copia = el.cloneNode(true)
      copia
        .querySelectorAll('[aria-hidden="true"], svg, input, select, textarea')
        .forEach((no) => no.remove())
      texto = copia.textContent
    }

    texto = texto?.replace(/\*/g, " (obrigatório) ").replace(/\s+/g, " ").trim()
    if (texto) textos.push(texto)
  })

  return textos
}

function AcessibilidadeAuth({ children }) {
  const conteudoRef = useRef(null)
  const leituraRef = useRef(0) // invalida callbacks de leituras interrompidas
  const [nivel, setNivel] = useState(lerNivelSalvo)
  const [lendo, setLendo] = useState(false)

  const suportaVoz =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window

  const indice = NIVEIS.indexOf(nivel)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_FONTE, String(nivel))
    } catch {
      /* armazenamento indisponível: a preferência vale só nesta visita */
    }
  }, [nivel])

  // Ao sair da tela, interrompe qualquer leitura em andamento
  useEffect(() => {
    return () => {
      leituraRef.current += 1
      if (suportaVoz) window.speechSynthesis.cancel()
    }
  }, [suportaVoz])

  const pararLeitura = () => {
    leituraRef.current += 1
    window.speechSynthesis.cancel()
    setLendo(false)
  }

  const iniciarLeitura = () => {
    const textos = extrairTextos(conteudoRef.current)
    if (textos.length === 0) return

    window.speechSynthesis.cancel()
    const id = ++leituraRef.current
    setLendo(true)

    // Uma fala por elemento: evita o corte de falas longas que alguns navegadores fazem
    textos.forEach((texto, i) => {
      const fala = new SpeechSynthesisUtterance(texto)
      fala.lang = "pt-BR"
      const fim = () => {
        if (id === leituraRef.current && i === textos.length - 1) setLendo(false)
      }
      fala.onend = fim
      fala.onerror = fim
      window.speechSynthesis.speak(fala)
    })
  }

  return (
    <>
      <div className="acess-barra" role="region" aria-label="Recursos de acessibilidade">
        <button
          type="button"
          className="acess-btn"
          aria-label="Diminuir fonte"
          disabled={indice === 0}
          onClick={() => setNivel(NIVEIS[indice - 1])}
        >
          A−
        </button>

        <span className="acess-nivel" aria-live="polite">
          {nivel}%
        </span>

        <button
          type="button"
          className="acess-btn"
          aria-label="Aumentar fonte"
          disabled={indice === NIVEIS.length - 1}
          onClick={() => setNivel(NIVEIS[indice + 1])}
        >
          A+
        </button>

        <button
          type="button"
          className="acess-btn acess-btn--ouvir"
          aria-pressed={lendo}
          disabled={!suportaVoz}
          title={suportaVoz ? undefined : "Seu navegador não suporta leitura em voz alta."}
          onClick={lendo ? pararLeitura : iniciarLeitura}
        >
          {lendo ? "Parar leitura" : "Ouvir a página"}
        </button>

        <p className="acess-sr" role="status">
          {lendo ? "Lendo a página." : ""}
        </p>
      </div>

      <div
        ref={conteudoRef}
        className="acess-conteudo"
        style={{ zoom: String(nivel / 100), "--acess-zoom": String(nivel / 100) }}
      >
        {children}
      </div>
    </>
  )
}

export default AcessibilidadeAuth