import api from './Api.js';

// A variável dadosUsuario será um objeto contendo todas as informações do formulário de usuário
export const registarUsuario = async (dadosUsuario) => {
  try {
    const resposta = await api.post('/api/usuarios', dadosUsuario);
    return resposta.data;
  } catch (erro) {
    throw erro; 
  }
};