'use client';

import { useContext } from 'react';

import { MatterContext } from '@/providers/matterProvider';
import type { ClientSharedServerContext } from '@/types';

const useClientContext = (): ClientSharedServerContext => {
  const { frontmatter, pathname, headings, filename } =
    useContext(MatterContext);

  return { pathname, frontmatter, headings, filename };
};

export default useClientContext;
