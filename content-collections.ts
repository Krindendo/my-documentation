import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "dark-plus",
    dark: "dark-plus",
  },
  langs: [
    "tsx",
    "jsx",
    "js",
    "ts",
    "tsx",
    "json",
    "css",
    "shell",
    "ps",
    "bash",
    "sql",
    "docker",
    "diff",
    "vue",
  ],
  addLanguageClass: true,
};

const docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    return {
      ...page,
      body,
      date: new Date(page.date),
      slug: page._meta.path.split("\\"),
      slugAsPath: page._meta.path
        .split("\\")
        .filter((s) => s !== "index")
        .join("\\"),
    };
  },
});

const algorithms = defineCollection({
  name: "algorithms",
  directory: "content/algorithms",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    return {
      ...page,
      body,
      date: new Date(page.date),
      slug: page._meta.path.split("\\"),
      slugAsPath: page._meta.path
        .split("\\")
        .filter((s) => s !== "index")
        .join("\\"),
    };
  },
});

const guides = defineCollection({
  name: "guides",
  directory: "content/guides",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.string().min(1),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    return {
      ...page,
      body,
      publishedAt: new Date(page.publishedAt),
      slug: page._meta.path.split("\\"),
      slugAsPath: page._meta.path
        .split("\\")
        .filter((s) => s !== "index")
        .join("\\"),
    };
  },
});

export default defineConfig({
  collections: [docs, algorithms, guides],
});
