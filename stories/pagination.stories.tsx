import type { Meta, StoryObj } from "@storybook/react"

import { GuidesPagination } from "@/components/guides-pagination"

const meta = {
  title: "components/GuidesPagination",
  component: GuidesPagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GuidesPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => <GuidesPagination {...args} />,
  args: { currentPage: 1, perPage: 2, maximumLength: 9, maximumPages: 5 },
}
export const FisrtPage: Story = {
  render: (args) => <GuidesPagination {...args} />,
  args: { currentPage: 1, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const SecoundPage: Story = {
  render: (args) => <GuidesPagination {...args} />,
  args: { currentPage: 2, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const SecoundFromTheLastPage: Story = {
  render: (args) => <GuidesPagination {...args} />,
  args: { currentPage: 9, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
export const LastPage: Story = {
  render: (args) => <GuidesPagination {...args} />,
  args: { currentPage: 10, perPage: 2, maximumLength: 19, maximumPages: 10 },
}
