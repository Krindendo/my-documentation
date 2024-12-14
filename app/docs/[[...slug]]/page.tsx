import { Mdx } from "@/components/mdx";
import { PageHeader } from "@/components/page-header";
import { TableOfContents } from "@/components/table-of-contents";
import { createMetadata } from "@/lib/metadata";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type DocPageProperties = {
  readonly params: Promise<{
    slug: string[];
  }>;
};

export const generateMetadata = async ({
  params,
}: DocPageProperties): Promise<Metadata> => {
  const path = (await params).slug?.join("\\") || "";
  const page = allDocs.find(({ slugAsPath }) => slugAsPath === path);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
  });
};

export const generateStaticParams = (): { slug?: string[] }[] =>
  allDocs.map((page) => ({
    slug: decodeURIComponent(page.slugAsPath).split("/"),
  }));

const DocPage = async ({ params }: DocPageProperties) => {
  const path = (await params).slug?.join("\\") || "";
  const page = allDocs.find(({ slugAsPath }) => slugAsPath === path);

  if (!page) {
    notFound();
  }

  return (
    <div className="container py-16">
      <PageHeader
        heading={page.title}
        text={page.description}
        className="sm:w-9/12"
      />
      <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
        <div className="sm:flex-1">
          <Mdx code={page.body} />
        </div>
        <div className="sticky top-24 hidden shrink-0 md:block">
          <TableOfContents content={page.content} date={page.date} />
        </div>
      </div>
    </div>
  );
};

export default DocPage;
