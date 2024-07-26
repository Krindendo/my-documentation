'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import CenteredLayout from '@/layouts/Centered';

const GlobalErrorPage: FC<{ error: Error }> = () => {
  return (
    <CenteredLayout>
      <main className="z-10 flex max-w-md items-center justify-center">
        <p className="mb-1">500</p>
        <h1 className="special mb-5 text-center">Internal Server Error</h1>
        <p className="mb-5 max-w-sm text-center text-lg">
          This page has thrown a non-recoverable error.
        </p>
        <Button asChild>
          <Link href="/">
            Back to Home
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default GlobalErrorPage;
