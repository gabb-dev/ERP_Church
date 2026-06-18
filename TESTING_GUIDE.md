# 🎯 Guia de Testes - Projeto Refatorado Nest.js

## ✅ O que foi feito

Refatoração completa do projeto **Express → Nest.js** com 3 módulos implementados:

### Módulos Criados
1. **Members** - Gerenciamento de membros da igreja
2. **Ministry** - Gerenciamento de ministérios
3. **Contributions** - Gerenciamento de contribuições (novo, implementação completa)

### Arquivos Criados (40+)
- 3 Entities TypeORM decoradas
- 3 DTOs com validação
- 3 Repositories com injeção de dependência
- 3 Services
- 3 Controllers Nest.js
- 3 Modules
- Logger service
- Configuração TypeORM
- Main refatorado
- Documentação completa

---

## 🚀 Como Testar

### 1. Preparar Ambiente
```bash
# Certifique-se de estar na pasta do projeto
cd c:/Users/Seidor/Documents/erp_church/ERP_Church

# Verificar se node_modules foi instalado
ls node_modules/@nestjs/ | head -5
```

### 2. Configurar Banco de Dados
```bash
# Copiar arquivo de configuração
cp .env.example .env

# Editar .env com suas credenciais PostgreSQL
# Certifique-se que PostgreSQL está rodando
```

### 3. Build do Projeto
```bash
# Limpar build anterior
rm -rf dist

# Compilar
npm run build

# Se o build falhar, tente:
npm install --force
npm run build
```

### 4. Iniciar Servidor
```bash
# Desenvolvimento (com hot reload)
npm run start:dev

# Ou produção
npm run start
```

O servidor deve estar rodando em `http://localhost:8080`

---

## 📡 Testando Endpoints

### Membros (Members)

**Listar todos:**
```bash
curl http://localhost:8080/members
```

**Buscar por UUID:**
```bash
curl http://localhost:8080/members/{uuid}
```

**Criar membro:**
```bash
curl -X POST http://localhost:8080/members \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "João Silva",
    "social_name": "João",
    "date_birth": "1990-05-15",
    "date_baptism": "2015-06-20",
    "sex": "M",
    "telephone": "11999999999",
    "email": "joao@email.com",
    "password": "senha123",
    "address": {
      "street": "Rua A",
      "number": "123",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01000-000"
    }
  }'
```

### Ministérios (Ministry)

**Listar todos:**
```bash
curl http://localhost:8080/ministrys
```

**Buscar por UUID:**
```bash
curl http://localhost:8080/ministrys/{uuid}
```

**Criar ministério:**
```bash
curl -X POST http://localhost:8080/ministrys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Louvor e Adoração",
    "branch": "Principal",
    "lead_ministry": "{uuid-do-membro}"
  }'
```

### Contribuições (Contributions)

**Listar todas:**
```bash
curl http://localhost:8080/contributions
```

**Buscar por UUID:**
```bash
curl http://localhost:8080/contributions/{uuid}
```

**Criar contribuição:**
```bash
curl -X POST http://localhost:8080/contributions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "dizimo",
    "member": "{uuid-do-membro}",
    "value": 100.50,
    "date": "2026-06-18",
    "payment_type": "dinheiro"
  }'
```

---

## 🔍 Verificações de Validação

### Erros de Validação (400)
```bash
# Campo obrigatório faltando
curl -X POST http://localhost:8080/members \
  -H "Content-Type: application/json" \
  -d '{"full_name": "João"}'  # Faltam campos

# Email inválido
curl -X POST http://localhost:8080/members \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "João",
    "email": "email-invalido",
    ...
  }'
```

### Não Encontrado (404)
```bash
curl http://localhost:8080/members/uuid-inexistente
```

---

## 🛠️ Troubleshooting

**Erro: 'nest' não é reconhecido**
```bash
# Usar npx
npx nest build
npx nest start --watch
```

**Erro de conexão com banco de dados**
- Verificar se PostgreSQL está rodando
- Verificar credenciais em `.env`
- Verificar porta (padrão: 5432)

**Erro ao compilar TypeScript**
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

**Porta 8080 já em uso**
```bash
# Mudar porta no .env
PORT=3000
npm run start:dev
```

---

## 📊 Logs Esperados

Quando o servidor inicia com sucesso, você deve ver:
```
[Nest] 12345  - 06/18/2026, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 06/18/2026, 10:00:01 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] 12345  - 06/18/2026, 10:00:01 AM     LOG [InstanceLoader] MembersModule dependencies initialized
[Nest] 12345  - 06/18/2026, 10:00:01 AM     LOG [InstanceLoader] MinistryModule dependencies initialized
[Nest] 12345  - 06/18/2026, 10:00:01 AM     LOG [InstanceLoader] ContributionsModule dependencies initialized
[Nest] 12345  - 06/18/2026, 10:00:01 AM     LOG [NestApplication] Nest application successfully started
🚀 Servidor rodando em http://localhost:8080
```

---

## ✨ Recursos Implementados

✅ Validação automática de DTOs  
✅ Logging estruturado com Pino  
✅ Injeção de dependência automática  
✅ TypeORM com PostgreSQL  
✅ Relacionamentos entre entidades  
✅ Tratamento de erros padronizado  
✅ Respostas JSON consistentes  

---

## 📝 Resposta Esperada

Todas as respostas seguem este padrão:

**Sucesso (200/201):**
```json
{
  "statusCode": 200,
  "message": "OK",
  "member": { ... }
}
```

**Erro (400/404):**
```json
{
  "statusCode": 404,
  "message": "Membro não encontrado"
}
```

---

## 🎓 Estrutura de Camadas

```
HTTP Request
    ↓
@Controller (decorador) → MembersController
    ↓
Service → MembersService
    ↓
Repository → MembersRepository
    ↓
TypeORM → Database (PostgreSQL)
```

---

## 📚 Documentação Adicional

- `README.md` - Instruções gerais
- `REFACTORING_SUMMARY.md` - Detalhes da refatoração
- `.env.example` - Template de variáveis
- `nest-cli.json` - Configuração Nest CLI

---

Bom testes! 🚀
