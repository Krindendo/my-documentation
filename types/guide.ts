export type GuidePreviewType = 'announcements' | 'release' | 'vulnerability';

export interface GuidePost {
  title: string;
  author: string;
  username: string;
  date: Date;
  categories: Array<string>;
  slug: string;
}

export interface GuideData {
  posts: Array<GuidePost>;
  categories: Array<string>;
}

export interface GuidePagination {
  next: number | null;
  prev: number | null;
  pages: number;
  total: number;
}

export interface GuidePostsRSC {
  posts: Array<GuidePost>;
  pagination: GuidePagination;
}
