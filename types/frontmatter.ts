import type { Layouts } from './layouts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FrontMatter extends Record<string, any> {
  layout?: Layouts;
  title?: string;
  labels?: Record<string, string>;
  date: string;
}

export interface DocsFrontMatter extends FrontMatter {}

export interface GuidesFrontMatter extends FrontMatter {
  author: string;
  published: boolean;
}
