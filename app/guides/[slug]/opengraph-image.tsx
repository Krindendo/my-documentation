import React from "react"
import { ImageResponse } from "next/server"

import { absoluteUrl } from "@/lib/utils"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "About Acme"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font
  const og = await fetch(absoluteUrl("/api/og")).then((res) => res.json())

  return <>{og}</>
}
