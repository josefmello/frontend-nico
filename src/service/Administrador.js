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

export const buscarAdministrador = async (idAdministrador) => {
  const resposta = await api.get(`/api/administradores/${idAdministrador}`);
  return resposta.data;
};

export const atualizarAdministrador = async (idAdministrador, dadosAdmin) => {
  const resposta = await api.put(`/api/administradores/${idAdministrador}`, dadosAdmin);
  return resposta.data;
};
