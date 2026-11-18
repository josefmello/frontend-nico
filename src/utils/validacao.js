const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Retorna a mensagem de erro do e-mail, ou '' quando está válido. */
export function validarEmail(valor) {
  const email = valor.trim()
  if (!email) return 'Informe seu e-mail.'
  if (!email.includes('@')) return 'O e-mail precisa ter um "@".'
  if (!REGEX_EMAIL.test(email)) return 'Digite um e-mail válido, como nome@email.com.'
  return ''
}

export const TAMANHO_MINIMO_SENHA = 8

/** Requisitos mínimos de uma senha nova. Cada item diz se já foi atendido. */
export function requisitosSenha(senha) {
  return [
    { id: 'tamanho', texto: `Pelo menos ${TAMANHO_MINIMO_SENHA} caracteres`, ok: senha.length >= TAMANHO_MINIMO_SENHA },
    { id: 'minuscula', texto: 'Uma letra minúscula', ok: /[a-zà-ÿ]/.test(senha) },
    { id: 'maiuscula', texto: 'Uma letra maiúscula', ok: /[A-ZÀ-ß]/.test(senha) },
    { id: 'numero', texto: 'Um número', ok: /\d/.test(senha) },
    { id: 'especial', texto: 'Um caractere especial (@, #, $, !...)', ok: /[^A-Za-z0-9À-ÿ\s]/.test(senha) },
  ]
}

/** Nível da senha: 0 (vazia), 1 fraca, 2 média, 3 forte. Só é "forte" com todos os requisitos. */
export function nivelSenha(senha) {
  if (!senha) return 0
  const atendidos = requisitosSenha(senha).filter((r) => r.ok).length
  if (atendidos === 5) return 3
  return atendidos >= 4 ? 2 : 1
}

/** Mensagem do que ainda falta na senha, ou '' quando atende a todos os requisitos. */
export function validarSenhaNova(senha) {
  const faltando = requisitosSenha(senha).filter((r) => !r.ok)
  if (faltando.length === 0) return ''
  return `Sua senha ainda precisa de: ${faltando.map((r) => r.texto.charAt(0).toLowerCase() + r.texto.slice(1)).join('; ')}.`
}
