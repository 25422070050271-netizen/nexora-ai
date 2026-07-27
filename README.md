# Nexora AI

Nexora AI es una plataforma de inteligencia artificial personalizable para conversar, organizar proyectos y construir espacios de trabajo inteligentes.

## Estado actual

La primera base funcional incluye:

- Landing page responsive
- Demo de chat interactiva
- Endpoint de servidor para OpenAI
- Validación de solicitudes con Zod
- Next.js, React, TypeScript y Tailwind CSS
- Modo demo cuando todavía no existe una clave de API

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Configuración de IA

Crea un archivo `.env.local` en tu computadora y agrega la variable del servidor necesaria para OpenAI. Nunca subas claves reales al repositorio.

## Próximas etapas

1. Autenticación con Supabase
2. Dashboard de usuario
3. Historial y memoria persistente
4. AI Spaces
5. Suscripciones con Stripe
6. Despliegue en Vercel

## Autor

Martin Alexander García Hernández
