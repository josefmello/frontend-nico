import { useState } from 'react';
import { LayoutNico } from '../components';
const adminFalso = { nome: "Jose Ferraz", email: "jose.ferraz@example.com", telefone: "(11) 99999-9999", nascimento: "1980-01-01", sexo: "Masculino" }

function EditarPerfil() {
    const [nome, setNome] = useState(adminFalso.nome);
    const [email, setEmail] = useState(adminFalso.email);
    const [telefone, setTelefone] = useState(adminFalso.telefone);
    const [nascimento, setNascimento] = useState(adminFalso.nascimento);
    const [sexo, setSexo] = useState(adminFalso.sexo);
    function salvar() {
        console.log({ nome, email, telefone, nascimento, sexo });
    }
    return (
        <LayoutNico titulo="Editar Perfil">
            <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></label>
            <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>Telefone: <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} /></label>
            <label>Nascimento: <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} /></label>
            <label>Sexo:
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </label>
            <button onClick={salvar}>Salvar</button>
        </LayoutNico>
    )
}

export default EditarPerfil;