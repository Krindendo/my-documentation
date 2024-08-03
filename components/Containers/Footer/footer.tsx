import type { FC, SVGProps } from 'react';

import { NavItem } from '@/components/Containers/NavBar/NavItem';
import { LogoGitHub } from '@/components/Icons/Social/github';
import { LogoLinkedIn } from '@/components/Icons/Social/linkedIn';
import { socialLinks, footerLinks } from '@/config/navigation';

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: LogoGitHub,
  linkedin: LogoLinkedIn,
};

const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-zinc-900/10 px-8 py-4 dark:border-white/10 md:flex-row md:justify-between md:py-5">
      <div className="flex flex-wrap content-start items-center justify-center gap-1 self-stretch">
        {footerLinks.slice(0, -1).map(item => (
          <NavItem type="footer" href={item.link} key={item.link}>
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {socialLinks.map(link => {
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
