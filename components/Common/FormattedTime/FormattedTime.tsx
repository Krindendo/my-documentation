import { DEFAULT_DATE_FORMAT } from '@/config/constants';
import { cn } from '@/util/cn';
import type { FC } from 'react';

type FormattedTimeProps = {
  date: string | Date;
  className?: string;
};

const FormattedTime: FC<FormattedTimeProps> = ({ date, className }) => {
  const dateObject = new Date(date);

  return (
    <time className={cn('', className)} dateTime={dateObject.toISOString()}>
      {new Intl.DateTimeFormat('en-US', DEFAULT_DATE_FORMAT).format(dateObject)}
    </time>
  );
};

export { FormattedTime };
