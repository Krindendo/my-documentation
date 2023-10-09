import { MainNavItem, SidebarNavItem } from "types"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { title: "Documentation", href: "/docs" },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
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
        { title: "APIs", href: "/docs/react/apis" },
      ],
    },
    {
      title: "React Native",
      items: [{ title: "Introduction", href: "/docs/react-native" }],
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
    {
      title: "Node.js",
      items: [{ title: "Introduction", href: "/docs/node" }],
    },
    {
      title: "MySql",
      items: [{ title: "Introduction", href: "/docs/mysql" }],
    },
  ],
}
