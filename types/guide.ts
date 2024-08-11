export type GuidePreviewType = 'announcements' | 'release' | 'vulnerability';

export interface GuidePost {
  title: string;
  description: string;
  date: Date;
  categories: string[];
  tags: string[];
  published: boolean;
  slug: string;
}

export interface GuideData {
  posts: GuidePost[];
  categories: Array<string>;
}

export interface GuidePagination {
  next: number | null;
  prev: number | null;
  pages: number;
  total: number;
}

export interface GuidePostsRSC {
  posts: GuidePost[];
  pagination: GuidePagination;
}
