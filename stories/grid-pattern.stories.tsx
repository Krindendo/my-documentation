import type { Meta, StoryObj } from "@storybook/react"

import { GridPattern } from "@/components/grid-pattern"

const meta = {
  title: "components/GridPattern",
  component: GridPattern,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GridPattern>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => (
    <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
      <GridPattern
        className="dark:fill-white/1 absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:stroke-white/5"
        {...args}
      />
    </div>
  ),
  args: {
    width: 72,
    height: 56,
    x: "50%",
    y: 16,
    squares: [
      [0, 1],
      [1, 3],
    ],
  },
}
