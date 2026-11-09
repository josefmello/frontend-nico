const API_URL = "https://api-nico.onrender.com";

async function get(caminho) {
  const token = localStorage.getItem("token");
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: token ? { Authorization: `Bearer ${token.trim()}` } : {},
  });

  if (!resposta.ok) {
    throw new Error(`Falha na consulta (${resposta.status}).`);
  }

  return resposta.json();
}

export async function buscarUsuariosDoAdministrador() {
  return get("/api/usuarios/meus-usuarios");
}

export async function buscarRegistrosUsuario(idUsuario) {
  return get(`/api/usuarios/${idUsuario}/registros`);
}

export async function buscarBotoesUsuario(idUsuario) {
  return get(`/api/usuarios/${idUsuario}/botoes-resolvidos`);
}

export async function buscarCategoriasUsuario(idUsuario) {
  return get(`/api/usuarios/${idUsuario}/categorias-resolvidas`);
}
