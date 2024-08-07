'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

import { THEME_STORAGE_KEY } from '@/config/constants';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="system"
    storageKey={THEME_STORAGE_KEY}
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);
