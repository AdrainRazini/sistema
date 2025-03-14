# Documentação da API

## Introdução
Esta API permite a gestão de usuários e livros do sistema, possibilitando o cadastro, listagem e remoção de registros.

## Autenticação
Algumas rotas exigem autenticação. Para acessá-las, envie um token JWT no cabeçalho da requisição:
```plaintext
Authorization: Bearer SEU_TOKEN_AQUI
```

## Endpoints

### 1. Criar Usuário
**Rota:** `POST /usuarios`

**Parâmetros:**
```json
{
  "nome": "Adrian Razini Rangel",
  "email": "adrian@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Adrian Razini Rangel",
  "email": "adrian@email.com"
}
```

### 2. Listar Usuários
**Rota:** `GET /usuarios`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Adrian Razini Rangel",
    "email": "adrian@email.com"
  }
]
```

### 3. Criar Livro
**Rota:** `POST /livros`

**Parâmetros:**
```json
{
  "titulo": "Livro Exemplo",
  "autor": "Autor Exemplo"
}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Livro Exemplo",
  "autor": "Autor Exemplo"
}
```

### 4. Listar Livros
**Rota:** `GET /livros`

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "Livro Exemplo",
    "autor": "Autor Exemplo"
  }
]
```

### 5. Remover Livro
**Rota:** `DELETE /livros/:id`

**Resposta:**
```json
{
  "mensagem": "Livro removido com sucesso"
}
```

## Códigos de Status
- `200 OK` → Requisição bem-sucedida
- `201 Created` → Recurso criado com sucesso
- `400 Bad Request` → Erro no envio dos dados
- `401 Unauthorized` → Token inválido ou ausente
- `404 Not Found` → Recurso não encontrado
- `500 Internal Server Error` → Erro interno no servidor

## Exemplo de Uso com cURL
Criando um novo usuário:
```sh
curl -X POST "http://localhost:3000/usuarios" -H "Content-Type: application/json" -d '{"nome":"Adrian Razini Rangel", "email":"adrian@email.com", "senha":"123456"}'
```

Listando todos os livros:
```sh
curl -X GET "http://localhost:3000/livros"
```

---
📌 **Autor:** Adrian Razini Rangel
