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
        { title: "Introduction", href: "/docs/js", disabled: true },
        { title: "Introduction", href: "/docs/js", disabled: true },
      ],
    },
    {
      title: "React",
      items: [
        { title: "Introduction", href: "/docs/react", disabled: true },
        { title: "Introduction", href: "/docs/react", disabled: true },
      ],
    },
    {
      title: "Next.js",
      items: [
        { title: "Introduction", href: "/docs/next", disabled: true },
        { title: "Introduction", href: "/docs/next", disabled: true },
      ],
    },
    {
      title: "Vue",
      items: [
        { title: "Introduction", href: "/docs/vue", disabled: true },
        { title: "Introduction", href: "/docs/vue", disabled: true },
      ],
    },
  ],
}
