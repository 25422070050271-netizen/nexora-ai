import Stripe from "stripe";
import { readEnv } from "@/config/env";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (stripeClient) {
    return stripeClient;
  }

  const env = readEnv();
  stripeClient = new Stripe(env.STRIPE_SECRET_KEY);
  return stripeClient;
}
