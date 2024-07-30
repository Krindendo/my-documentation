import type { FC } from 'react';

import { NavBar } from '@/components/Containers/NavBar';
import { topNavigation } from '@/config/navigation';

const WithNavBar: FC = () => {
  return (
    <div className="w-full">
      <NavBar navItems={Object.values(topNavigation)} />
    </div>
  );
};

export default WithNavBar;
