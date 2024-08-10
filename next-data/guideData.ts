import {
  ENABLE_STATIC_EXPORT,
  IS_DEVELOPMENT,
  NEXT_DATA_URL,
  VERCEL_ENV,
} from '@/config/constants';
import {
  provideGuidePosts,
  providePaginatedGuidePosts,
} from '@/next-data/providers/guideData';
import type { GuidePostsRSC } from '@/types';

// Prevents React from throwing an Error when not able to fulfil a request
// due to missing category or internal processing errors
const parseGuideDataResponse = (data: string): GuidePostsRSC =>
  data.startsWith('{') ? JSON.parse(data) : { posts: [], pagination: {} };

const getGuideData = async (
  category: string,
  page?: number
): Promise<GuidePostsRSC> => {
  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideGuideData` from executing on import
  if (ENABLE_STATIC_EXPORT || (!IS_DEVELOPMENT && !VERCEL_ENV)) {
    return import('@/next-data/providers/guideData').then(
      ({ provideGuidePosts, providePaginatedGuidePosts }) =>
        page
          ? providePaginatedGuidePosts(category, page)
          : provideGuidePosts(category)
    );
  }

  const fetchURL = page
    ? // Provides a conditional fetch URL based on the given function parameters
      `${NEXT_DATA_URL}guides/${category}/${page}`
    : `${NEXT_DATA_URL}guides/${category}/0`;

  // When we're on RSC with Server capabilities we prefer using Next.js Data Fetching
  // as this will load cached data from the server instead of generating data on the fly
  // this is extremely useful for ISR and SSG as it will not generate this data on every request

  const data = await fetch(fetchURL);
  console.log('data', data);
  const text = await data.text();

  return parseGuideDataResponse(text);
};

export { getGuideData };
