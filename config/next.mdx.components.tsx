'use strict';

import { Callout } from '@/components/Common/Callout';
import { Card, CardTitle, CardDescription } from '@/components/Common/Card';
import { MdxCard } from '@/components/Common/MdxCard';
import { Link } from '@/components/Common/Link';
import { MDXCodeBox } from '@/components/MDX/CodeBox';
import { MDXCodeTabs } from '@/components/MDX/CodeTabs';
import { MDXImage } from '@/components/MDX/Image';
import { Button } from '@/components/ui/button';
import { cn } from '@/util/cn';
import { Icons } from '@/components/Icons';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button,
  //
  Card: {
    //
    Box: Card,
    //
    Title: CardTitle,
    //
    Description: CardDescription,
  },
  MdxCard,
  Icons,
  Callout,
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
  // Renders an Image Component for `img` tags
  img: MDXImage,
  // Renders a Link Component for `a` tags
  a: ({ ...props }) => (
    <Link
      className={cn('font-medium underline underline-offset-4')}
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground')}
      {...props}
    />
  ),
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table {...props} />
    </div>
  ),
  tr: ({ ...props }) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted')} {...props} />
  ),
};
