import { FC } from 'react';

type Page = { url: string };

type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Page[];
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({}) => {
  return <div></div>;
};

export { Pagination };
