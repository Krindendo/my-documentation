import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps extends TabsPrimitive.TabsProps {
  tabs: Tab[];
  addons?: ReactNode;
}

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  tabs,
  addons,
  children,
  ...props
}) => (
  <TabsPrimitive.Root
    {...props}
    className={classNames(styles.tabsRoot, props.className)}
  >
    <TabsPrimitive.List className={styles.tabsList}>
      {tabs.map(tab => (
        <TabsPrimitive.Trigger
          key={tab.key}
          value={tab.key}
          className={styles.tabsTrigger}
        >
          {tab.label}
        </TabsPrimitive.Trigger>
      ))}

      {addons && <div className={styles.addons}>{addons}</div>}
    </TabsPrimitive.List>

    {children}
  </TabsPrimitive.Root>
);

export { Tabs };
