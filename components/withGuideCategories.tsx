import type { FC } from 'react';

import { GuidePostCard } from '@/components/Common/GuidePostCard';
import type { GuidePostsRSC } from '@/types';

// import { PaginationGroup } from './Common/Pagination';
import { PaginationStatus } from './Common/PaginationStatus';

type WithBlogCategoriesProps = {
  guideData: GuidePostsRSC & { category: string; page: number };
};

const mapPaginationPages = (category: string, pages: number) =>
  [...Array(pages).keys()].map(page => ({
    url: `/guides/${category}/page/${page + 1}`,
  }));

const WithGuideCategories: FC<WithBlogCategoriesProps> = ({ guideData }) => {
  return (
    <>
      <div className="max-xs:grid-cols-[1fr] grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] gap-6 ">
        {guideData.posts.map(post => (
          <GuidePostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            category={post.categories[0]}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>

      <div className="flex items-center justify-between rounded bg-white px-4 py-3 dark:bg-transparent sm:px-6">
        <div className="hidden gap-4 sm:flex sm:w-full sm:items-center sm:justify-between">
          <PaginationStatus
            currentPage={guideData.page}
            totalPages={guideData.posts.length}
          />
        </div>
        {/* <PaginationGroup
          currentPage={guideData.page}
          pages={mapPaginationPages(
            guideData.category,
            guideData.pagination.pages
          )}
        /> */}
      </div>
    </>
  );
};

export default WithGuideCategories;
