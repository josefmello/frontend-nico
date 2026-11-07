const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Retorna a mensagem de erro do e-mail, ou '' quando está válido. */
export function validarEmail(valor) {
  const email = valor.trim()
  if (!email) return 'Informe seu e-mail.'
  if (!email.includes('@')) return 'O e-mail precisa ter um "@".'
  if (!REGEX_EMAIL.test(email)) return 'Digite um e-mail válido, como nome@email.com.'
  return ''
}
