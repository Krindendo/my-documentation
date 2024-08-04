import type { FC, PropsWithChildren } from 'react';

import Preview from '@/components/Common/Preview';
import WithBlogCrossLinks from '@/components/withBlogCrossLinks';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import { useClientContext } from '@/hooks/react-server';
import ContentLayout from '@/layouts/Content';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  return (
    <>
      <WithNavBar />

      <ContentLayout>
        <main className="container">
          <h1>{frontmatter.title}</h1>

          <Preview title={frontmatter.title!} />

          {children}

          <WithBlogCrossLinks />
        </main>

        <WithMetaBar />
      </ContentLayout>

      <WithFooter />
    </>
  );
};

export default PostLayout;
