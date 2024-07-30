import { motion } from 'framer-motion';
import type { FC } from 'react';

interface ActivePageMarkerProps {
  group: SidebarNavItem;
  pathname: string;
}

const ActivePageMarker: FC<ActivePageMarkerProps> = ({ group, pathname }) => {
  const itemHeight = 28;
  const offset = 4;
  const activePageIndex = group?.findIndex(item => item.link === pathname) ?? 0;
  const top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-sky-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
};

export default ActivePageMarker;
