import { Mdx } from "@/components/mdx";
import { PageHeader } from "@/components/page-header";
import { Sidebar } from "@/components/sidebar";
import { env } from "@repo/env";
import { type BlogPosting, JsonLd, type WithContext } from "@repo/seo/json-ld";
import { createMetadata } from "@repo/seo/metadata";
import { allDocs } from "content-collections";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogPostProperties): Promise<Metadata> => {
  const { slug } = await params;
  const page = allDocs.find(({ _meta }) => _meta.path === slug);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
  });
};

export const generateStaticParams = (): { slug: string }[] =>
  allDocs.map((page) => ({
    slug: page._meta.path,
  }));

const BlogPost = async ({ params }: BlogPostProperties) => {
  const { slug } = await params;
  const page = allDocs.find(({ _meta }) => _meta.path === slug);

  if (!page) {
    notFound();
  }

  const jsonLd: WithContext<BlogPosting> = {
    "@type": "BlogPosting",
    "@context": "https://schema.org",
    datePublished: page.date.toISOString(),
    description: page.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(
        `/blog/${slug}`,
        env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ).toString(),
    },
    headline: page.title,
    dateModified: page.date.toISOString(),
    isAccessibleForFree: true,
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="container py-16">
        <PageHeader heading={page.title} text={page.description} />
        <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
          <div className="sm:flex-1">
            <Mdx code={page.body} />
          </div>
          <div className="sticky top-24 hidden shrink-0 md:block">
            <Sidebar content={page.content} date={page.date} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
