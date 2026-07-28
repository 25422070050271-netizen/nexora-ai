import { type EsimCountry, type EsimPlan, type OrderStatus } from "@/types/esim";

export type PlanFilters = {
  countryId?: string;
  region?: string;
  minDataMb?: number;
  maxPrice?: number;
  validityDays?: number;
};

export type CreateOrderInput = {
  planId: string;
  customerEmail: string;
};

export type ProviderOrder = {
  id: string;
  status: OrderStatus;
};

export type EsimDetails = {
  qrCode: string;
  smdpAddress: string;
  activationCode: string;
  iccid?: string;
  status: OrderStatus;
  expiresAt: string;
  demo: boolean;
};

export type EsimUsage = {
  usedMb: number;
  remainingMb: number;
  totalMb: number;
  checkedAt: string;
};

export interface EsimProvider {
  listCountries(): Promise<EsimCountry[]>;
  listPlans(filters: PlanFilters): Promise<EsimPlan[]>;
  getPlan(planId: string): Promise<EsimPlan | null>;
  createOrder(data: CreateOrderInput): Promise<ProviderOrder>;
  getOrder(orderId: string): Promise<ProviderOrder | null>;
  getEsimDetails(orderId: string): Promise<EsimDetails | null>;
  getUsage(orderId: string): Promise<EsimUsage | null>;
  cancelOrder(orderId: string): Promise<boolean>;
  handleWebhook(payload: unknown, signature: string | null): Promise<{ accepted: boolean }>;
}
