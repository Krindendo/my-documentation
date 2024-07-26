'use client';

import type { FC, PropsWithChildren } from 'react';

import { SitePattern } from '@/components/Containers/SitePattern';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="h-full">
    <SitePattern />
    {children}
  </div>
);

export default BaseLayout;
