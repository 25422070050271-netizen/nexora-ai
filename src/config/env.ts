import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  ESIM_PROVIDER_MODE: z.enum(["mock", "real"]).default("mock"),
  ESIM_PROVIDER_BASE_URL: z.string().optional(),
  ESIM_PROVIDER_API_KEY: z.string().optional(),
  ESIM_PROVIDER_WEBHOOK_SECRET: z.string().optional(),
  DATA_ENCRYPTION_KEY: z.string().min(1),
  APP_URL: z.string().url(),
});

export function readEnv() {
  return envSchema.parse(process.env);
}
