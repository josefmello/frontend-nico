import { useState } from 'react';
import { LayoutNico } from '../components';
const usuarioFalso = { nome: "Jose Ferraz", nascimento: "1980-01-01", sexo: "Masculino", nivelAutismo: "2", biografia: "Biografia do usuário", email: "jose.ferraz@example.com" };

function EdicaoUsuario() {
    const [nome, setNome] = useState(usuarioFalso.nome);
    const [email, setEmail] = useState(usuarioFalso.email);
    const [nascimento, setNascimento] = useState(usuarioFalso.nascimento);
    const [sexo, setSexo] = useState(usuarioFalso.sexo);
    const [nivelAutismo, setNivelAutismo] = useState(usuarioFalso.nivelAutismo);
    const [biografia, setBiografia] = useState(usuarioFalso.biografia);

    function salvar() {
        console.log({ nome, nascimento, sexo, nivelAutismo, biografia, email });
    }
    return (
        <LayoutNico titulo="Edição de Usuário">
            <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></label>
            <label> Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>Nascimento: <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} /></label>
            <label>Nível de Autismo:
                <select value={nivelAutismo} onChange={(e) => setNivelAutismo(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>Sexo:
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </label>
            <label>Biografia: <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} /></label>
            <button onClick={salvar}>Salvar</button>
        </LayoutNico>
    )
}

export default EdicaoUsuario;