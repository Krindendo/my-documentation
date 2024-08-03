'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, FC } from 'react';

import { Select } from '@/components/Common/Select';

type WithSidebarSelectProps = Pick<
  ComponentProps<typeof Select>,
  'values' | 'defaultValue' | 'label'
>;

const WithRouterSelect: FC<WithSidebarSelectProps> = ({
  values,
  label,
  defaultValue,
}) => {
  const { push } = useRouter();

  return (
    <Select
      label={label}
      values={values}
      defaultValue={defaultValue}
      onChange={value => push(value)}
    />
  );
};

export default WithRouterSelect;
