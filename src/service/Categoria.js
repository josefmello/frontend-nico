import api from "./Api.js";

export async function criarCategoriaUsuario({
  nome,
  idUsuario,
  botoes,
  foto,
}) {
  const dados = {
    nome: nome.trim(),

    idUsuario:
      Number(idUsuario),

    botoes: botoes.map(
      (botao, indice) => ({
        idBotao: Number(
          botao.idBotao
        ),

        posicao: indice + 1,
      })
    ),
  };

  const formulario =
    new FormData();

  formulario.append(
    "dados",
    JSON.stringify(dados)
  );

  formulario.append(
    "foto",
    foto
  );

  const resposta =
    await api.post(
      "/api/categorias/usuario",
      formulario
    );

  return resposta.data;
}

export async function editarCategoriaUsuario({
  idCategoria,
  idUsuario,
  nome,
  oculto = false,
  botoes,
  foto,
}) {
  if (!idCategoria) {
    throw new Error(
      "O ID da categoria é obrigatório."
    );
  }

  if (
    !Array.isArray(botoes) ||
    botoes.length === 0
  ) {
    throw new Error(
      "Selecione pelo menos um botão."
    );
  }

  const dados = {
    idUsuario:
      Number(idUsuario),

    nome:
      nome.trim(),

    oculto:
      Boolean(oculto),

    /*
     * A posição é determinada pela
     * ordem atual da lista na tela.
     */
    botoes: botoes.map(
      (botao, indice) => ({
        idBotao: Number(
          botao.idBotao
        ),

        posicao: indice + 1,
      })
    ),
  };

  const formulario =
    new FormData();

  formulario.append(
    "dados",
    JSON.stringify(dados)
  );

  /*
   * A imagem é opcional na edição.
   * Quando não houver uma imagem nova,
   * o back-end preservará a atual.
   */
  if (foto instanceof File) {
    formulario.append(
      "foto",
      foto
    );
  }

  /*
   * Não defina Content-Type manualmente.
   * O navegador montará o multipart/form-data
   * com o boundary correto.
   */
  const resposta =
    await api.put(
      `/api/categorias/usuario/${Number(
        idCategoria
      )}`,
      formulario
    );

  return resposta.data;
}