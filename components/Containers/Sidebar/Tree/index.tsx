import { motion } from 'framer-motion';
import { forwardRef } from 'react';

import NavLink from '@/components/Containers/Sidebar/NavLink';
import { cn } from '@/util/cn';

const SIDEBAR_DEEP_LEVEL = 2;

interface TreeProps {
  tree: TableOfContents;
  level?: number;
}

const Tree = forwardRef<HTMLUListElement, TreeProps>(
  ({ tree, level = 1 }, ref) => {
    if (tree.items?.length === undefined || level > SIDEBAR_DEEP_LEVEL) {
      return null;
    }

    if (level === 1) {
      return (
        <motion.ul
          ref={ref}
          role="list"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15 },
          }}
        >
          {tree.items?.map(section => (
            <li key={section.url}>
              <NavLink href={section.url} isAnchorLink>
                {section.title}
              </NavLink>
              {tree.items?.length ? (
                <Tree tree={section} level={level + 1} />
              ) : null}
            </li>
          ))}
        </motion.ul>
      );
    }

    return (
      <ul className={cn('', { 'pl-4': level !== 1 })}>
        {tree.items?.map(section => (
          <li key={section.url}>
            <NavLink href={section.url} isAnchorLink>
              {section.title}
            </NavLink>
            {tree.items?.length ? (
              <Tree tree={section} level={level + 1} />
            ) : null}
          </li>
        ))}
      </ul>
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;
