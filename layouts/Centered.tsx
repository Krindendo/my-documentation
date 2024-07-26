import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto]">
    <WithNavBar />

    <div className="flex w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28">
      {children}
    </div>

    <WithFooter />
  </div>
);

export default CenteredLayout;
