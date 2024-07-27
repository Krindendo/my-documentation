import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavBar from '@/components/Containers/NavBar';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'Docs',
        link: '/docs',
      },
    ],
  },
};

export default { component: NavBar } as Meta;
