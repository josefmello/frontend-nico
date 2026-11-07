import api from './Api.js';

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