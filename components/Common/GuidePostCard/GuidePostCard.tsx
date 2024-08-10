import type { FC } from 'react';

import FormattedTime from '@/components/Common/FormattedTime';
import Preview from '@/components/Common/Preview';
import Link from '@/components/Link';
import { mapBlogCategoryToPreviewType } from '@/util/guidesUtils';

type GuidePostCardProps = {
  title: string;
  category: string;
  description?: string;
  date?: Date;
  slug?: string;
};

const GuidePostCard: FC<GuidePostCardProps> = ({
  title,
  slug,
  category,
  description,
  date,
}) => {
  const type = mapBlogCategoryToPreviewType(category);

  return (
    <article className={styles.container}>
      <Link href={slug} aria-label={title}>
        <Preview title={title} type={type} />
      </Link>

      <Link href={`/blog/${category}`} className={styles.subtitle}>
        {category}
      </Link>

      <Link href={slug} className={styles.title}>
        {title}
      </Link>

      {description && <p className={styles.description}>{description}</p>}

      <footer className={styles.footer}>
        <div className={styles.author}>
          {date && <FormattedTime date={date} />}
        </div>
      </footer>
    </article>
  );
};

export { BlogPostCard };
