import api from './Api.js';

// A variável dadosAdmin será um objeto contendo todas as informações do formulário
export const registarAdministrador = async (dadosAdmin) => {
  try {
    const resposta = await api.post('/api/administradores', dadosAdmin);
    return resposta.data;
  } catch (erro) {
    throw erro; 
  }
};