import { cn } from '@/util/cn';

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  publishedAt?: string;
  updatedAt?: string;
}

const DocsPageHeader = ({
  heading,
  text,
  publishedAt,
  updatedAt,
  className,
  ...props
}: DocsPageHeaderProps) => {
  return (
    <>
      <div className={cn('space-y-4', className)} {...props}>
        <h1
          className="inline-block font-heading text-4xl lg:text-5xl"
          id="_top"
        >
          {heading}
        </h1>
        <div className="flex flex-col space-y-2">
          {text && <p className="mb-2 text-xl text-muted-foreground">{text}</p>}
          {publishedAt && (
            <p className="text-base text-muted-foreground">
              Published: {publishedAt}
            </p>
          )}
          {updatedAt && (
            <p className="text-base text-muted-foreground">
              Updated at: {updatedAt}
            </p>
          )}
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export { DocsPageHeader };
