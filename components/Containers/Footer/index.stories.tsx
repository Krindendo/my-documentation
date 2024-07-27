import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { Footer } from '@/components/Containers/Footer';

interface Story extends StoryObj<typeof Footer> {}
interface Meta extends MetaObj<typeof Footer> {}

export const Default: Story = {};

export default { component: Footer } as Meta;
