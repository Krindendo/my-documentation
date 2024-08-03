import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { Tabs } from '@/components/Common/Tabs';

import styles from './index.module.css';

interface CodeTabsProps
  extends Pick<ComponentProps<typeof Tabs>, 'tabs' | 'defaultValue'> {
  linkUrl?: string;
  linkText?: string;
}

const CodeTabs: FC<PropsWithChildren<CodeTabsProps>> = ({
  children,
  linkUrl,
  linkText,
  ...props
}) => (
  <Tabs
    {...props}
    className={styles.root}
    addons={
      linkUrl &&
      linkText && (
        <Link className={styles.link} href={linkUrl}>
          {linkText}
          <ArrowUpRight className={styles.icon} />
        </Link>
      )
    }
  >
    {children}
  </Tabs>
);

export { CodeTabs };
