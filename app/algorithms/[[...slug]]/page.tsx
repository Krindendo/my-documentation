import "@/styles/mdx.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allAlgorithms } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { getAbsoluteUrl, getBaseUrl } from "@/lib/utils"
import { DocsPageHeader } from "@/components/docs-page-header"
import { Mdx } from "@/components/mdx-components"
import { InjectTOC } from "@/components/site-provider"

interface AlgorithmsPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: AlgorithmsPageProps) {
  const slug = params.slug?.join("/") || ""
  const doc = allAlgorithms.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }
  return doc
}

export async function generateMetadata({
  params,
}: AlgorithmsPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const ogUrl = new URL("/api/og", getBaseUrl())
  ogUrl.searchParams.set("heading", doc.description ?? doc.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: getAbsoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  AlgorithmsPageProps["params"][]
> {
  return allAlgorithms.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: AlgorithmsPageProps) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      <InjectTOC toc={toc} />
    </main>
  )
}
