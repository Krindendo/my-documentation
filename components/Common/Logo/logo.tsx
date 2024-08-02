import { siteConfig } from '@/config/site';
import { cn } from '@/util/cn';
import { Earth } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" aria-label="Home" className={cn('flex gap-2', className)}>
      <Earth />
      <span className="hidden font-bold sm:inline-block">
        {siteConfig.title}
      </span>
    </Link>
  );
};

export { Logo };
