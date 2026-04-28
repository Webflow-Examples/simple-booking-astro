export type BookingMode = "online" | "call-only";
export type DepositRule = "none" | "fifty-percent" | "full";

export interface Service {
  id: string;
  name: string;
  durationMin: number;
  priceUsd: number;
  mode: BookingMode;
  deposit: DepositRule;
  postBookingInstructions?: string;
}

export interface Provider {
  id: string;
  name: string;
  serviceIds: string[];
}

export interface Slot {
  iso: string;
  providerId: string;
}

export interface Booking {
  service: Service;
  provider: Provider;
  slot: Slot;
  customerName: string;
  customerEmail: string;
  depositPaidUsd: number;
}
