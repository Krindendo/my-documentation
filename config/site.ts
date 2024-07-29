import { BASE_URL } from '@/config/constants';
import { SiteConfig } from 'types';

export const siteConfig: SiteConfig = {
  title: 'My Documentation',
  description:
    'The site is made to serve as documentation that will facilitate programming. It contains examples and definitions of the various functions that are used.',
  favicon: '/static/images/favicons/favicon.png',
  lightAccentColor: '#333',
  darkAccentColor: '#333',
  featuredImage: '',
  url: BASE_URL,
  og: {
    imgType: 'png',
    imgHeight: 530,
    imgWidth: 1200,
  },
  twitter: {
    username: '',
    card: 'article',
    img: '/static/images/logo-hexagon-card.png',
    imgAlt: 'The Nextjs mdx Logo',
  },
};
