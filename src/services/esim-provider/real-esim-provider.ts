import {
  type CreateOrderInput,
  type EsimDetails,
  type EsimProvider,
  type EsimUsage,
  type PlanFilters,
  type ProviderOrder,
} from "@/services/esim-provider/esim-provider";
import { type EsimCountry, type EsimPlan } from "@/types/esim";

const stageMessage =
  "RealEsimProvider está preparado estructuralmente pero no está conectado todavía a una API autorizada.";

export class RealEsimProvider implements EsimProvider {
  async listCountries(): Promise<EsimCountry[]> {
    throw new Error(stageMessage);
  }

  async listPlans(_: PlanFilters): Promise<EsimPlan[]> {
    throw new Error(stageMessage);
  }

  async getPlan(_: string): Promise<EsimPlan | null> {
    throw new Error(stageMessage);
  }

  async createOrder(_: CreateOrderInput): Promise<ProviderOrder> {
    throw new Error(stageMessage);
  }

  async getOrder(_: string): Promise<ProviderOrder | null> {
    throw new Error(stageMessage);
  }

  async getEsimDetails(_: string): Promise<EsimDetails | null> {
    throw new Error(stageMessage);
  }

  async getUsage(_: string): Promise<EsimUsage | null> {
    throw new Error(stageMessage);
  }

  async cancelOrder(_: string): Promise<boolean> {
    throw new Error(stageMessage);
  }

  async handleWebhook(_: unknown, __: string | null): Promise<{ accepted: boolean }> {
    throw new Error(stageMessage);
  }
}
