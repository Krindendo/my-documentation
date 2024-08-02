'use client';

import type { FC } from 'react';

import Sidebar from '@/components/Containers/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import { useSectionStore } from '@/providers/sidebarProvider';
import { useStore } from 'zustand';

interface WithSidebarProps {
  context?: Record<string, string>;
}

const WithSidebar: FC<WithSidebarProps> = ({ context }) => {
  const store = useSectionStore();
  const sectionPath = useStore(store, s => s.sectionPath);
  const { getSideNavigation } = useSiteNavigation();

  const mappedSidebarItems = getSideNavigation([sectionPath], context).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return <Sidebar groups={mappedSidebarItems} />;
};

export default WithSidebar;
