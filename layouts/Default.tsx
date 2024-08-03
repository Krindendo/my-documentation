import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import { SectionProvider } from '@/providers/sidebarProvider';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <SectionProvider>
    <div className="flex min-h-screen flex-row">
      <div className="scrollbar hidden lg:pointer-events-auto lg:sticky lg:left-0 lg:top-0 lg:block lg:h-screen lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
        <WithSidebar />
      </div>

      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-40 flex flex-row">
          <WithNavBar />
        </header>

        <div className="relative flex-1 px-4 pb-6 pt-1 md:pt-14">
          <main className="flex flex-col py-16">{children}</main>
        </div>

        <WithFooter />
      </div>
    </div>
  </SectionProvider>
);

export default DefaultLayout;
