import type { FC, SVGProps } from 'react';

import { NavItem } from '@/components/Containers/NavBar/NavItem';
import { LogoGitHub } from '@/components/Icons/Social/github';
import { LogoLinkedIn } from '@/components/Icons/Social/linkedIn';
import { siteNavigation } from '@/next.json.mjs';

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: LogoGitHub,
  linkedin: LogoLinkedIn,
};

const Footer: FC = () => {
  return (
    <footer className="gap-6border-t flex flex-col items-center border-neutral-200 bg-white px-8 py-4 dark:border-neutral-900 dark:bg-neutral-950 md:flex-row md:justify-between md:py-5">
      <div className="flex flex-wrap content-start items-center justify-center gap-1 self-stretch">
        {siteNavigation.footerLinks.slice(0, -1).map(item => (
          <NavItem type="footer" href={item.link} key={item.link}>
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {siteNavigation.socialLinks.map(link => {
          const SocialIcon = footerSocialIcons[link.icon];

          return (
            <NavItem key={link.icon} href={link.link} type="footer">
              <SocialIcon width={20} height={20} aria-label={link.link} />
            </NavItem>
          );
        })}
      </div>
    </footer>
  );
};

export { Footer };
