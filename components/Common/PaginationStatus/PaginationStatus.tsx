import { FC } from 'react';

type Page = { url: string };

export type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Page[];
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const PaginationStatus: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  return (
    <p className="text-sm">
      Showing <span className="font-medium">{minimumArtiklesOnPage}</span> to{' '}
      <span className="font-medium">{maximumArtiklesOnPage}</span> of{' '}
      <span className="font-medium">{maximumLength}</span> results
    </p>
  );
};

export { PaginationStatus };
