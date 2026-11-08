import "./Auth.css"

const ICONES = { erro: "⚠", aviso: "ℹ", ok: "✓" }

/**
 * Campo de formulário acessível: label + controle + dica + mensagem de status.
 * `children` é uma função que recebe as props de acessibilidade para espalhar no controle:
 *   <Campo id="x" label="X">{(a11y) => <input {...a11y} />}</Campo>
 *
 * Mensagens (só uma aparece, por prioridade):
 *  - erro:  bloqueia o envio (vermelho)
 *  - aviso: alerta suave, ex.: senhas diferentes (amarelo)
 *  - ok:    confirmação positiva (azul)
 */
function Campo({ id, label, opcional = false, dica, erro, aviso, ok, children }) {
  const status = erro ? "erro" : aviso ? "aviso" : ok ? "ok" : null
  const mensagem = erro || aviso || ok
  const idMsg = `${id}-msg`
  const idDica = `${id}-dica`

  const descricao = [dica && idDica, mensagem && idMsg].filter(Boolean).join(" ") || undefined

  const a11y = {
    id,
    className: status === "erro" || status === "aviso" ? `auth-input auth-input--${status}` : "auth-input",
    "aria-invalid": status === "erro" || status === "aviso" ? true : undefined,
    "aria-describedby": descricao,
  }

  return (
    <div className="auth-campo">
      <label htmlFor={id} className="auth-label">
        {label}
        {opcional && <span className="auth-opcional"> (opcional)</span>}
      </label>

      {children(a11y)}

      {dica && (
        <p id={idDica} className="auth-dica">
          {dica}
        </p>
      )}

      {mensagem && (
        <p id={idMsg} className={`auth-msg auth-msg--${status}`} role={status === "erro" ? "alert" : "status"}>
          <span aria-hidden="true">{ICONES[status]} </span>
          {mensagem}
        </p>
      )}
    </div>
  )
}

export default Campo
