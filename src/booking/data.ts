import type { Provider, Service } from "./types";

export const CALL_ONLY_PHONE = "(555) 010-0123";

export const services: Service[] = [
  {
    id: "consultation-30",
    name: "30-min Consultation",
    durationMin: 30,
    priceUsd: 80,
    mode: "online",
    deposit: "none",
  },
  {
    id: "massage-60",
    name: "60-min Therapeutic Massage",
    durationMin: 60,
    priceUsd: 140,
    mode: "online",
    deposit: "fifty-percent",
    postBookingInstructions:
      "Please arrive 10 minutes early. Avoid heavy meals or caffeine in the hour before your session.",
  },
  {
    id: "mri-scan",
    name: "MRI Scan",
    durationMin: 60,
    priceUsd: 600,
    mode: "call-only",
    deposit: "full",
  },
];

export const providers: Provider[] = [
  {
    id: "dr-lee",
    name: "Dr. Lee",
    serviceIds: ["consultation-30", "massage-60"],
  },
  {
    id: "dr-kim",
    name: "Dr. Kim",
    serviceIds: ["consultation-30", "mri-scan"],
  },
];
