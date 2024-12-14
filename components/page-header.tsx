interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export function PageHeader({
  heading,
  text,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={className} {...props}>
      <div className="space-y-4">
        <h1
          className="inline-block font-heading text-4xl lg:text-5xl"
          id="_top"
        >
          {heading}
        </h1>
        {text && <p className="text-xl text-muted-foreground">{text}</p>}
      </div>
      <hr className="my-4" />
    </div>
  );
}
