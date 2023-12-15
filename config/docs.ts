import { MainNavItem, SidebarNavItem } from "types"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNavDocs: SidebarNavItem[]
  sidebarNavAlgorithms: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { title: "Documentation", href: "/docs" },
    {
      title: "Guides",
      href: "/guides",
    },
    {
      title: "Algorithms",
      href: "/algorithms",
    },
  ],
  sidebarNavDocs: [
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
      items: [
        { title: "Introduction", href: "/docs/vue" },
        { title: "Reactivity", href: "/docs/vue/reactivity" },
        { title: "State", href: "/docs/vue/state" },
        { title: "Effect", href: "/docs/vue/effect" },
        { title: "Utilities", href: "/docs/vue/utilities" },
        { title: "Lifecycle Hooks", href: "/docs/vue/lifecycle-hooks" },
        {
          title: "Dependency Injection",
          href: "/docs/vue/dependency-injection",
        },
        { title: "Advanced", href: "/docs/vue/advanced" },
        { title: "Directives", href: "/docs/vue/directives" },
      ],
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
  sidebarNavAlgorithms: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/algorithms",
        },
      ],
    },
    {
      title: "Search",
      items: [
        {
          title: "Introduction",
          href: "/algorithms/search",
        },
        {
          title: "Linear search",
          href: "/algorithms/search/linear-search",
        },
        {
          title: "Binary search",
          href: "/algorithms/search/binary-search",
        },
      ],
    },
    {
      title: "Sorting",
      items: [
        {
          title: "Introduction",
          href: "/algorithms/sort",
        },
        {
          title: "Bubble sort",
          href: "/algorithms/sort/bubble-sort",
        },
        {
          title: "Linked list data structures",
          href: "/algorithms/sort/linked-list-data-structures",
        },
        {
          title: "Queue",
          href: "/algorithms/sort/queue",
        },
        {
          title: "Stack",
          href: "/algorithms/sort/stack",
        },
      ],
    },
    {
      title: "Arrays",
      items: [
        {
          title: "Introduction",
          href: "/algorithms/arrays",
        },
      ],
    },
  ],
}
