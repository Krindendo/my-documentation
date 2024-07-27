import { ArrowUpRight } from 'lucide-react';
import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

import { ActiveLink } from '@/components/Common/ActiveLink';
import { cn } from '@/util/cn';

import styles from './index.module.css';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href = '',
  type = 'nav',
  children,
  className,
  target,
}) => (
  <ActiveLink
    href={href}
    className={cn(styles.navItem, styles[type], className)}
    activeClassName={styles.active}
    allowSubPath={href.startsWith('/')}
    target={target}
  >
    <span className={styles.label}>{children}</span>

    {((type === 'nav' && href.startsWith('http')) || target === '_blank') && (
      <ArrowUpRight className={styles.icon} />
    )}
  </ActiveLink>
);

export { NavItem };
