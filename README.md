# API de Currículo em Node.js

Esta é uma API RESTful construída com Node.js, Express e PostgreSQL (utilizando Supabase) para gerenciar e exibir dados de um currículo profissional.

## 🚀 Funcionalidades

- **Gerenciamento de Dados Pessoais**: Crie, leia, atualize e delete (CRUD) as informações principais de uma pessoa.
- **Gerenciamento de Experiência Profissional**: Adicione e remova registros de experiência profissional associados a uma pessoa.
- **Gerenciamento de Formação Acadêmica**: Adicione e remova registros de formação acadêmica.
- **Consulta Completa**: Uma única rota para obter um perfil completo, incluindo dados pessoais, todas as experiências e todas as formações.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL (hospedado no Supabase)
- **Gerenciador de Dependências**: npm
- **Variáveis de Ambiente**: dotenv
- **CORS**: cors
- **Deployment**: Preparado para deploy na Vercel

---

## ⚙️ Configuração do Ambiente Local

Siga os passos abaixo para rodar a API localmente.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- Uma instância de banco de dados PostgreSQL. Você pode criar uma gratuitamente no [Supabase](https://supabase.com/).

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório (se ainda não o fez)
# git clone https://github.com/seu-usuario/seu-repositorio.git

# Navegue até a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install
```

### 3. Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto. Este arquivo guardará a sua string de conexão com o banco de dados.

```
.
├── api/
├── node_modules/
├── .env         <-- CRIE ESTE ARQUIVO
├── package.json
└── ...
```

Dentro do arquivo `.env`, adicione a sua `DATABASE_URL` obtida do Supabase:

```env
DATABASE_URL="postgresql://user:password@host:port/dbname"
```
> **Nota**: Se você estiver usando o "Connection Pooler" do Supabase, certifique-se de que a URL está correta e que o modo de transação está selecionado.

### 4. Inicialização do Banco de Dados

O script `init-db.js` pode ser usado para criar as tabelas necessárias no seu banco de dados.

```bash
node init-db.js
```

### 5. Rodando o Servidor

Para iniciar o servidor local, execute:

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

---

## 🌐 Endpoints da API

A URL base para os endpoints da API é `/api`.

### Pessoa

- `GET /api/pessoa`
  - Retorna uma lista de todas as pessoas cadastradas.

- `GET /api/pessoa/:id`
  - Retorna os dados completos de uma pessoa específica, incluindo suas experiências e formações.

- `POST /api/pessoa`
  - Cria um novo registro de pessoa.
  - **Body (JSON)**: `{ "nome": "...", "sobrenome": "...", "email": "...", "telefone": "...", "resumo_perfil": "..." }`

- `PUT /api/pessoa/:id`
  - Atualiza os dados de uma pessoa existente.
  - **Body (JSON)**: `{ "nome": "...", "sobrenome": "...", "email": "...", "telefone": "...", "resumo_perfil": "..." }`

- `DELETE /api/pessoa/:id`
  - Deleta o registro de uma pessoa.

### Experiência Profissional

- `POST /api/pessoa/:id/experiencia`
  - Adiciona um novo registro de experiência para a pessoa com o `:id` especificado.
  - **Body (JSON)**: `{ "cargo": "...", "empresa": "...", "data_inicio": "YYYY-MM-DD", "data_fim": "YYYY-MM-DD", "descricao": "..." }`

- `DELETE /api/experiencia/:exp_id`
  - Deleta um registro de experiência específico pelo seu próprio ID (`:exp_id`).

### Formação Acadêmica

- `POST /api/pessoa/:id/formacao`
  - Adiciona um novo registro de formação para a pessoa com o `:id` especificado.
  - **Body (JSON)**: `{ "instituicao": "...", "curso": "...", "data_inicio": "YYYY-MM-DD", "data_fim": "YYYY-MM-DD" }`

- `DELETE /api/formacao/:form_id`
  - Deleta um registro de formação específico pelo seu próprio ID (`:form_id`).

---

## 🚀 Deploy na Vercel

Este projeto está configurado para ser facilmente implantado na [Vercel](https://vercel.com/).

1.  **Importe o Projeto**: Importe o seu repositório do GitHub para a Vercel.
2.  **Configure as Variáveis de Ambiente**: Na dashboard do seu projeto na Vercel, vá para "Settings" -> "Environment Variables" e adicione a sua `DATABASE_URL`.
3.  **Deploy**: A Vercel irá automaticamente buildar e fazer o deploy do seu projeto. O arquivo `vercel.json` já está configurado para direcionar as requisições para a API.