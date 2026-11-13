import api from "./Api.js";


export const realizarLogin = async (
  email,
  senha
) => {
  const resposta = await api.post(
    "/api/login",
    {
      email,
      senha,
    }
  );

  return resposta.data;
};

export const validarPin = async (pin) => {
  const resposta = await api.post(
    "/api/login/pin",
    {
      pin: Number(pin),
    }
  );

  return resposta.data;
};