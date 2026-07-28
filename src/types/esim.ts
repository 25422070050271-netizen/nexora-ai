export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "READY"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED"
  | "FAILED";

export type ProviderMode = "mock" | "real";

export type EsimCountry = {
  id: string;
  name: string;
  isoCode: string;
  region: string;
  demo: boolean;
};

export type EsimPlan = {
  id: string;
  countryId: string;
  name: string;
  dataAmountMb: number;
  validityDays: number;
  price: number;
  currency: string;
  demo: boolean;
};
