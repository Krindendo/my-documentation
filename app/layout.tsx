import { Analytics } from '@vercel/analytics/react';
import type { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/layouts/Base';
import { VERCEL_ENV } from '@/next.constants.mjs';
import { CAL_SANS, OPEN_SANS } from '@/next.fonts';
import { ThemeProvider } from '@/providers/themeProvider';
import { cn } from '@/util/cn';

import '@/styles/index.css';

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html
      lang="en"
      className={cn(
        'bg-background font-sans antialiased',
        CAL_SANS.variable,
        OPEN_SANS.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>

        {VERCEL_ENV && (
          <>
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
