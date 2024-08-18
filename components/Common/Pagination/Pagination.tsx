import { FC } from 'react';
import { useGetPageElements } from './useGetPageElements';
import { cn } from '@/util/cn';

type Page = { url: string };

export type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Page[];
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({
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
    <div
      className={cn(
        'flex items-center justify-between rounded bg-white px-4 py-3 dark:bg-transparent sm:px-6',
        className
      )}
    >
      <div className="hidden gap-4 sm:flex sm:w-full sm:items-center sm:justify-between">
        <p className="text-sm">
          Showing <span className="font-medium">{minimumArtiklesOnPage}</span>{' '}
          to <span className="font-medium">{maximumArtiklesOnPage}</span> of{' '}
          <span className="font-medium">{maximumLength}</span> results
        </p>
        <PaginationGroup
          currentPage={currentPage}
          maximumPages={maximumPages}
        />
      </div>
    </div>
  );
};

export { Pagination };
