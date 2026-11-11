import { useEffect, useState } from 'react';
import { atualizarAdministrador, buscarAdministrador } from '../service/Administrador.js';
import './EditarPerfil.css';

// Valores no formato devolvido/aceito pela API (Swagger: "sexo": "Masculino")
const SEXOS = ['Masculino', 'Feminino', 'Outro'];

function normalizarSexo(valor) {
    return SEXOS.find((s) => s.toLowerCase() === String(valor ?? '').toLowerCase()) ?? '';
}

// O id do administrador é salvo no login (Login.jsx)
function lerIdAdministrador() {
    try {
        return JSON.parse(localStorage.getItem('administrador'))?.idAdministrador ?? null;
    } catch {
        return null;
    }
}

function EditarPerfil() {
    const [idAdministrador] = useState(lerIdAdministrador);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [pin, setPin] = useState('');
    // Resposta completa do GET: o PUT é um "replace", então premium, valorMensalidade etc. voltam junto
    const [original, setOriginal] = useState(null);
    const [carregando, setCarregando] = useState(Boolean(idAdministrador));
    const [salvando, setSalvando] = useState(false);
    const [aviso, setAviso] = useState(
        idAdministrador ? null : { tipo: 'erro', texto: 'Não foi possível identificar o administrador. Entre novamente.' },
    );

    useEffect(() => {
        if (!idAdministrador) return;
        let ativo = true;

        buscarAdministrador(idAdministrador)
            .then((dados) => {
                if (!ativo) return;
                setOriginal(dados);
                setNome(dados.nome ?? '');
                setEmail(dados.email ?? '');
                setTelefone(dados.telefone ?? '');
                setNascimento((dados.dataNasc ?? dados.dataNascimento ?? '').slice(0, 10));
                setSexo(normalizarSexo(dados.sexo));
                setPin(dados.pin != null ? String(dados.pin) : '');
            })
            .catch((erro) => {
                console.error('Erro ao buscar o perfil:', erro);
                if (ativo) setAviso({ tipo: 'erro', texto: 'Não foi possível carregar os dados do perfil.' });
            })
            .finally(() => ativo && setCarregando(false));

        return () => { ativo = false; };
    }, [idAdministrador]);

    async function salvar() {
        if (salvando || carregando || !idAdministrador || !original) return;

        if (pin && !/^\d+$/.test(pin)) {
            setAviso({ tipo: 'erro', texto: 'O PIN deve conter apenas números.' });
            return;
        }

        // Corpo do PUT conforme o Swagger. O GET também devolve listas aninhadas (usuarios, categorias...)
        // que não devem voltar no PUT: elas quebram a desserialização (400).
        const dados = {
            idAdministrador: original.idAdministrador ?? Number(idAdministrador),
            nome: nome.trim(),
            email: email.trim(),
            pin: original.pin,
            telefone,
            dataNasc: nascimento,
            sexo,
            premium: original.premium,
            valorMensalidade: original.valorMensalidade,
            dataAssinatura: original.dataAssinatura,
        };
        if (pin) dados.pin = Number(pin); // a API recebe o PIN como número

        setAviso(null);
        setSalvando(true);
        try {
            const atualizado = await atualizarAdministrador(idAdministrador, dados);
            setOriginal({ ...dados, ...(atualizado ?? {}) });

            // Mantém o nome do topo da tela sincronizado
            const salvo = JSON.parse(localStorage.getItem('administrador') || '{}');
            localStorage.setItem('administrador', JSON.stringify({ ...salvo, nome: atualizado?.nome ?? dados.nome }));

            setAviso({ tipo: 'sucesso', texto: 'Perfil atualizado com sucesso!' });
        } catch (erro) {
            console.error('Erro ao atualizar o perfil:', erro);
            const status = erro.response?.status;
            setAviso({
                tipo: 'erro',
                texto: status === 409
                    ? 'Já existe um cadastro com este e-mail e/ou telefone.'
                    : erro.response?.data?.message || 'Não foi possível atualizar o perfil. Tente novamente.',
            });
        } finally {
            setSalvando(false);
        }
    }

    const ocupado = carregando || salvando;

    return (
        <section className="editar-perfil">
            <header className="editar-perfil__cabecalho">
                <span className="editar-perfil__sobre-titulo">Área administrativa</span>
                <h1>Editar Perfil</h1>
            </header>
            <form className="editar-perfil__card" onSubmit={(e) => { e.preventDefault(); salvar(); }} aria-busy={ocupado}>
                {carregando && <p className="editar-perfil__aviso" role="status">Carregando dados...</p>}
                {aviso && (
                    <p className={`editar-perfil__aviso editar-perfil__aviso--${aviso.tipo}`} role={aviso.tipo === 'erro' ? 'alert' : 'status'}>
                        {aviso.texto}
                    </p>
                )}
                <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} disabled={ocupado} required /></label>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={ocupado} required /></label>
                <label>Pin: <input type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} disabled={ocupado} /></label>
                <label>Telefone: <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} disabled={ocupado} required /></label>
                <label>Nascimento: <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} disabled={ocupado} required /></label>
                <label>Sexo:
                    <select value={sexo} onChange={(e) => setSexo(e.target.value)} disabled={ocupado} required>
                        <option value="" disabled>Selecione</option>
                        {SEXOS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </label>
                <button type="submit" disabled={ocupado}>{salvando ? 'Salvando...' : 'Salvar'}</button>
            </form>
        </section>
    )
}

export default EditarPerfil;
