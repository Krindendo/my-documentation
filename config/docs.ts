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
        { title: "basics", href: "/docs/js/basics" },
        { title: "this", href: "/docs/js/this" },
        { title: "Class", href: "/docs/js/class" },
      ],
    },
    {
      title: "Typescript",
      items: [
        { title: "Introduction", href: "/docs/ts" },
        { title: "basics", href: "/docs/ts/basics" },
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
      items: [
        { title: "Introduction", href: "/docs/node" },
        { title: "basics", href: "/docs/node/basics" },
      ],
    },
    {
      title: "MySql",
      items: [
        { title: "Introduction", href: "/docs/mysql" },
        { title: "Schema", href: "/docs/mysql/schema" },
        { title: "Indexes", href: "/docs/mysql/indexes" },
        { title: "Queries", href: "/docs/mysql/queries" },
      ],
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
      title: "Data structures",
      items: [
        {
          title: "Introduction",
          href: "/algorithms/data-structures",
        },
        {
          title: "Queue",
          href: "/algorithms/data-structures/queue",
        },
        {
          title: "Stack",
          href: "/algorithms/data-structures/stack",
        },
        {
          title: "Trees",
          href: "/algorithms/data-structures/trees",
        },
        {
          title: "Heap",
          href: "/algorithms/data-structures/heap",
        },
        {
          title: "Tries",
          href: "/algorithms/data-structures/tries",
        },
        {
          title: "Graphs",
          href: "/algorithms/data-structures/graphs",
        },
        {
          title: "Maps",
          href: "/algorithms/data-structures/maps",
        },
        {
          title: "Least recently used",
          href: "/algorithms/data-structures/lru",
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
          title: "Quick sort",
          href: "/algorithms/sort/quick-sort",
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
        {
          title: "Array list",
          href: "/algorithms/arrays/array-list",
        },
        {
          title: "Array buffer",
          href: "/algorithms/arrays/array-buffer",
        },
      ],
    },
    {
      title: "Recursion",
      items: [
        { title: "Introduction", href: "/algorithms/recursion" },
        { title: "Path finding", href: "/algorithms/recursion/path-finding" },
      ],
    },
  ],
}
