import { SiteNavigation } from '@/types';

const topNavigation: SiteNavigation['topNavigation'] = {
  docs: {
    link: '/docs',
    label: 'Documentation',
  },
  guides: {
    link: '/guides',
    label: 'Guides',
  },
  algorithms: {
    link: '/algorithms',
    label: 'Algorithms',
  },
};

const footerLinks: SiteNavigation['footerLinks'] = [
  {
    link: 'https://openjsf.org/',
    text: 'openJS',
  },
];
const socialLinks: SiteNavigation['socialLinks'] = [
  {
    icon: 'github',
    link: 'https://github.com/Krindendo/my-documentation',
    alt: 'GitHub',
  },
  {
    icon: 'linkedin',
    link: 'https://rs.linkedin.com/in/marko-milo%C5%A1evi%C4%87-934766224',
    alt: 'LinkedIn',
  },
];

const sideNavigation: SiteNavigation['sideNavigation'] = {
  docs: {
    label: 'Docs',
    items: {
      introduction: {
        link: '/docs',
        label: 'Introduction',
      },
    },
  },
  guides: {
    label: 'Guides',
  },
  algorithms: {
    label: 'Algorithms',
  },
};

export { sideNavigation, topNavigation, footerLinks, socialLinks };
