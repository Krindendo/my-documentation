import type { FC } from 'react';

import { GuidePostCard } from '@/components/Common/GuidePostCard';

import type { GuidePostsRSC } from '@/types';

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

      {/* <div className="mt-4 border-t border-t-neutral-200 pt-5 dark:border-t-neutral-900 md:mt-8">
        <Pagination
          currentPage={guideData.page}
          pages={mapPaginationPages(
            guideData.category,
            guideData.pagination.pages
          )}
        />
      </div> */}
    </>
  );
};

export default WithGuideCategories;
