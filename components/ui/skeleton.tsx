import { cn } from '@/util/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
