import api from "./Api.js";

export const buscarBotoesResolvidos =
  async (idUsuario) => {
    const resposta = await api.get(
      `/api/usuarios/${idUsuario}/botoes-resolvidos`,
      {
        params: {
          _: Date.now(),
        },

        headers: {
          "Cache-Control":
            "no-cache",
          Pragma: "no-cache",
        },
      }
    );

    return resposta.data;
  };

export const buscarCategoriasResolvidas =
  async (idUsuario) => {
    const resposta = await api.get(
      `/api/usuarios/${idUsuario}/categorias-resolvidas`,
      {
        params: {
          _: Date.now(),
        },

        headers: {
          "Cache-Control":
            "no-cache",
          Pragma: "no-cache",
        },
      }
    );

    return resposta.data;
  };

export const registrarAcionamento = async (
  idUsuario,
  idBotao
) => {
  const resposta = await api.post(
    `/api/usuarios/${idUsuario}/botoes/${idBotao}/acionar`
  );

  return resposta.data;
};