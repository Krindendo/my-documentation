import { NavigationEntry, SiteNavigation } from '@/types';

const topNavigation: SiteNavigation['topNavigation'] = {
  docs: {
    link: '/docs',
    label: 'Documentation',
  },
  guides: {
    link: '/guides',
    label: 'Guides',
  },
  algorithms: {
    link: '/algorithms',
    label: 'Algorithms',
  },
};

const footerLinks: SiteNavigation['footerLinks'] = [
  {
    link: 'https://openjsf.org/',
    text: 'openJS',
  },
];
const socialLinks: SiteNavigation['socialLinks'] = [
  {
    icon: 'github',
    link: 'https://github.com/Krindendo/my-documentation',
    alt: 'GitHub',
  },
  {
    icon: 'linkedin',
    link: 'https://rs.linkedin.com/in/marko-milo%C5%A1evi%C4%87-934766224',
    alt: 'LinkedIn',
  },
];

const sideNavigationDocs: NavigationEntry[] = [
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Introduction',
        link: '/docs',
      },
    ],
  },
  {
    label: 'Javascript',
    items: [
      { label: 'Introduction', link: '/docs/js' },
      { label: 'basics', link: '/docs/js/basics' },
      { label: 'this', link: '/docs/js/this' },
      { label: 'Class', link: '/docs/js/class' },
    ],
  },
  {
    label: 'Typescript',
    items: [
      { label: 'Introduction', link: '/docs/ts' },
      { label: 'basics', link: '/docs/ts/basics' },
      { label: 'Interface', link: '/docs/ts/interface' },
      { label: 'Type', link: '/docs/ts/type' },
      { label: 'Class', link: '/docs/ts/class' },
    ],
  },
  {
    label: 'React',
    items: [
      { label: 'Introduction', link: '/docs/react' },
      { label: 'State Hooks', link: '/docs/react/state-hooks' },
      { label: 'Context Hooks', link: '/docs/react/context-hooks' },
      { label: 'Ref Hooks', link: '/docs/react/ref-hooks' },
      { label: 'Effect Hooks', link: '/docs/react/effect-hooks' },
      { label: 'Performance Hooks', link: '/docs/react/performance-hooks' },
      { label: 'Other Hooks', link: '/docs/react/other-hooks' },
      { label: 'APIs', link: '/docs/react/apis' },
      { label: 'Advanced guides', link: '/docs/react/advanced-guides' },
    ],
  },
  {
    label: 'React Native',
    items: [{ label: 'Introduction', link: '/docs/react-native' }],
  },
  {
    label: 'Next.js',
    items: [
      { label: 'Introduction', link: '/docs/next' },
      { label: 'Routing', link: '/docs/next/routing' },
      { label: 'Data Fetching', link: '/docs/next/fetching' },
      { label: 'Rendering', link: '/docs/next/rendering' },
    ],
  },
  {
    label: 'Vue',
    items: [
      { label: 'Introduction', link: '/docs/vue' },
      { label: 'Reactivity', link: '/docs/vue/reactivity' },
      { label: 'State', link: '/docs/vue/state' },
      { label: 'Effect', link: '/docs/vue/effect' },
      { label: 'Utilities', link: '/docs/vue/utilities' },
      { label: 'Lifecycle Hooks', link: '/docs/vue/lifecycle-hooks' },
      {
        label: 'Dependency Injection',
        link: '/docs/vue/dependency-injection',
      },
      { label: 'Advanced', link: '/docs/vue/advanced' },
      { label: 'Directives', link: '/docs/vue/directives' },
    ],
  },
  {
    label: 'Node.js',
    items: [
      { label: 'Introduction', link: '/docs/node' },
      { label: 'basics', link: '/docs/node/basics' },
    ],
  },
  {
    label: 'MySql',
    items: [
      { label: 'Introduction', link: '/docs/mysql' },
      { label: 'Schema', link: '/docs/mysql/schema' },
      { label: 'Indexes', link: '/docs/mysql/indexes' },
      { label: 'Queries', link: '/docs/mysql/queries' },
      { label: 'Examples', link: '/docs/mysql/examples' },
    ],
  },
];

const sideNavigationAlgorithms: NavigationEntry[] = [
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Introduction',
        link: '/algorithms',
      },
    ],
  },
  {
    label: 'Data structures',
    items: [
      {
        label: 'Introduction',
        link: '/algorithms/data-structures',
      },
      {
        label: 'Queue',
        link: '/algorithms/data-structures/queue',
      },
      {
        label: 'Stack',
        link: '/algorithms/data-structures/stack',
      },
      {
        label: 'Trees',
        link: '/algorithms/data-structures/trees',
      },
      {
        label: 'Heap',
        link: '/algorithms/data-structures/heap',
      },
      {
        label: 'Tries',
        link: '/algorithms/data-structures/tries',
      },
      {
        label: 'Graphs',
        link: '/algorithms/data-structures/graphs',
      },
      {
        label: 'Maps',
        link: '/algorithms/data-structures/maps',
      },
      {
        label: 'Least recently used',
        link: '/algorithms/data-structures/lru',
      },
    ],
  },
  {
    label: 'Search',
    items: [
      {
        label: 'Introduction',
        link: '/algorithms/search',
      },
      {
        label: 'Linear search',
        link: '/algorithms/search/linear-search',
      },
      {
        label: 'Binary search',
        link: '/algorithms/search/binary-search',
      },
    ],
  },
  {
    label: 'Sorting',
    items: [
      {
        label: 'Introduction',
        link: '/algorithms/sort',
      },
      {
        label: 'Bubble sort',
        link: '/algorithms/sort/bubble-sort',
      },
      {
        label: 'Quick sort',
        link: '/algorithms/sort/quick-sort',
      },
    ],
  },
  {
    label: 'Arrays',
    items: [
      {
        label: 'Introduction',
        link: '/algorithms/arrays',
      },
      {
        label: 'Array list',
        link: '/algorithms/arrays/array-list',
      },
      {
        label: 'Array buffer',
        link: '/algorithms/arrays/array-buffer',
      },
    ],
  },
  {
    label: 'Recursion',
    items: [
      { label: 'Introduction', link: '/algorithms/recursion' },
      { label: 'Path finding', link: '/algorithms/recursion/path-finding' },
    ],
  },
];

const sideNavigation: SiteNavigation['topNavigation'] = {
  docs: {
    label: 'Docs',
    items: sideNavigationDocs,
  },
  guides: {
    label: 'Guides',
    items: [],
  },
  algorithms: {
    label: 'Algorithms',
    items: sideNavigationAlgorithms,
  },
};

export { sideNavigation, topNavigation, footerLinks, socialLinks };
