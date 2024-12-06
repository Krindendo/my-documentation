import { Mdx } from "@/components/mdx";
import { PageHeader } from "@/components/page-header";
import { Sidebar } from "@/components/sidebar";
import { createMetadata } from "@/lib/metadata";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type DocPostProperties = {
  readonly params: Promise<{
    slug: string[];
  }>;
};

export const generateMetadata = async ({
  params,
}: DocPostProperties): Promise<Metadata> => {
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

const DocPost = async ({ params }: DocPostProperties) => {
  const { slug } = await params;
  console.log("allDocs", allDocs);
  const page = allDocs.find(({ _meta }) => _meta.path === slug.join("/"));

  if (!page) {
    notFound();
  }

  return (
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
  );
};

export default DocPost;
