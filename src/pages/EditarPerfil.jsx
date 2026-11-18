import { useEffect, useState } from "react";
import {
    atualizarAdministrador,
    buscarAdministradorLogado
} from "../service/Administrador.js";
import "./EditarPerfil.css";

const SEXOS = ["Masculino", "Feminino", "Outro"];

function normalizarSexo(valor) {
    return (
        SEXOS.find(
            (sexo) =>
                sexo.toLowerCase() ===
                String(valor ?? "").toLowerCase()
        ) ?? ""
    );
}

function EditarPerfil() {
    const [idAdministrador, setIdAdministrador] = useState(null);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [pin, setPin] = useState("");

    const [original, setOriginal] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [aviso, setAviso] = useState(null);

    useEffect(() => {
        let ativo = true;

        async function carregarAdministrador() {
            try {
                setCarregando(true);
                setAviso(null);

                const administrador =
                    await buscarAdministradorLogado();
                console.log(
                    "Administrador recebido em EditarPerfil:",
                    administrador
                );

                if (!ativo) {
                    return;
                }

                if (!administrador) {
                    setAviso({
                        tipo: "erro",
                        texto: "Nenhum administrador foi encontrado para esta sessão."
                    });

                    return;
                }

                setIdAdministrador(
                    administrador.idAdministrador
                );

                setOriginal(administrador);
                setNome(administrador.nome ?? "");
                setEmail(administrador.email ?? "");
                setTelefone(administrador.telefone ?? "");

                setNascimento(
                    (
                        administrador.dataNasc ??
                        administrador.dataNascimento ??
                        ""
                    ).slice(0, 10)
                );

                setSexo(
                    normalizarSexo(administrador.sexo)
                );

                setPin(
                    administrador.pin != null
                        ? String(administrador.pin)
                        : ""
                );

                localStorage.setItem(
                    "idAdministrador",
                    String(administrador.idAdministrador)
                );

                localStorage.setItem(
                    "administrador",
                    JSON.stringify(administrador)
                );
            } catch (erro) {
                if (!ativo) {
                    return;
                }

                console.error(
                    "Erro ao carregar administrador:",
                    erro.response?.status,
                    erro.response?.data || erro
                );

                const status = erro.response?.status;

                setAviso({
                    tipo: "erro",
                    texto:
                        status === 401
                            ? "Sua sessão expirou. Entre novamente."
                            : status === 403
                                ? "Você não tem permissão para acessar este perfil."
                                : erro.response?.data?.message ||
                                "Não foi possível carregar os dados do perfil."
                });
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarAdministrador();

        return () => {
            ativo = false;
        };
    }, []);

    async function salvar() {
        if (
            salvando ||
            carregando ||
            !idAdministrador ||
            !original
        ) {
            return;
        }

        if (!nome.trim()) {
            setAviso({
                tipo: "erro",
                texto: "Informe o nome."
            });

            return;
        }

        if (!email.trim()) {
            setAviso({
                tipo: "erro",
                texto: "Informe o e-mail."
            });

            return;
        }

        if (pin && !/^\d{4}$/.test(pin)) {
            setAviso({
                tipo: "erro",
                texto: "O PIN deve conter exatamente quatro números."
            });

            return;
        }

        const dados = {
            idAdministrador:
                original.idAdministrador ??
                Number(idAdministrador),

            nome: nome.trim(),
            email: email.trim(),
            pin: pin
                ? Number(pin)
                : original.pin,

            telefone: telefone.trim(),
            dataNasc: nascimento,
            sexo,

            premium: original.premium,
            valorMensalidade: original.valorMensalidade,
            dataAssinatura: original.dataAssinatura
        };

        setAviso(null);
        setSalvando(true);

        try {
            const atualizado =
                await atualizarAdministrador(
                    idAdministrador,
                    dados
                );

            const administradorFinal = {
                ...original,
                ...dados,
                ...(atualizado ?? {})
            };

            const emailFoiAlterado =
                original.email?.trim().toLowerCase() !==
                administradorFinal.email?.trim().toLowerCase();

            if (emailFoiAlterado) {
                /*
                 * O token atual contém o e-mail antigo.
                 * Remove os dados da sessão para exigir um novo login.
                 */
                localStorage.removeItem("token");
                localStorage.removeItem("idAdministrador");
                localStorage.removeItem("administrador");
                localStorage.removeItem("idUsuario");
                localStorage.removeItem("usuario");

                window.location.replace("/");
                return;
            }

            setOriginal(administradorFinal);

            localStorage.setItem(
                "idAdministrador",
                String(administradorFinal.idAdministrador)
            );

            localStorage.setItem(
                "administrador",
                JSON.stringify(administradorFinal)
            );

            setAviso({
                tipo: "sucesso",
                texto: "Perfil atualizado com sucesso!"
            });
        } catch (erro) {
            console.error(
                "Erro ao atualizar o perfil:",
                erro.response?.status,
                erro.response?.data || erro
            );

            const status = erro.response?.status;

            setAviso({
                tipo: "erro",
                texto:
                    status === 409
                        ? "Já existe um cadastro com este e-mail e/ou telefone."
                        : erro.response?.data?.message ||
                        "Não foi possível atualizar o perfil. Tente novamente."
            });
        } finally {
            setSalvando(false);
        }
    }

    const ocupado = carregando || salvando;

    return (
        <section className="editar-perfil">
            <header className="editar-perfil__cabecalho">
                <span className="editar-perfil__sobre-titulo">
                    Área administrativa
                </span>

                <h1>Editar Perfil</h1>
            </header>

            <form
                className="editar-perfil__card"
                onSubmit={(evento) => {
                    evento.preventDefault();
                    salvar();
                }}
                aria-busy={ocupado}
            >
                {carregando && (
                    <p
                        className="editar-perfil__aviso"
                        role="status"
                    >
                        Carregando dados...
                    </p>
                )}

                {aviso && (
                    <p
                        className={
                            `editar-perfil__aviso ` +
                            `editar-perfil__aviso--${aviso.tipo}`
                        }
                        role={
                            aviso.tipo === "erro"
                                ? "alert"
                                : "status"
                        }
                    >
                        {aviso.texto}
                    </p>
                )}

                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(evento) =>
                            setNome(evento.target.value)
                        }
                        disabled={ocupado}
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(evento) =>
                            setEmail(evento.target.value)
                        }
                        disabled={ocupado}
                        required
                    />
                </label>

                <label>
                    Pin:
                    <input
                        type="password"
                        inputMode="numeric"
                        autoComplete="off"
                        value={pin}
                        maxLength={4}
                        onChange={(evento) =>
                            setPin(
                                evento.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 4)
                            )
                        }
                        disabled={ocupado}
                        required
                    />
                </label>

                <label>
                    Telefone:
                    <input
                        type="tel"
                        value={telefone}
                        onChange={(evento) =>
                            setTelefone(evento.target.value)
                        }
                        disabled={ocupado}
                        required
                    />
                </label>

                <label>
                    Nascimento:
                    <input
                        type="date"
                        value={nascimento}
                        onChange={(evento) =>
                            setNascimento(evento.target.value)
                        }
                        disabled={ocupado}
                        required
                    />
                </label>

                <label>
                    Sexo:
                    <select
                        value={sexo}
                        onChange={(evento) =>
                            setSexo(evento.target.value)
                        }
                        disabled={ocupado}
                        required
                    >
                        <option value="" disabled>
                            Selecione
                        </option>

                        {SEXOS.map((opcao) => (
                            <option
                                key={opcao}
                                value={opcao}
                            >
                                {opcao}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="submit"
                    disabled={ocupado}
                >
                    {salvando
                        ? "Salvando..."
                        : "Salvar"}
                </button>
            </form>
        </section>
    );
}

export default EditarPerfil;