import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [{ title: "Documentation", href: "/docs" }],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Javascript",
      items: [
        { title: "Introduction", href: "/docs/js" },
        { title: "this", href: "/docs/js/this" },
        { title: "Class", href: "/docs/js/class" },
      ],
    },
    {
      title: "Typescript",
      items: [
        { title: "Introduction", href: "/docs/ts" },
        { title: "Interface", href: "/docs/ts/interface" },
        { title: "Type", href: "/docs/ts/type" },
        { title: "Class", href: "/docs/ts/class" },
      ],
    },
    {
      title: "React",
      items: [
        { title: "Introduction", href: "/docs/react" },
        { title: "State Hooks", href: "/docs/react/state-hooks" },
        { title: "Context Hooks", href: "/docs/react/context-hooks" },
        { title: "Ref Hooks", href: "/docs/react/ref-hooks" },
        { title: "Effect Hooks", href: "/docs/react/effect-hooks" },
        { title: "Performance Hooks", href: "/docs/react/performance-hooks" },
        { title: "Other Hooks", href: "/docs/react/other-hooks" },
      ],
    },
    {
      title: "Next.js",
      items: [
        { title: "Introduction", href: "/docs/next" },
        { title: "Routing", href: "/docs/next/routing" },
        { title: "Data Fetching", href: "/docs/next/fetching" },
        { title: "Rendering", href: "/docs/next/rendering" },
      ],
    },
    {
      title: "Vue",
      items: [{ title: "Introduction", href: "/docs/vue" }],
    },
  ],
}
