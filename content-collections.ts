import { readFileSync } from "node:fs"
import path from "path"
import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

const prettyCodeOptions: Options = {
  theme: "dark-plus",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className ??= []
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedChars(node) {
    node.properties.className ??= []
    node.properties.className = ["word--highlighted"]
  },
}

const options: any = {
  remarkPlugins: [codeImport, remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "pre") {
          const [codeEl] = node.children
          if (codeEl.tagName !== "code") {
            return
          }
          if (codeEl.data?.meta) {
            // Extract event from meta and pass it down the tree.
            const regex = /event="([^"]*)"/
            const match = codeEl.data?.meta.match(regex)
            if (match) {
              node.__event__ = match ? match[1] : null
              codeEl.data.meta = codeEl.data.meta.replace(regex, "")
            }
          }
          node.__rawString__ = codeEl.children?.[0].value
          node.__src__ = node.properties?.__src__
          node.__style__ = node.properties?.__style__
        }
      })
    },
    [rehypePrettyCode, prettyCodeOptions],
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "figure") {
          if (!("data-rehype-pretty-code-figure" in node.properties)) {
            return
          }

          const preElement = node.children.at(-1)
          if (preElement.tagName !== "pre") {
            return
          }

          preElement.properties["__withMeta__"] =
            node.children.at(0).tagName === "div"

          if (node.__src__) {
            preElement.properties["__src__"] = node.__src__
          }

          if (node.__event__) {
            preElement.properties["__event__"] = node.__event__
          }

          if (node.__style__) {
            preElement.properties["__style__"] = node.__style__
          }
        }
      })
    },
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["subheading-anchor"],
          ariaLabel: "Link to section",
        },
      },
    ],
  ],
}





const doc = defineCollection({
  name: "Doc",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    published: z.boolean().default(true),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, options);
    return {
      ...document,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body,
      },
    }
  
  }
})

const guide = defineCollection({
  name: "Guide",
  directory: "content/guides",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, options);
    return {
      ...document,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body,
      },
    }
  
  }
})

const algorithms = defineCollection({
  name: "Algorithms",
  directory: "content/algorithms",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    published: z.boolean().default(true),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, options);
    return {
      ...document,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body,
      },
    }
  
  }
})

export default defineConfig({
  collections: [doc, guide, algorithms],
})
