import type { ClientSharedServerContext } from '@/types';

export const assignClientContext = <T extends ClientSharedServerContext>(
  props: Partial<T>
) =>
  ({
    frontmatter: props.frontmatter ?? {},
    pathname: props.pathname ?? '',
    headings: props.headings ?? [],
    filename: props.filename ?? '',
  }) as T;