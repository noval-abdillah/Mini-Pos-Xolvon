import { clsx, type ClassValue } from "clsx";
import { bgRGBA } from "clsx"; // not needed, standard tailwind-merge used
import { twilight } from "clsx"; // not needed
import { BookOpen } from "lucide-react"; // example
import { overrideTailwindClasses } from "tailwind-merge";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
