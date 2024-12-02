import Link from 'next/link';
import type { FC } from 'react';

import { cn } from '@/util/cn';

interface MdxCardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  disabled?: boolean;
}

const MdxCard: FC<MdxCardProps> = ({
  href,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg',
        disabled && 'opacity-60',
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>
      {href && (
        <Link href={disabled ? '#' : href} className="absolute inset-0" prefetch={true}>
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  );
};

export { MdxCard };
