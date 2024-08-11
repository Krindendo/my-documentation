import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '@/client-context';
import { DocsPageHeader } from '@/components/Common/DocsPageHeader';
import { useClientContext } from '@/hooks/react-server';
import { getGuideData } from '@/server/guideData';

import DefaultLayout from './Default';
import WithGuideCategories from '@/components/withGuideCategories';

const getGuidesCategory = async (pathname: string) => {
  // pathname format can either be: /guide/{category}
  // or /guide/{category}/page/{page}
  // hence we attempt to interpolate the full /guide/{category}/page/{page}
  // and in case of course no page argument is provided we define it to 1
  // note that malformed routes can't happen as they are all statically generated
  const [, , category = 'all', , page = 1] = pathname.split('/');

  const { posts, pagination } = await getGuideData(category, Number(page));

  return { category, posts, pagination, page: Number(page) };
};

const GuidesLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { frontmatter } = useClientContext();
  const { pathname } = getClientContext();

  const mapCategoriesToTabs = (categories: string[]) =>
    categories.map(category => ({
      key: category,
      label: category,
      link: `/guides/${category}`,
    }));

  const guideData = await getGuidesCategory(pathname);

  return (
    <DefaultLayout>
      <div className="container flex-1">
        <div className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <DocsPageHeader
              heading={frontmatter.title ?? ''}
              text={frontmatter.description}
            />
            <div className="pb-12 pt-8">
              <WithGuideCategories guideData={guideData} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GuidesLayout;
