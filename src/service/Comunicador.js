import api from "./Api.js";

const executarGet = async (url) => {
  try {
    const resposta = await api.get(url, {
      params: {
        _: Date.now(),
      },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    return resposta.data;
  } catch (erro) {
    console.error("Falha na API do comunicador:", {
      url,
      status: erro.response?.status,
      resposta: erro.response?.data,
      mensagem: erro.message,
    });

    throw erro;
  }
};

export const buscarBotoesResolvidos = async (idUsuario) => {
  return executarGet(
    `/api/usuarios/${Number(idUsuario)}/botoes-resolvidos`
  );
};

export const buscarCategoriasResolvidas = async (idUsuario) => {
  return executarGet(
    `/api/usuarios/${Number(idUsuario)}/categorias-resolvidas`
  );
};

export const registrarAcionamento = async (
  idUsuario,
  idBotao
) => {
  const resposta = await api.post(
    `/api/usuarios/${Number(idUsuario)}/botoes/${Number(idBotao)}/acionar`
  );

  return resposta.data;
};
