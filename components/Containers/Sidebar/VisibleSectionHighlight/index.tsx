import { motion, useIsPresent } from 'framer-motion';
import { useMemo, type FC } from 'react';
import { useStore } from 'zustand';

import { useSectionStore } from '@/providers/sidebarProvider';

interface VisibleSectionHighlightProps {
  group: SidebarNavItem;
  pathname: string;
}

const VisibleSectionHighlight: FC<VisibleSectionHighlightProps> = ({
  group,
  pathname,
}) => {
  const store = useSectionStore();
  const sectionIds = useStore(store, s => s.sectionIds);
  const visibleSections = useStore(store, s => s.visibleSections);

  const isPresent = useIsPresent();
  const itemHeight = 28;

  const firstVisibleSectionIndex = useMemo(
    () =>
      Math.max(
        0,
        sectionIds.findIndex(section => section === visibleSections[0])
      ),
    [sectionIds, visibleSections]
  );

  const height = useMemo(
    () =>
      isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight,

    [isPresent, visibleSections, itemHeight]
  );

  const top = useMemo(() => {
    const firstItemIndex =
      group?.findIndex(item => item.link === pathname) ?? 0;
    return firstItemIndex * itemHeight + firstVisibleSectionIndex * itemHeight;
  }, [group, itemHeight, firstVisibleSectionIndex, pathname]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/5 will-change-transform dark:bg-white/5"
      style={{ borderRadius: 8, height, top }}
    />
  );
};
export default VisibleSectionHighlight;
