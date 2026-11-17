import api from "./Api.js";

export const buscarAdministradorLogado = async () => {
    const resposta = await api.get(
        "/api/administradores/me"
    );

    return resposta.data;
};

export const registarAdministrador = async (dadosAdmin) => {
    const resposta = await api.post(
        "/api/administradores",
        dadosAdmin
    );

    return resposta.data;
};

export const buscarAdministrador = async (
    idAdministrador
) => {
    const resposta = await api.get(
        `/api/administradores/${idAdministrador}`
    );

    return resposta.data;
};

export const atualizarAdministrador = async (
    idAdministrador,
    dadosAdmin
) => {
    const resposta = await api.put(
        `/api/administradores/${idAdministrador}`,
        dadosAdmin
    );

    return resposta.data;
};