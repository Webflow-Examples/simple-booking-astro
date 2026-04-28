import type { DepositRule, Slot } from "./types";

// 9–11am and 1–4pm, with the gap representing a midday lunch break.
const HOURS = [9, 10, 11, 13, 14, 15, 16];
const DAYS_AHEAD = 7;

export function generateSlots(providerId: string, from = new Date()): Slot[] {
  const slots: Slot[] = [];
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);

  for (let d = 1; d <= DAYS_AHEAD; d++) {
    const day = new Date(start);
    day.setDate(day.getDate() + d);
    const dow = day.getDay();
    if (dow === 0 || dow === 6) continue;
    for (const h of HOURS) {
      const slotDate = new Date(day);
      slotDate.setHours(h, 0, 0, 0);
      slots.push({ iso: slotDate.toISOString(), providerId });
    }
  }
  return slots;
}

export function formatSlot(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function depositAmount(priceUsd: number, rule: DepositRule): number {
  if (rule === "none") return 0;
  if (rule === "fifty-percent") return priceUsd / 2;
  return priceUsd;
}
