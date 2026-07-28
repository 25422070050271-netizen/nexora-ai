import { readEnv } from "@/config/env";
import { type EsimProvider } from "@/services/esim-provider/esim-provider";
import { MockEsimProvider } from "@/services/esim-provider/mock-esim-provider";
import { RealEsimProvider } from "@/services/esim-provider/real-esim-provider";

let provider: EsimProvider | null = null;

export function getEsimProvider(): EsimProvider {
  if (provider) {
    return provider;
  }

  const env = readEnv();
  provider = env.ESIM_PROVIDER_MODE === "real" ? new RealEsimProvider() : new MockEsimProvider();
  return provider;
}
