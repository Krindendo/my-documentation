'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import type { ComponentProps, FC } from 'react';

import { Link } from '@/components/Common/Link';

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  allowSubPath?: boolean;
};

const ActiveLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName = 'active',
  allowSubPath = false,
  className,
  href = '',
  ...props
}) => {
  const pathname = usePathname();

  const finalClassName = classNames(className, {
    [activeClassName]: allowSubPath
      ? // When using allowSubPath we want only to check if
        // the current pathname starts with the utmost upper level
        // of an href (e.g. /docs/...)
        pathname?.startsWith(`/${href.toString().split('/')[1]}`)
      : href.toString() === pathname,
  });

  return (
    <Link className={finalClassName} href={href} prefetch={true} {...props} >
      {children}
    </Link>
  );
};

export { ActiveLink };
