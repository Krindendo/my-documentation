import type { Meta, StoryObj } from "@storybook/react"

import { Pagination } from "@/components/pagination"

const meta = {
  title: "components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => <Pagination {...args} />,
  args: { currentPage: 1, perPage: 2, maximumLength: 9, maximumPages: 5 },
}
export const FisrtPage: Story = {
  render: (args) => <Pagination {...args} />,
  args: { currentPage: 1, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const SecoundPage: Story = {
  render: (args) => <Pagination {...args} />,
  args: { currentPage: 2, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const SecoundFromTheLastPage: Story = {
  render: (args) => <Pagination {...args} />,
  args: { currentPage: 9, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const LastPage: Story = {
  render: (args) => <Pagination {...args} />,
  args: { currentPage: 10, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
