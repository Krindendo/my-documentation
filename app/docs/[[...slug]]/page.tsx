import "@/styles/mdx.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { env } from "@/env.mjs"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardTableOfContents } from "@/components/dashboard-table-of-contents"
import { DocsPageHeader } from "@/components/docs-page-header"
import { Mdx } from "@/components/mdx-components"

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

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const ogUrl = new URL(absoluteUrl("/api/og"))
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
      url: absoluteUrl(doc.slug),
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
      images: ["/og.jpg"],
    },
  }
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
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
      {toc ? (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : null}
    </main>
  )
}
