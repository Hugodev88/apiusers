# API Users

Uma API REST simples para gerenciamento de usuários com autenticação JWT, desenvolvida com Express, TypeScript, PostgreSQL e Prisma.

## 🚀 Características

- **Autenticação JWT**: Registro e login seguro de usuários
- **Middleware de Autenticação**: Proteção de rotas com verificação de token
- **Criptografia de Senha**: Senhas armazenadas com bcrypt
- **ORM Prisma**: Gerenciamento de dados com migrations automáticas
- **CORS Habilitado**: Suporte para requisições cross-origin
- **TypeScript**: Type-safe em toda a aplicação

## 📋 Pré-requisitos

- Node.js 16+
- PostgreSQL 12+
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd apiusers
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/apiusers"
JWT_SECRET="sua-chave-secreta-aqui"
```

4. **Execute as migrations do Prisma**
```bash
npx prisma migrate dev
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`

## 📚 API Endpoints

### Autenticação

#### Registrar novo usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201)**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Fazer login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-do-usuario",
    "email": "joao@example.com"
  }
}
```

### Usuários

#### Listar todos os usuários
```http
GET /users
```

**Resposta (200)**
```json
[
  {
    "id": "uuid-1",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "uuid-2",
    "name": "Maria Santos",
    "email": "maria@example.com",
    "createdAt": "2024-01-16T14:20:00Z"
  }
]
```

#### Obter dados do usuário autenticado
```http
GET /users/me
Authorization: Bearer <token>
```

**Resposta (200)**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── prisma.ts          # Configuração do Prisma
├── controllers/
│   ├── authController.ts  # Lógica de autenticação
│   └── userController.ts  # Lógica de usuários
├── middlewares/
│   └── authMiddleware.ts  # Verificação de JWT
├── routes/
│   ├── authRoutes.ts      # Rotas de autenticação
│   └── userRoutes.ts      # Rotas de usuários
└── server.ts              # Configuração do Express

prisma/
├── schema.prisma          # Schema do banco de dados
└── migrations/            # Histórico de migrations
```

## 🗄️ Modelo de Dados

### User
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## 🔐 Segurança

- Senhas são criptografadas com bcrypt antes de serem armazenadas
- JWT é usado para autenticação e autorização
- CORS está configurado para controlar acesso
- Variáveis sensíveis devem estar em arquivo `.env` (não versionado)

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot-reload
- `npm test`: Executa testes (em desenvolvimento)

## 🛠️ Tecnologias Utilizadas

- **Express 5.x**: Framework web
- **TypeScript**: Linguagem tipada
- **PostgreSQL**: Banco de dados
- **Prisma 7.x**: ORM
- **JWT**: Autenticação
- **bcrypt**: Criptografia de senhas
- **CORS**: Controle de requisições cross-origin
- **Nodemon**: Auto-reload em desenvolvimento

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

## 📄 Licença

ISC
