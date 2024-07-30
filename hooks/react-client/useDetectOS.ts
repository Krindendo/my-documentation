'use client';

import { useEffect, useState } from 'react';

import type { UserOS } from '@/types/userOS';
import { detectOS } from '@/util/detectOS';

type UserOSState = {
  os: UserOS;
};

const useDetectOS = () => {
  const [userOSState, setUserOSState] = useState<UserOSState>({
    os: 'LOADING',
  });

  useEffect(() => {
    setUserOSState({
      os: detectOS(),
    });
  }, []);

  return userOSState;
};

export default useDetectOS;
