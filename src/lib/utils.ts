import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
export function formatUsd(input: number) {
  return USDollar.format(input);
}

// Mobile-friendly format for large numbers (B/M/K notation)
export function formatUsdMobile(input: number) {
  const abs = Math.abs(input);
  
  if (abs >= 1e9) {
    return `$${(input / 1e9).toFixed(1)}B`;
  } else if (abs >= 1e6) {
    return `$${(input / 1e6).toFixed(1)}M`;
  } else if (abs >= 1e3) {
    return `$${(input / 1e3).toFixed(1)}K`;
  } else {
    return USDollar.format(input);
  }
}

export function getProtocolDisplayName(protocol: string, instance?: string): string {
  return instance ? `${protocol} ${instance}` : protocol;
}
