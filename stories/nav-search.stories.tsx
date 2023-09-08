import type { Meta, StoryObj } from "@storybook/react"

import { NavSearch } from "@/components/nav-search"

const meta = {
  title: "components/NavSearch",
  component: NavSearch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NavSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: () => <NavSearch />,
  args: {},
}
