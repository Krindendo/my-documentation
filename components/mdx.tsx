import { MDXContent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, HTMLProps } from "react";
import { MdxCard } from "./mdx-card";
import { Icons } from "./icons";
import { Callout } from "./callout";
import { CodeBox } from "./code-box";

const a = ({ href, ...properties }: HTMLProps<HTMLAnchorElement>) => {
  if (typeof href !== "string") {
    throw new TypeError("href is required");
  }

  if (href.startsWith("/")) {
    return <Link href={href} {...properties} prefetch={true} />;
  }

  return (
    <a {...properties} href={href} target="_blank" rel="noopener noreferrer" />
  );
};

const img = (properties: HTMLProps<HTMLImageElement>) => {
  if (
    typeof properties.src !== "string" ||
    typeof properties.alt !== "string"
  ) {
    throw new TypeError("Image src and alt are required");
  }

  return (
    <Image
      src={properties.src}
      alt={properties.alt}
      width={1240}
      height={698}
      unoptimized={properties.src.startsWith("http")}
      className="overflow-hidden rounded"
    />
  );
};

const table = ({ ...properties }: HTMLProps<HTMLTableElement>) => (
  <div className="my-6 w-full overflow-y-auto">
    <table {...properties} />
  </div>
);

const tr = ({ ...properties }: HTMLProps<HTMLTableRowElement>) => (
  <tr className="m-0 border-t p-0 even:bg-muted" {...properties} />
);

const p = ({ children, ...properties }: HTMLProps<HTMLParagraphElement>) => (
  <p className="[&:not(:first-child)]:mt-6" {...properties}>
    {children}
  </p>
);

const ul = ({ children, ...properties }: HTMLProps<HTMLUListElement>) => (
  <ul className="my-6 ml-6 list-disc" {...properties}>
    {children}
  </ul>
);

export const Mdx = ({
  code,
  components,
}: ComponentProps<typeof MDXContent>) => (
  <div className="prose prose-neutral dark:prose-invert">
    <MDXContent
      code={code}
      components={{
        a,
        p,
        ul,
        img,
        table,
        tr,
        Callout,
        pre: CodeBox,
        MdxCard,
        //Icons,
        ...components,
      }}
    />
  </div>
);
