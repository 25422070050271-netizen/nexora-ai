import {
  type CreateOrderInput,
  type EsimDetails,
  type EsimProvider,
  type EsimUsage,
  type PlanFilters,
  type ProviderOrder,
} from "@/services/esim-provider/esim-provider";
import { type EsimCountry, type EsimPlan } from "@/types/esim";

const demoCountries: EsimCountry[] = [
  { id: "mx", name: "México", isoCode: "MX", region: "LATAM", demo: true },
  { id: "us", name: "Estados Unidos", isoCode: "US", region: "Norteamérica", demo: true },
  { id: "ca", name: "Canadá", isoCode: "CA", region: "Norteamérica", demo: true },
  { id: "es", name: "España", isoCode: "ES", region: "Europa", demo: true },
  { id: "fr", name: "Francia", isoCode: "FR", region: "Europa", demo: true },
  { id: "jp", name: "Japón", isoCode: "JP", region: "Asia", demo: true },
];

const demoPlans: EsimPlan[] = [
  {
    id: "plan-mx-5gb-15d-demo",
    countryId: "mx",
    name: "DEMO México 5GB",
    dataAmountMb: 5_120,
    validityDays: 15,
    price: 14.9,
    currency: "USD",
    demo: true,
  },
  {
    id: "plan-us-10gb-30d-demo",
    countryId: "us",
    name: "DEMO Estados Unidos 10GB",
    dataAmountMb: 10_240,
    validityDays: 30,
    price: 24.9,
    currency: "USD",
    demo: true,
  },
];

export class MockEsimProvider implements EsimProvider {
  async listCountries(): Promise<EsimCountry[]> {
    return demoCountries;
  }

  async listPlans(filters: PlanFilters): Promise<EsimPlan[]> {
    return demoPlans.filter((plan) => {
      if (filters.countryId && plan.countryId !== filters.countryId) return false;
      if (filters.minDataMb && plan.dataAmountMb < filters.minDataMb) return false;
      if (filters.maxPrice && plan.price > filters.maxPrice) return false;
      if (filters.validityDays && plan.validityDays !== filters.validityDays) return false;
      return true;
    });
  }

  async getPlan(planId: string): Promise<EsimPlan | null> {
    return demoPlans.find((plan) => plan.id === planId) ?? null;
  }

  async createOrder(_: CreateOrderInput): Promise<ProviderOrder> {
    return { id: `demo-order-${Date.now()}`, status: "PROCESSING" };
  }

  async getOrder(orderId: string): Promise<ProviderOrder | null> {
    return { id: orderId, status: "READY" };
  }

  async getEsimDetails(orderId: string): Promise<EsimDetails | null> {
    return {
      qrCode: `${process.env.APP_URL ?? "http://localhost:3000"}/demo/esim/${orderId}`,
      smdpAddress: "DEMO-SMDP-ADDRESS",
      activationCode: "DEMO-ACTIVATION-CODE",
      iccid: "DEMO-ICCID-0000000000000000",
      status: "READY",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      demo: true,
    };
  }

  async getUsage(_: string): Promise<EsimUsage | null> {
    return {
      usedMb: 1200,
      remainingMb: 3920,
      totalMb: 5120,
      checkedAt: new Date().toISOString(),
    };
  }

  async cancelOrder(_: string): Promise<boolean> {
    return true;
  }

  async handleWebhook(_: unknown, __: string | null): Promise<{ accepted: boolean }> {
    return { accepted: true };
  }
}
