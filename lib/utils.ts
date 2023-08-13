import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  let protocol = "http"

  if (process.env.NODE_ENV === "production") {
    protocol = "https"
  }

  return `${protocol}://${env.NEXT_PUBLIC_VERCEL_URL}${path}`
}
