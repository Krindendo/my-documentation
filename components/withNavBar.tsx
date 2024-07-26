import type { FC } from 'react';

import NavBar from '@/components/Containers/NavBar';
import navigation from '@/navigation.json';

const WithNavBar: FC = () => {
  return (
    <div className="w-full">
      <NavBar navItems={Object.values(navigation.topNavigation)} />
    </div>
  );
};

export default WithNavBar;
