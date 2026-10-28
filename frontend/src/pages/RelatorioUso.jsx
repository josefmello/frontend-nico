import { useState } from "react"
import { LayoutNico } from "../components"
import "../css/RelatorioUso.css"

// Dados de exemplo — futuramente virão da API
const botoesUsados = 30
const categoriaMaisUsada = { nome: 'Ação', emoji: '🏃' }
const mediaPorHora = 3
const usoPorHora = [0, 0, 1, 0, 2, 4, 6, 8, 5, 3, 4, 7, 9, 6, 4, 3, 5, 6, 4, 2, 3, 1, 0, 0]

const LARGURA = 1440
const ALTURA = 300
const BASE = 250
const PASSO = 58

function RelatorioUso() {
  const [periodo, setPeriodo] = useState('')

  const x = (i) => 50 + i * PASSO
  const y = (v) => BASE - v * 22

  return (

    <LayoutNico titulo="Relatório de Uso">

      <div className="rel-periodo">
        <label htmlFor="periodo">Período do Gráfico</label>
        <input
          id="periodo"
          type="date"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        />
      </div>

      <div className="rel-cartoes">

        <div className="rel-cartao">
          <span className="rel-cartao-titulo">Botões usados</span>
          <strong className="rel-numero">{botoesUsados}</strong>
        </div>

        <div className="rel-cartao">
          <span className="rel-cartao-titulo">Botões usados</span>
          <strong className="rel-numero">{botoesUsados}</strong>
        </div>

        <div className="rel-cartao">
          <span className="rel-cartao-titulo">Categoria mais usada</span>
          <div className="rel-mini-tile">
            <span className="rel-mini-emoji">{categoriaMaisUsada.emoji}</span>
            <span className="rel-mini-legenda">{categoriaMaisUsada.nome}</span>
          </div>
        </div>

        <div className="rel-cartao">
          <span className="rel-cartao-titulo">Média de botões</span>
          <strong className="rel-numero">{mediaPorHora}</strong>
          <span className="rel-cartao-sub">Por hora</span>
        </div>

      </div>

      <div className="rel-grafico">

        <h2>Gráfico de utilização de botões</h2>
        <p>Por dia</p>

        <div className="rel-rolagem">
          <svg width={LARGURA} height={ALTURA} viewBox={`0 0 ${LARGURA} ${ALTURA}`} role="img" aria-label="Utilização de botões por hora">

            {Array.from({ length: 11 }, (_, k) => (
              <line key={k} x1="20" x2={LARGURA - 20} y1={BASE - k * 22} y2={BASE - k * 22} stroke="#bbb" strokeDasharray="4 4" />
            ))}

            <polyline
              fill="none"
              stroke="#4a90d9"
              strokeWidth="3"
              points={usoPorHora.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
            />

            {usoPorHora.map((v, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(v)} r="6" fill="#4a90d9" />
                <text x={x(i)} y={BASE + 32} textAnchor="middle" fontSize="14" fill="#666">
                  {String(i).padStart(2, '0')}:00
                </text>
              </g>
            ))}

          </svg>
        </div>

      </div>

    </LayoutNico>

  )

}

export default RelatorioUso;
