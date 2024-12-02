import type { FC, PropsWithChildren } from 'react';

import { useClientContext } from '@/hooks/react-server';
import DefaultLayout from './Default';
import { DocsPageHeader } from '@/components/Common/DocsPageHeader';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/util/cn';
import { Icons } from '@/components/Icons';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  return (
    <>
      <DefaultLayout>
        <div className="container flex-1">
          <div className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
              <DocsPageHeader
                heading={frontmatter.title ?? ''}
                text={frontmatter.description}
                publishedAt={frontmatter.publishedAt}
                updatedAt={frontmatter.updatedAt}
              />
              <div className="pb-12 pt-8">{children}</div>
              <hr className="my-4" />
              <div className="flex justify-center py-6 lg:py-10">
                <Link
                  href="/guides"
                  prefetch={true}
                  className={cn(buttonVariants({ variant: 'ghost' }))}
                >
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  See all guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default PostLayout;
