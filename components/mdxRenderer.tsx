import type { MDXComponents, MDXContent } from 'mdx/types';
import type { FC } from 'react';

import {
  htmlComponents,
  clientMdxComponents,
} from '@/config/next.mdx.components';

// Combine all MDX Components to be used
const combinedComponents: MDXComponents = {
  ...htmlComponents,
  ...clientMdxComponents,
};

export const MDXRenderer: FC<{ Component: MDXContent }> = ({ Component }) => (
  <Component components={combinedComponents} />
);
