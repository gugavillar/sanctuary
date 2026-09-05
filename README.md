# Sanctuary

Church administrative management system — documents and users, with role- and category-based permissions.

🇺🇸 [English](#english) · 🇧🇷 [Português](#português)

---

## English

Sanctuary is a small internal management app for a church office: it centralizes document storage (deeds, contracts, reports, receipts, etc.) organized by category and type, and manages which staff member can view or add documents for each category, plus a separate admin-only area for user management.

### Features

- **Authentication** — email/password login via [better-auth](https://www.better-auth.com), forced password change on first login and on admin-triggered resets.
- **Roles & permissions** — an `ADMIN` role with full access to everything (including user management), and a `USER` role whose access to each document category (view-only or view+add) is granted individually by an admin.
- **Document management** — create documents with title, type, category, date, identification, description and tags, with PDF upload (stored in an S3 bucket via presigned URLs); searchable, paginated listing filtered by what the logged-in user is allowed to see.
- **User management** (admin only) — create users, assign role and per-category permissions, force a password reset.

### Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR) with [TanStack Router](https://tanstack.com/router) (file-based routing) and [TanStack Query](https://tanstack.com/query)
- [Prisma](https://www.prisma.io/) + PostgreSQL
- [better-auth](https://www.better-auth.com) (email/password + admin plugin)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- AWS S3 for file storage
- [Nitro](https://nitro.build/) as the server adapter (deployable to any Node-compatible host)
- [Biome](https://biomejs.dev/) for linting and formatting

### Getting started

**Prerequisites:** Node.js, [pnpm](https://pnpm.io/), Docker (for a local PostgreSQL instance), and an AWS S3 bucket (for file uploads).

```bash
# 1. Install dependencies
pnpm install

# 2. Copy the env file and fill in the values (DB credentials, better-auth secret, AWS keys)
cp .env.example .env

# 3. Start PostgreSQL
docker compose up -d

# 4. Apply migrations and seed initial data (document categories/types + an admin user)
pnpm db:migrate
pnpm db:seed

# 5. Start the dev server
pnpm dev
```

The app runs at `http://localhost:3000`. The seed script creates an admin user (`admin@admin.com.br`, password from `FIRST_PASSWORD` in `src/constants`) that must change its password on first login.

### Available scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Run the production build locally |
| `pnpm check-types` | Type-check with `tsc` |
| `pnpm check` / `pnpm lint` / `pnpm format` | Biome check / lint / format |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed categories, types and the initial admin user |
| `pnpm db:studio` | Open Prisma Studio |

### Project structure

```
src/
  components/   shared UI (forms, layout primitives)
  features/     screen-level React components (login, documents, users, ...)
  routes/       file-based routes (pages and API routes) — powers TanStack Router
  services/     API client calls + TanStack Query hooks, grouped by domain
  lib/          auth config, permissions, Prisma client, S3 client
prisma/         schema, migrations and seed script
```

---

## Português

O Sanctuary é um sistema interno de gestão administrativa para uma igreja: centraliza o armazenamento de documentos (atas, contratos, relatórios, recibos etc.) organizados por categoria e tipo, e controla quem pode visualizar ou adicionar documentos de cada categoria, além de uma área separada, restrita a administradores, para gestão de usuários.

### Funcionalidades

- **Autenticação** — login com email/senha via [better-auth](https://www.better-auth.com), com troca de senha obrigatória no primeiro acesso e sempre que um admin reseta a senha de alguém.
- **Papéis e permissões** — papel `ADMIN` com acesso total (incluindo gestão de usuários), e papel `USER` cujo acesso a cada categoria de documento (só visualizar ou visualizar e adicionar) é concedido individualmente por um admin.
- **Gestão de documentos** — criação de documentos com título, tipo, categoria, data, identificação, descrição e etiquetas, com upload de PDF (armazenado em um bucket S3 via URLs pré-assinadas); listagem paginada e pesquisável, filtrada pelo que o usuário logado tem permissão de ver.
- **Gestão de usuários** (só admin) — criação de usuários, atribuição de papel e permissões por categoria, reset forçado de senha.

### Tecnologias

- [TanStack Start](https://tanstack.com/start) (React 19, SSR) com [TanStack Router](https://tanstack.com/router) (rotas baseadas em arquivos) e [TanStack Query](https://tanstack.com/query)
- [Prisma](https://www.prisma.io/) + PostgreSQL
- [better-auth](https://www.better-auth.com) (email/senha + plugin de admin)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- AWS S3 para armazenamento de arquivos
- [Nitro](https://nitro.build/) como adaptador de servidor (roda em qualquer host compatível com Node)
- [Biome](https://biomejs.dev/) para lint e formatação

### Como rodar

**Pré-requisitos:** Node.js, [pnpm](https://pnpm.io/), Docker (para o PostgreSQL local) e um bucket S3 na AWS (para upload de arquivos).

```bash
# 1. Instalar as dependências
pnpm install

# 2. Copiar o arquivo de env e preencher os valores (credenciais do banco, secret do better-auth, chaves da AWS)
cp .env.example .env

# 3. Subir o PostgreSQL
docker compose up -d

# 4. Rodar as migrations e popular os dados iniciais (categorias/tipos de documento + um usuário admin)
pnpm db:migrate
pnpm db:seed

# 5. Rodar o servidor de desenvolvimento
pnpm dev
```

A aplicação roda em `http://localhost:3000`. O script de seed cria um usuário admin (`admin@admin.com.br`, senha em `FIRST_PASSWORD` em `src/constants`) que precisa trocar a senha no primeiro login.

### Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `pnpm dev` | Roda o servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm preview` | Roda o build de produção localmente |
| `pnpm check-types` | Checagem de tipos com `tsc` |
| `pnpm check` / `pnpm lint` / `pnpm format` | Check / lint / format do Biome |
| `pnpm db:migrate` | Roda as migrations do Prisma |
| `pnpm db:seed` | Popula categorias, tipos e o usuário admin inicial |
| `pnpm db:studio` | Abre o Prisma Studio |

### Estrutura do projeto

```
src/
  components/   UI compartilhada (formulários, primitivos de layout)
  features/     componentes React de tela (login, documentos, usuários, ...)
  routes/       rotas baseadas em arquivo (páginas e rotas de API) — usadas pelo TanStack Router
  services/     chamadas de API + hooks do TanStack Query, agrupados por domínio
  lib/          config de auth, permissões, client do Prisma, client do S3
prisma/         schema, migrations e script de seed
```
