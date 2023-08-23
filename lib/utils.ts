import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

//TODO: Make test for this utils

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  let protocol = "http"

  if (process.env.NODE_ENV === "production") {
    protocol = "https"
  }

  return `${protocol}://${env.NEXT_PUBLIC_VERCEL_URL}${path}`
}

export function safeStringToInteger(input: any) {
  const convertedInput = parseInt(input)
  if (isNaN(convertedInput)) {
    return 0
  } else {
    return convertedInput
  }
}

export function safeStringToFloat(input: any) {
  const convertedInput = parseFloat(input)
  if (isNaN(convertedInput)) {
    return 0
  } else {
    return convertedInput
  }
}
