import type { FC } from 'react';

import Link from '@/components/Link';

export type PaginationListItemProps = {
  url: string;
  pageNumber: number;
  // One-based number of the current page
  currentPage: number;
  totalPages: number;
};

const PaginationListItem: FC<PaginationListItemProps> = ({
  url,
  pageNumber,
  currentPage,
  totalPages,
}) => {
  return (
    <li key={pageNumber} aria-setsize={totalPages} aria-posinset={pageNumber}>
      <Link
        href={url}
        aria-label={`page ${pageNumber}`}
        {...(pageNumber === currentPage && { 'aria-current': 'page' })}
      >
        <span>{pageNumber}</span>
      </Link>
    </li>
  );
};

export default PaginationListItem;
