import { GUIDE_POSTS_PER_PAGE } from '@/config/constants';
import { FC } from 'react';

type Page = { url: string };

export type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  totalPages: number;
};

const PaginationStatus: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  console.log('currentPage', currentPage);
  console.log('GUIDE_POSTS_PER_PAGE', GUIDE_POSTS_PER_PAGE);
  console.log('totalPages', totalPages);
  const minimumArtiklesOnPage = (currentPage - 1) * GUIDE_POSTS_PER_PAGE + 1;
  const probablyMaximumLength =
    (currentPage - 1) * GUIDE_POSTS_PER_PAGE + GUIDE_POSTS_PER_PAGE;
  const maximumArtiklesOnPage =
    probablyMaximumLength > totalPages ? totalPages : probablyMaximumLength;

  return (
    <p className="text-sm">
      Showing <span className="font-medium">{minimumArtiklesOnPage}</span> to{' '}
      <span className="font-medium">{maximumArtiklesOnPage}</span> of{' '}
      <span className="font-medium">{totalPages}</span> results
    </p>
  );
};

export { PaginationStatus };
