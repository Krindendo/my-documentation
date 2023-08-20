import { allDocs } from "@/.contentlayer/generated"

import { env } from "@/env.mjs"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "About Acme"
export const size = {
  width: 1200,
  height: 630,
}

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }
  return doc
}

export default async function Image({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const url = env.NEXT_PUBLIC_VERCEL_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", doc.description ?? doc.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  const og = await fetch(ogUrl).then((res) => res.json())

  return <>{og}</>
}
