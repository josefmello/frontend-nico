import api from './Api.js';

// A variável dadosAdmin será um objeto contendo todas as informações do formulário
export const registarAdministrador = async (dadosAdmin) => {
  try {
    const resposta = await api.post('/api/administradores', dadosAdmin);
    return resposta.data;
  } catch (erro) {
    throw erro; 
  }
};

export const buscarAdministrador = async (idAdministrador) => {
  const resposta = await api.get(`/api/administradores/${idAdministrador}`);
  return resposta.data;
};

export const atualizarAdministrador = async (idAdministrador, dadosAdmin) => {
  const resposta = await api.put(`/api/administradores/${idAdministrador}`, dadosAdmin);
  return resposta.data;
};

// ---------------------------------------------------------------------------
// Recuperação de PIN/senha SEM rotas novas: reaproveita login, login/pin e o PUT do administrador.
// Só funciona com o administrador logado (token Bearer); a identidade é reconfirmada com a senha
// da conta (para trocar o PIN) ou com o PIN atual (para trocar a senha).
// ---------------------------------------------------------------------------
import { realizarLogin, validarPin } from './auth.js';

export const lerIdAdministradorLogado = () => {
  try {
    return JSON.parse(localStorage.getItem('administrador'))?.idAdministrador ?? null;
  } catch {
    return null;
  }
};

// O PUT é um "replace": mesmo corpo usado em EditarPerfil.jsx (sem as listas aninhadas do GET).
const corpoPut = (o) => ({
  idAdministrador: o.idAdministrador,
  nome: o.nome,
  email: o.email,
  pin: o.pin,
  telefone: o.telefone,
  dataNasc: o.dataNasc,
  sexo: o.sexo,
  premium: o.premium,
  valorMensalidade: o.valorMensalidade,
  dataAssinatura: o.dataAssinatura,
});

// Marca em qual etapa a chamada falhou, para a tela não chamar de "senha incorreta" um erro de outra etapa
const etapa = async (nome, fn) => {
  try {
    return await fn();
  } catch (erro) {
    erro.etapa = nome;
    throw erro;
  }
};

export const redefinirPinAdministrador = async (senhaDaConta, novoPin) => {
  const id = lerIdAdministradorLogado();
  const original = await etapa('buscar', () => buscarAdministrador(id));
  // Confirma a senha; a resposta (token novo) é descartada de propósito para não trocar a sessão
  await etapa('login', () => realizarLogin(original.email, senhaDaConta));
  // "senha" é obrigatória no PUT (Swagger: entityAdministrador). Reenvia a senha recém-confirmada,
  // que é a mesma já cadastrada, para o back não rejeitar (400) nem ficar sem ela.
  return etapa('salvar', () =>
    atualizarAdministrador(id, { ...corpoPut(original), senha: senhaDaConta, pin: Number(novoPin) }),
  );
};

export const redefinirSenhaAdministrador = async (pinAtual, novaSenha) => {
  const id = lerIdAdministradorLogado();
  await etapa('pin', () => validarPin(pinAtual));
  const original = await etapa('buscar', () => buscarAdministrador(id));
  return etapa('salvar', () => atualizarAdministrador(id, { ...corpoPut(original), senha: novaSenha }));
};

// ---------------------------------------------------------------------------
// Recuperação de senha por e-mail (rotas PÚBLICAS, sem token). Ainda NÃO estão no Swagger:
// nomes/campos seguem PEDIDO_BACKEND_RECUPERACAO.md e devem ser ajustados aqui se o back mudar.
// ---------------------------------------------------------------------------
export const solicitarRecuperacaoSenha = async (email) => {
  const resposta = await api.post('/api/recuperar-senha', { email });
  return resposta.data;
};

export const confirmarRecuperacaoSenha = async (email, codigo, novaSenha) => {
  const resposta = await api.post('/api/redefinir-senha', { email, codigo, novaSenha });
  return resposta.data;
};
