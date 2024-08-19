import type { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
} from '@/components/ui/pagination';

import { useGetPageElements } from './useGetPageElements';

type Page = { url: string };

export type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Page[];
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const PaginationGroup: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount
  );

  return (
    <Pagination className="flex-1 justify-end">
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationFirst
              href={{
                pathname: 'guides',
                query: { page: 0 },
              }}
            />
          </PaginationItem>
        ) : null}

        <PaginationItem currentPage={currentPage} maximumPages={maximumPages} />

        {currentPage < maximumPages ? (
          <PaginationItem>
            <PaginationLast
              href={{
                pathname: 'guides',
                query: { page: maximumPages },
              }}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationGroup };
