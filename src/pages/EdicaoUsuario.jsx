import { useEffect, useState } from 'react';
import { atualizarUsuario, buscarUsuario } from '../service/Usuario.js';
import './EdicaoUsuario.css';

const SEXOS = ['Masculino', 'Feminino', 'Outro'];

// O usuário em edição é o salvo pelo Login/Cadastro (idUsuario)
function lerIdUsuario() {
    return localStorage.getItem('idUsuario');
}

// Normaliza o que a API devolve para o valor das opções dos selects
function normalizarSexo(valor) {
    const achado = SEXOS.find((s) => s.toLowerCase() === String(valor ?? '').toLowerCase());
    return achado ?? '';
}

function normalizarNivel(valor) {
    return String(valor ?? '').match(/[123]/)?.[0] ?? ''; // "Nivel 2" -> "2"
}

function EdicaoUsuario() {
    const [idUsuario] = useState(lerIdUsuario);
    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [nivelAutismo, setNivelAutismo] = useState('');
    const [biografia, setBiografia] = useState('');
    const [voz, setVoz] = useState('');
    const [original, setOriginal] = useState(null); // resposta do GET (inclui idUsuario)
    const [carregando, setCarregando] = useState(Boolean(idUsuario));
    const [salvando, setSalvando] = useState(false);
    const [aviso, setAviso] = useState(
        idUsuario ? null : { tipo: 'erro', texto: 'Nenhum usuário encontrado para editar.' },
    );

    useEffect(() => {
        if (!idUsuario) return;
        let ativo = true;

        buscarUsuario(idUsuario)
            .then((dados) => {
                if (!ativo) return;
                setOriginal(dados);
                setNome(dados.nome ?? '');
                setNascimento(String(dados.dataNascAut ?? dados.dataNascimento ?? '').slice(0, 10));
                setSexo(normalizarSexo(dados.sexo));
                setNivelAutismo(normalizarNivel(dados.nivelAutismo));
                setVoz(dados.voz === true || dados.voz === 'true' ? 'true' : dados.voz === false || dados.voz === 'false' ? 'false' : '');
                setBiografia(dados.biografia ?? '');
            })
            .catch((erro) => {
                console.error('Erro ao buscar o usuário:', erro);
                if (ativo) setAviso({ tipo: 'erro', texto: 'Não foi possível carregar os dados do usuário.' });
            })
            .finally(() => ativo && setCarregando(false));

        return () => { ativo = false; };
    }, [idUsuario]);

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
            const atualizado = await atualizarUsuario(idUsuario, dados);

            // Mantém o usuário salvo localmente (usado pelo comunicador) em sincronia
            const salvo = JSON.parse(localStorage.getItem('usuario') || '{}');
            localStorage.setItem('usuario', JSON.stringify({ ...salvo, ...dados, ...(atualizado ?? {}) }));

            setAviso({ tipo: 'sucesso', texto: 'Usuário atualizado com sucesso!' });
        } catch (erro) {
            console.error('Erro ao atualizar o usuário:', erro);
            setAviso({
                tipo: 'erro',
                texto: erro.response?.data?.message || 'Não foi possível atualizar o usuário. Tente novamente.',
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
