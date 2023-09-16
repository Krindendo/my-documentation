import type { Meta, StoryObj } from "@storybook/react"

import { Card } from "@/components/card"

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
    resource: {
      title: "Naslov",
      description: "Opis",
      href: "#",
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
  },
}
