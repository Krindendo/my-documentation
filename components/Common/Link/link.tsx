import LocalizedLink from 'next/link';
import type { FC, ComponentProps } from 'react';

interface LinkProps extends Omit<ComponentProps<typeof LocalizedLink>, 'href'> {
  href?: string;
}

const Link: FC<LinkProps> = ({ children, href, ...props }) => {
  if (!href || href.toString().startsWith('http')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={href?.toString()} {...props}>
      {children}
    </LocalizedLink>
  );
};

export { Link };
