import type { Layouts } from './layouts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FrontMatter extends Record<string, any> {
  layout?: Layouts;
  title?: string;
  labels?: Record<string, string>;
  publishedAt: string;
}

export interface DocsFrontMatter extends FrontMatter {}

export interface GuidesFrontMatter extends FrontMatter {
  published: boolean;
  updatedAt?: string;
}
