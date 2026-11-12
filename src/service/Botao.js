import api from "./Api.js";

export async function criarBotaoUsuario({
  legenda,
  corFundo,
  corFundoLegenda,
  corLegenda,
  exibirLegenda,
  tamanhoBotao = 1,
  idUsuario,
  idCategoria,
  foto,
  audioPersonalizado,
}) {
  const dados = {
    legenda: legenda.trim(),
    corFundo,
    corFundoLegenda,
    corLegenda,
    exibirLegenda:
      Boolean(exibirLegenda),
    tamanhoBotao:
      Number(tamanhoBotao),
    idUsuario:
      Number(idUsuario),
    idCategoria:
      Number(idCategoria),
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

  formulario.append(
    "audioPersonalizado",
    audioPersonalizado
  );

  const resposta =
    await api.post(
      "/api/botoes/usuario",
      formulario
    );

  return resposta.data;
}

export async function editarBotaoUsuario({
  idBotao,
  idUsuario,
  idCategoria,
  legenda,
  corFundo,
  corFundoLegenda,
  corLegenda,
  exibirLegenda,
  tamanhoBotao = 1,
  oculto = false,
  foto,
  audioPersonalizado,
}) {
  if (!idBotao) {
    throw new Error(
      "O ID do botão é obrigatório."
    );
  }

  const dados = {
    idUsuario:
      Number(idUsuario),

    idCategoria:
      Number(idCategoria),

    legenda:
      legenda.trim(),

    corFundo,

    corFundoLegenda,

    corLegenda,

    exibirLegenda:
      Boolean(exibirLegenda),

    tamanhoBotao:
      Number(tamanhoBotao),

    oculto:
      Boolean(oculto),
  };

  const formulario =
    new FormData();

  formulario.append(
    "dados",
    JSON.stringify(dados)
  );

  /*
   * A foto é opcional na edição.
   * Se não houver arquivo novo,
   * o back-end preservará a atual.
   */
  if (foto instanceof File) {
    formulario.append(
      "foto",
      foto
    );
  }

  /*
   * O áudio também é opcional.
   */
  if (
    audioPersonalizado
      instanceof File
  ) {
    formulario.append(
      "audioPersonalizado",
      audioPersonalizado
    );
  }

  /*
   * Não defina Content-Type.
   * O navegador cria automaticamente
   * o multipart/form-data com boundary.
   */
  const resposta =
    await api.put(
      `/api/botoes/usuario/${Number(
        idBotao
      )}`,
      formulario
    );

  return resposta.data;
}