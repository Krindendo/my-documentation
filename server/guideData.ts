import generateGuideData from '@/server/generators/guidesData.mjs';
import { GUIDE_POSTS_PER_PAGE } from '@/config/constants';
import type { GuideData, GuidePostsRSC } from '@/types';

const { categories, posts } = (await generateGuideData()) as GuideData;

export const provideGuideCategories = () => categories;

const provideGuidePosts = (category: string): GuidePostsRSC => {
  const categoryPosts = posts
    .filter(post => post.slug !== '/guides/uncategorized/index')
    .filter(post => post.published)
    .filter(post => post.categories.includes(category))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Total amount of possible pages given the amount of blog posts
  const total = categoryPosts.length / GUIDE_POSTS_PER_PAGE;

  return {
    posts: categoryPosts,
    pagination: {
      prev: null,
      next: null,
      // In case the division results on a remainder we need
      // to have an extra page containing the remainder entries
      pages: Math.floor(total % 1 === 0 ? total : total + 1),
      total: categoryPosts.length,
    },
  };
};

const providePaginatedGuidePosts = (
  category: string,
  page: number
): GuidePostsRSC => {
  const { posts, pagination } = provideGuidePosts(category);

  // This autocorrects if invalid numbers are given to only allow
  // actual valid numbers to be provided
  const actualPage = page < 1 ? 1 : page;

  // If the page is within the allowed range then we calculate
  // the pagination of Blog Posts for a given current page "page"
  if (actualPage <= pagination.pages) {
    return {
      posts: posts.slice(
        GUIDE_POSTS_PER_PAGE * (actualPage - 1),
        GUIDE_POSTS_PER_PAGE * actualPage
      ),
      pagination: {
        prev: actualPage > 1 ? actualPage - 1 : null,
        next: actualPage < pagination.pages ? actualPage + 1 : null,
        pages: pagination.pages,
        total: posts.length,
      },
    };
  }

  return {
    posts: [],
    pagination: {
      prev: pagination.total,
      next: null,
      pages: pagination.pages,
      total: posts.length,
    },
  };
};

const getGuideData = async (
  category: string,
  page: number = 1,
  keywords?: string
): Promise<GuidePostsRSC> => {
  const data =
    page >= 1
      ? // This allows us to blindly get all guides posts from a given category
        // if the page number is 0 or something smaller than 1
        providePaginatedGuidePosts(category, page)
      : provideGuidePosts(category);

  return data;
};

export { getGuideData, providePaginatedGuidePosts, provideGuidePosts };
