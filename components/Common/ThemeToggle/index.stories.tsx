import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ThemeToggle from '@/components/Common/ThemeToggle';

interface Story extends StoryObj<typeof ThemeToggle> {}
interface Meta extends MetaObj<typeof ThemeToggle> {}

export const Default: Story = {};

export default { component: ThemeToggle } as Meta;
