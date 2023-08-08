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
      ],
    },
    {
      title: "Typescript",
      items: [
        { title: "Introduction", href: "/docs/ts" },
        { title: "Introduction", href: "/docs/ts", disabled: true },
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
        { title: "Introduction", href: "/docs/next", disabled: true },
      ],
    },
    {
      title: "Vue",
      items: [
        { title: "Introduction", href: "/docs/vue" },
        { title: "Introduction", href: "/docs/vue/", disabled: true },
      ],
    },
  ],
}
