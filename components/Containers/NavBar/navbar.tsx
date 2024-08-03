'use client';

// import { Menu, X as XMark } from 'lucide-react';
// import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { forwardRef, type HTMLAttributeAnchorTarget } from 'react';

import { SearchButton } from '@/components/Common/Search';
import { ThemeToggle } from '@/components/Common/ThemeToggle';
import { LogoGitHub } from '@/components/Icons/Social/github';
import { Button } from '@/components/ui/button';
import { cn } from '@/util/cn';
import SidebarMobile from '@/components/Containers/SidebarMobile';

// const navInteractionIcons = {
//   show: <Menu />,
//   close: <XMark />,
// };

interface NavbarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  navItems: {
    label: string;
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    disabled?: boolean;
  }[];
}

const NavBar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ navItems, className, ...props }, ref) => {
    //const [isMenuOpen, setIsMenuOpen] = useState(false);

    const segment = useSelectedLayoutSegment();
    //const { isOpen: mobileNavIsOpen } = useMobileNavigationStore();

    const { scrollY } = useScroll();
    const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
    const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

    return (
      <motion.nav
        ref={ref}
        className={cn(
          className,
          'z-50 flex h-14 items-center justify-between gap-12 bg-white/[var(--bg-opacity-light)] px-4 backdrop-blur-sm transition dark:bg-zinc-900/[var(--bg-opacity-dark)] dark:backdrop-blur'
        )}
        style={
          {
            '--bg-opacity-light': bgOpacityLight,
            '--bg-opacity-dark': bgOpacityDark,
          } as React.CSSProperties
        }
      >
        <SidebarMobile />
        <div className="absolute inset-x-0 top-full h-px bg-zinc-900/10 transition dark:bg-white/10" />
        <div className="hidden flex-1 flex-col peer-checked:flex md:flex md:flex-row md:items-center">
          <div className="lg:block lg:max-w-sm lg:flex-auto">
            <SearchButton />
          </div>
          <div className="ml-auto flex items-center gap-5">
            <ul role="list" className="flex items-center gap-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    key={index}
                    href={item.disabled ? '#' : item.link}
                    className={cn(
                      'text-sm leading-5 transition hover:text-foreground/80',
                      item.link.startsWith(`/${segment}`)
                        ? 'text-foreground'
                        : 'text-foreground/60',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden h-5 w-px bg-zinc-900/10 dark:bg-white/10 md:block" />
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Button variant="ghost" className="w-9 px-0" asChild>
                <a
                  href="https://github.com/Krindendo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LogoGitHub className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }
);

NavBar.displayName = 'NavBar';

export { NavBar };

/* <div className="md:px-0; flex h-16 shrink-0 items-center border-b border-neutral-200 px-4 dark:border-neutral-900 md:flex md:h-full md:items-center md:border-0">
        <Link className="h-[30px] flex-1" href="/" aria-label="Home">
          <Earth className="h-6 w-20" />
        </Link>

        <Label.Root
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="block cursor-pointer md:hidden"
          htmlFor="sidebarItemToggler"
        >
          {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
        </Label.Root>
      </div> */
