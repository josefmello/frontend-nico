git add .import api from './Api.js';

export const realizarLogin = async (email, senha) => {
  try {
    const resposta = await api.post('/api/login', {
      email: email,
      senha: senha
    });
    
    return resposta.data;
  } catch (erro) {
    throw erro;
  }
};

// Valida o PIN do administrador logado (o token Bearer, enviado pelo Api.js, identifica quem é).
// 200 = PIN correto; 400/401 = PIN incorreto.
export const validarPin = async (pin) => {
  const resposta = await api.post('/api/login/pin', { pin: Number(pin) });
  return resposta.data;
};
