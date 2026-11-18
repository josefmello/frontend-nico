import { useEffect, useState } from 'react';
import {
    atualizarUsuario,
    buscarMeusUsuarios,
    buscarUsuarioParaEdicao
} from "../service/Usuario.js";
import './EdicaoUsuario.css';

const SEXOS = ['Masculino', 'Feminino', 'Outro'];


// Normaliza o que a API devolve para o valor das opções dos selects
function normalizarSexo(valor) {
    const achado = SEXOS.find((s) => s.toLowerCase() === String(valor ?? '').toLowerCase());
    return achado ?? '';
}

function normalizarNivel(valor) {
    return String(valor ?? '').match(/[123]/)?.[0] ?? ''; // "Nivel 2" -> "2"
}

function EdicaoUsuario() {
    const [idUsuario, setIdUsuario] = useState(null);
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [nivelAutismo, setNivelAutismo] = useState("");
    const [biografia, setBiografia] = useState("");
    const [voz, setVoz] = useState("");

    const [original, setOriginal] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [aviso, setAviso] = useState(null);

    useEffect(() => {
        let ativo = true;

        async function carregarUsuario() {
            try {
                setCarregando(true);
                setAviso(null);

                let id = localStorage.getItem("idUsuario");

                if (!id) {
                    const usuarioSalvo = JSON.parse(
                        localStorage.getItem("usuario") || "{}"
                    );

                    id = usuarioSalvo.idUsuario ?? null;
                }

                if (!id) {
                    const usuarios = await buscarMeusUsuarios();

                    if (!ativo) {
                        return;
                    }

                    if (!Array.isArray(usuarios) || usuarios.length === 0) {
                        setAviso({
                            tipo: "erro",
                            texto: "Nenhum usuário vinculado a esta conta foi encontrado."
                        });

                        return;
                    }

                    const usuarioEncontrado = usuarios[0];

                    id = usuarioEncontrado.idUsuario;

                    localStorage.setItem(
                        "idUsuario",
                        String(id)
                    );

                    localStorage.setItem(
                        "usuario",
                        JSON.stringify(usuarioEncontrado)
                    );
                }

                const usuario = await buscarUsuarioParaEdicao(id);

                if (!ativo) {
                    return;
                }

                setIdUsuario(String(id));
                setOriginal(usuario);

                setNome(usuario.nome ?? "");

                setNascimento(
                    (
                        usuario.dataNascAut ??
                        usuario.dataNascimento ??
                        ""
                    ).slice(0, 10)
                );

                setNivelAutismo(
                    usuario.nivelAutismo ?? ""
                );

                setVoz(
                    usuario.voz === true ||
                    usuario.voz === "true"
                );

                setSexo(
                    usuario.sexo ?? ""
                );

                setBiografia(
                    usuario.biografia ?? ""
                );
            } catch (erro) {
                if (!ativo) {
                    return;
                }

                console.error(
                    "Erro ao carregar usuário:",
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
                                ? "Este usuário não pertence ao administrador autenticado."
                                : status === 404
                                    ? "Usuário não encontrado."
                                    : erro.response?.data?.message ||
                                    "Não foi possível carregar os dados do usuário."
                });
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarUsuario();

        return () => {
            ativo = false;
        };
    }, []);

    async function salvar() {
        if (salvando || carregando || !idUsuario || !original) return;

        // Corpo do PUT conforme o Swagger. Não repete o objeto aninhado "administrador" que o GET devolve.
        const dados = {
            idUsuario: original.idUsuario ?? Number(idUsuario),
            nome: nome.trim(),
            sexo,
            nivelAutismo: `Nivel ${nivelAutismo}`,
            dataNascAut: nascimento,
            voz: voz === 'true',
            biografia: biografia.trim(),
        };

        setAviso(null);
        setSalvando(true);
        try {
            const atualizado =
                await atualizarUsuario(idUsuario, dados);

            const usuarioFinal = {
                ...original,
                ...dados,
                ...(atualizado ?? {})
            };

            setOriginal(usuarioFinal);

            setNome(usuarioFinal.nome ?? "");

            setNascimento(
                (usuarioFinal.dataNascAut ?? "").slice(0, 10)
            );

            setNivelAutismo(
                normalizarNivel(usuarioFinal.nivelAutismo)
            );

            setVoz(
                String(usuarioFinal.voz)
            );

            setSexo(
                normalizarSexo(usuarioFinal.sexo)
            );

            setBiografia(
                usuarioFinal.biografia ?? ""
            );

            localStorage.setItem(
                "idUsuario",
                String(usuarioFinal.idUsuario)
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioFinal)
            );

            setAviso({
                tipo: "sucesso",
                texto: "Usuário atualizado com sucesso!"
            });
        } catch (erro) {
            console.error(
                "Erro ao atualizar o usuário:",
                erro.response?.status,
                erro.response?.data || erro
            );

            setAviso({
                tipo: "erro",
                texto:
                    erro.response?.data?.message ||
                    "Não foi possível atualizar o usuário."
            });
        } finally {
            setSalvando(false);
        }
    }

    const ocupado = carregando || salvando;

    return (
        <section className="editar-usuario">
            <header className="editar-usuario__cabecalho">
                <span className="editar-usuario__sobre-titulo">Área administrativa</span>
                <h1>Edição de Usuário</h1>
            </header>
            <form className="editar-usuario__card" onSubmit={(e) => { e.preventDefault(); salvar(); }} aria-busy={ocupado}>
                {carregando && <p className="editar-usuario__aviso" role="status">Carregando dados...</p>}
                {aviso && (
                    <p className={`editar-usuario__aviso editar-usuario__aviso--${aviso.tipo}`} role={aviso.tipo === 'erro' ? 'alert' : 'status'}>
                        {aviso.texto}
                    </p>
                )}
                <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} disabled={ocupado} required /></label>
                <label>Nascimento: <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} disabled={ocupado} required /></label>
                <label>Nível de Autismo:
                    <select value={nivelAutismo} onChange={(e) => setNivelAutismo(e.target.value)} disabled={ocupado} required>
                        <option value="" disabled>Selecione</option>
                        <option value="1">Nível 1</option>
                        <option value="2">Nível 2</option>
                        <option value="3">Nível 3</option>
                    </select>
                </label>
                <label>Voz:
                    <select value={voz} onChange={(e) => setVoz(e.target.value)} disabled={ocupado} required>
                        <option value="" disabled>Selecione</option>
                        <option value="true">Voz Masculina</option>
                        <option value="false">Voz Feminina</option>
                    </select>
                </label>
                <label>Sexo:
                    <select value={sexo} onChange={(e) => setSexo(e.target.value)} disabled={ocupado} required>
                        <option value="" disabled>Selecione</option>
                        {SEXOS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </label>
                <label>Biografia: <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} disabled={ocupado} /></label>
                <button type="submit" disabled={ocupado}>{salvando ? 'Salvando...' : 'Salvar'}</button>
            </form>
        </section>
    )
}

export default EdicaoUsuario;
