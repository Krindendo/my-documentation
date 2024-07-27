export interface TwitterConfig {
  username: string;
  card: string;
  img: string;
  imgAlt: string;
}

export interface OGConfig {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  lightAccentColor: string;
  darkAccentColor: string;
  og: OGConfig;
  url: string;
  twitter: TwitterConfig;
}
