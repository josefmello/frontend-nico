# Pedido ao back-end: recuperação de senha e de PIN

O Swagger atual (`/v3/api-docs`, 35 rotas) não tem nenhuma rota de recuperação. O front já tem as telas
(Esqueci minha senha, modal de PIN) e só falta a API.

## 1. Esqueci minha senha (rotas públicas, sem token, pois quem esqueceu não está logado)

| # | Rota sugerida | Corpo | Resposta |
|---|---------------|-------|----------|
| 1 | `POST /api/recuperar-senha` | `{ "email": "..." }` | 200 **sempre** (mesmo se o e-mail não existir), para não revelar quais e-mails estão cadastrados. Envia por e-mail um link ou código com validade. |
| 2 | `POST /api/redefinir-senha` | `{ "token": "..." (ou email + codigo), "novaSenha": "..." }` | 200 ok; 400/410 token inválido ou expirado. |

## 2. Esqueci meu PIN (a partir do modal "Modo Edição", administrador logado com Bearer)

| # | Rota sugerida | Corpo | Resposta |
|---|---------------|-------|----------|
| 3 | `POST /api/pin/recuperar` | (vazio; usa o administrador do token) | 200. Envia código ao e-mail do administrador. |
| 4 | `POST /api/pin/redefinir` | `{ "codigo": "...", "novoPin": 1234 }` | 200 ok; 400 código inválido ou expirado. |

(Alternativa mais simples para o PIN: `POST /api/pin/redefinir` com `{ "senha": "...", "novoPin": 1234 }`,
confirmando a senha atual da conta.)

## Pontos a definir

- Nomes de rota e de campos (os acima são sugestões; o front usa o que o back definir).
- Validade e tentativas máximas do código/token.
- Se o link do e-mail abre uma página do front, qual URL (ex.: `/redefinir-senha?token=...`).
- A nova senha deve seguir a regra do cadastro: mínimo de 8 caracteres, maiúscula, minúscula, número e
  caractere especial. O back também deve validar isso.
- PIN: 4 dígitos numéricos (como no cadastro).
- Códigos de erro e mensagens esperados, para o front exibir.

Assim que as rotas estiverem no Swagger, o front liga as telas sem mudar o layout.
