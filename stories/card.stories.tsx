import type { Meta, StoryObj } from "@storybook/react"

import { Card, CardDescription, CardTitle } from "@/components/card"
import { Icons } from "@/components/icons"

const meta = {
  title: "components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => (
    <div className="w-96">
      <Card {...args} />
    </div>
  ),
  args: {
    children: (
      <>
        <CardTitle href="#">Javascript</CardTitle>
        <CardDescription>
          Scripting language for web development, but it is used everywhere
        </CardDescription>
      </>
    ),
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="w-96">
      <Card {...args} />
    </div>
  ),
  args: {
    ...Main.args,
    children: (
      <>
        <Icons.javascript />
        <CardTitle href="#">Javascript</CardTitle>
        <CardDescription>
          Scripting language for web development, but it is used everywhere
        </CardDescription>
      </>
    ),
  },
}
export const Small: Story = {
  render: (args) => (
    <div className="w-full max-w-xs">
      <Card {...args} />
    </div>
  ),
  args: {
    ...WithIcon.args,
  },
}
export const Multiple: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        {...args}
        pattern={{
          y: 0,
          squares: [
            [0, -1],
            [4, 3],
          ],
        }}
      />
      <Card
        {...args}
        pattern={{
          y: 16,
          squares: [
            [0, 1],
            [1, 3],
          ],
        }}
      />
      <Card
        {...args}
        pattern={{
          y: -6,
          squares: [
            [-1, 2],
            [1, 3],
          ],
        }}
      />
      <Card
        {...args}
        pattern={{
          y: 32,
          squares: [
            [0, 2],
            [1, 4],
          ],
        }}
      />
      <Card
        {...args}
        pattern={{
          y: 22,
          squares: [[0, 1]],
        }}
      />
    </div>
  ),
  args: {
    ...WithIcon.args,
  },
}
