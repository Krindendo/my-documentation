import { ReadonlyURLSearchParams } from "next/navigation"
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

export const IS_SERVER = typeof window === "undefined"

export function getProtocol() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https"
  }
  return "http"
}

export function getBaseUrl() {
  if (!IS_SERVER) {
    return location.origin
  }

  const protocol = getProtocol()
  return `${protocol}://${env.NEXT_PUBLIC_VERCEL_URL}`
}

export function getAbsoluteUrl(path: string) {
  const baseUrl = getBaseUrl()
  return `${baseUrl}${path}`
}

type State<T> = { data: T } | { error: Error }

export async function fetcher<T>(url: RequestInfo, options?: RequestInit) {
  if (!url) return { error: new Error("url is missing") }

  try {
    const res = await fetch(url, options)

    if (!res.ok) {
      // const json = (await res.json()) as T
      // if (json.error) {
      //   const error = new Error(json.error) as Error & {
      //     status: number
      //   }
      //   error.status = res.status
      //   throw error
      // } else {
      //   throw new Error("An unexpected error occurred")
      // }
      console.log("error", res)
      throw new Error(res.statusText)
    }

    return { data: (await res.json()) as T }
  } catch (error) {
    console.log("error", error)
    return { error }
  }
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

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}
