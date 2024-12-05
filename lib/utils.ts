import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const IS_SERVER = typeof window === "undefined";

export function getProtocol() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https";
  }
  return "http";
}

export function getBaseUrl() {
  if (!IS_SERVER) {
    return location.origin;
  }

  const protocol = getProtocol();
  return `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}

export function getAbsoluteUrl(path: string) {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}
