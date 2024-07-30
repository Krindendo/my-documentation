import type { HTMLAttributeAnchorTarget } from 'react';

import { topNavigation, sideNavigation } from '@/config/navigation';
import type { NavigationEntry, NavigationKeys } from '@/types';

type Context = Record<string, string>;
type Navigation = Record<string, NavigationEntry>;

interface MappedNavigationEntry {
  items: [string, MappedNavigationEntry][];
  label: string;
  link: string;
  target?: HTMLAttributeAnchorTarget | undefined;
}

// Provides Context replacement for variables within the Link. This is also something that is not going
// to happen in the future with `nodejs/nodejs.dev` codebase
const replaceLinkWithContext = (link: string, context?: string) =>
  Object.entries(context || {}).reduce(
    (finalLink, [find, replace]) =>
      finalLink.replace(
        `{${find}}`,
        typeof replace === 'string' ? replace : ''
      ),
    link
  );

const useSiteNavigation = () => {
  const mapNavigationEntries = (entries: Navigation, context: Context = {}) => {
    return Object.entries(entries).map(
      ([key, { label = '', link, items, target }]): [
        string,
        MappedNavigationEntry,
      ] => [
        key,
        {
          target,
          label: label,
          link: link ? replaceLinkWithContext(link, context[key]) : '',
          items: items ? mapNavigationEntries(items, context) : [],
        },
      ]
    );
  };

  const getSideNavigation = (keys: NavigationKeys[], context: Context = {}) => {
    const navigationEntries: Navigation = keys.reduce(
      (acc, key) => ({ ...acc, [key]: sideNavigation[key] }),
      {}
    );

    return mapNavigationEntries(navigationEntries, context);
  };

  const navigationItems = mapNavigationEntries(topNavigation);

  return { getSideNavigation, navigationItems };
};

export default useSiteNavigation;
