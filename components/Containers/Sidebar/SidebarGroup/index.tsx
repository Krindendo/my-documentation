'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ComponentProps, type FC } from 'react';
import { useStore } from 'zustand';

import ActivePageMarker from '@/components/Containers/Sidebar/ActivePageMarker';
import NavLink from '@/components/Containers/Sidebar/NavLink';
import Tree from '@/components/Containers/Sidebar/Tree';
import VisibleSectionHighlight from '@/components/Containers/Sidebar/VisibleSectionHighlight';
import { useSectionStore } from '@/providers/sidebarProvider';
import { cn } from '@/util/cn';

import type SidebarItem from '@/components/Containers/Sidebar/SidebarItem';
import { useSetTOC } from '@/hooks';

type SidebarGroupProps = {
  groupName: string;
  items: ComponentProps<typeof SidebarItem>[];
  className?: string;
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  className,
}) => {
  const store = useSectionStore();
  const pathname = usePathname();
  const sections = useStore(store, s => s.sections);

  const isActiveGroup = items?.findIndex(item => item.link === pathname) !== -1;

  useSetTOC();

  return (
    <li className={cn('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {groupName}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence>
          {isActiveGroup && (
            <VisibleSectionHighlight group={items} pathname={pathname ?? ''} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={items} pathname={pathname ?? ''} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {items?.map(item => (
            <motion.li key={item.link} layout="position" className="relative">
              <NavLink href={item.link || '#'} active={item.link === pathname}>
                {item.label}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {item.link === pathname && sections.items?.length ? (
                  <Tree tree={sections} />
                ) : null}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SidebarGroup;
