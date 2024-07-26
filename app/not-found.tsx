'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import CenteredLayout from '@/layouts/Centered';

const NotFoundPage: FC = () => {
  return (
    <CenteredLayout>
      <main className="z-10 items-center justify-center">
        <p className="mb-1">404</p>
        <h1 className="special mb-5 text-center">Page could not be found</h1>
        <p className="mb-5 max-w-sm text-center text-lg">
          Sorry, we couldn't find the page you're after!
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

export default NotFoundPage;
