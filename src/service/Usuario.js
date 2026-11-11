import api from './Api.js';

// A variável dadosUsuario será um objeto contendo todas as informações do formulário de usuário
export const registarUsuario = async (dadosUsuario) => {
  try {
    const resposta = await api.post('/api/usuarios', dadosUsuario);
    return resposta.data;
  } catch (erro) {
    throw erro; 
  }

  
}
export const buscarMeusUsuarios = async () => {
  // Ajuste o caminho da URL de acordo com o endpoint GET que criamos no Spring Boot
  const resposta = await api.get('/api/usuarios/meus-usuarios') 
  return resposta.data
}

export const buscarUsuario = async (idUsuario) => {
  const resposta = await api.get(`/api/usuarios/${idUsuario}`)
  return resposta.data
}

export const atualizarUsuario = async (idUsuario, dadosUsuario) => {
  const resposta = await api.put(`/api/usuarios/${idUsuario}`, dadosUsuario)
  return resposta.data
}
