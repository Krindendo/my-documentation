import type { ComponentProps, FC } from 'react';

import { BlogPostCard } from '@/components/Common/GuidePostCard';

import type { GuidePostsRSC } from '@/types';

type WithBlogCategoriesProps = {
  guideData: GuidePostsRSC & { category: string; page: number };
};

const mapPaginationPages = (category: string, pages: number) =>
  [...Array(pages).keys()].map(page => ({
    url: `/blog/${category}/page/${page + 1}`,
  }));

const WithBlogCategories: FC<WithBlogCategoriesProps> = ({ guideData }) => {
  return (
    <>
      <div className="max-xs:grid-cols-[1fr] grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] [grid-gap:theme(spacing.12)_theme(spacing.8)]">
        {guideData.posts.map(post => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
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

export default WithBlogCategories;
