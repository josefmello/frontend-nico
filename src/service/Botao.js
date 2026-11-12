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

  const resposta = await api.post(
    "/api/botoes/usuario",
    formulario
  );

  return resposta.data;
}