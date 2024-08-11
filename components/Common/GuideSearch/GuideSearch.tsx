'use client';

import * as React from 'react';

import { cn } from '@/util/cn';

import { Input, InputProps } from '@/components/ui/input';
import { Icons } from '@/components/Icons';

interface GuidesSearch extends InputProps {
  isPending: boolean;
}

export function GuidesSearch({ className, isPending, ...props }: GuidesSearch) {
  return (
    <div className="relative">
      <Input
        type="text"
        name="search"
        placeholder="Search for guides"
        className={cn(className)}
        {...props}
      />
      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <Icons.spinner className="-ml-1 mr-3 h-6 w-6 animate-spin text-blue-500 dark:text-blue-600" />
        </div>
      )}
    </div>
  );
}
