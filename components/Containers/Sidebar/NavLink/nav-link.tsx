import Link from 'next/link';
import type { FC } from 'react';

import { cn } from '@/util/cn';

interface NavLinkProps {
  href: string;
  active?: boolean;
  isAnchorLink?: boolean;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  active,
  isAnchorLink = false,
  children,
}) => {
  //const { close } = useMobileNavigationStore();
  //const isInsideMobileNavigation = useIsInsideMobileNavigation();

  function handleChangeRoute() {
    // if (isInsideMobileNavigation) {
    //   //close();
    // }
  }

  return (
    <Link
      href={href}
      onClick={handleChangeRoute}
      aria-current={active ? 'page' : undefined}
      prefetch={true}
      className={cn(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      )}
    >
      <span className="truncate">{children}</span>
    </Link>
  );
};

export { NavLink };
