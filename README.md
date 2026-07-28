# Lynk eSIM

Plataforma web para vender, activar y administrar planes eSIM de forma legal mediante integración con proveedores autorizados. Este repositorio ya incluye la **estructura completa base** y la **Etapa 1** (fundaciones técnicas) para continuar con implementación por etapas.

## Stack (Etapa 1)

- Next.js (App Router) + React 19
- TypeScript estricto
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Auth.js
- Stripe SDK (Checkout)
- Zod + React Hook Form
- TanStack Query
- Vitest + Playwright
- ESLint + Prettier

## Arquitectura base

```text
src/
  app/
  components/
  features/
    auth/
    countries/
    plans/
    checkout/
    esim/
    dashboard/
    support/
    admin/
  lib/
  server/
  services/
    esim-provider/
    payments/
    notifications/
  types/
  validations/
prisma/
```

## Inicio rápido

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar entorno local:

   ```bash
   cp .env.example .env.local
   ```

3. Configurar `DATABASE_URL` en `.env.local`.

4. Generar cliente Prisma:

   ```bash
   npm run prisma:generate
   ```

5. Levantar desarrollo:

   ```bash
   npm run dev
   ```

## Scripts disponibles

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run prisma:generate`
- `npm run prisma:migrate:dev`
- `npm run db:seed`

## Variables de entorno

Revisa `.env.example`. Nunca subas secretos reales al repositorio.

## Alcance completado en esta entrega

- Reestructuración a `src/` y módulos por dominio.
- Base de Prisma y conexión a PostgreSQL.
- Base de Auth.js con estrategia Credentials y protección de rutas privadas.
- Base de UI inicial para Home / Login / Dashboard.
- Tooling inicial para lint, typecheck, tests unitarios y e2e.
