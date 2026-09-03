# ERP Church - Nest.js

Sistema de ERP para administração de igrejas, refatorado para o framework Nest.js.

## Estrutura do Projeto

```
src/
├── common/              # Utilitários compartilhados
│   ├── logger/         # Logger Pino wrapper
│   ├── pipes/          # Pipes de validação
│   ├── types/          # Tipos compartilhados
│   └── interceptors/   # Interceptadores de resposta
├── config/             # Configurações
│   └── database/       # Configuração TypeORM
├── modules/            # Módulos da aplicação
│   ├── members/        # Módulo de membros
│   ├── ministry/       # Módulo de ministérios
│   └── contributions/  # Módulo de contribuições
├── app.module.ts       # Módulo raiz
└── main.ts             # Ponto de entrada
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```
PORT=8080
NODE_ENV=development
LOG_LEVEL=debug
HOST_DB=localhost
PORT_DB=5432
USERNAME_DB=postgres
PASSWORD_DB=postgres
DATABASE=erp_church
```

## Desenvolvimento

```bash
npm run start:dev
```

## Build

```bash
npm run build
```

## Produção

```bash
npm run start
```

## Endpoints

### Members (Membros)

- `GET /members` - Listar todos os membros
- `GET /members/:uuid` - Buscar membro por UUID
- `POST /members` - Criar novo membro

### Ministry (Ministérios)

- `GET /ministrys` - Listar todos os ministérios
- `GET /ministrys/:uuid` - Buscar ministério por UUID
- `POST /ministrys` - Criar novo ministério

### Contributions (Contribuições)

- `GET /contributions` - Listar todas as contribuições
- `GET /contributions/:uuid` - Buscar contribuição por UUID
- `POST /contributions` - Criar nova contribuição

## Arquitetura

O projeto segue o padrão de camadas (N-layer architecture):

```
Route (HTTP) 
    ↓
Controller (Recebe requisições)
    ↓
Service (Lógica de negócio)
    ↓
Repository (Acesso a dados)
    ↓
Entity (Banco de dados)
```

## Validação

- DTOs utilizam `class-validator` para validação automática
- Pipes customizados validam parâmetros e corpo das requisições
- Erros de validação retornam status 400

## Logs

Logs estruturados com Pino:
- `DEBUG` - Informações de debug
- `INFO` - Informações operacionais
- `ERROR` - Erros capturados

## Database

- TypeORM com PostgreSQL
- Sincronização automática de schema em desenvolvimento
- Relacionamentos entre entidades configuradas

## Scripts

- `npm run build` - Compilar TypeScript para JavaScript
- `npm run start` - Rodar aplicação compilada
- `npm run start:dev` - Rodar em modo desenvolvimento com watch
- `npm run lint` - Executar linter
- `npm test` - Rodar testes
