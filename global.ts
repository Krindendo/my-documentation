import type { clientMdxComponents } from '@/config/next.mdx.components';

declare global {
  type MDXProvidedComponents = typeof clientMdxComponents;
}
