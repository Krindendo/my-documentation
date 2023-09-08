import type { Meta, StoryObj } from "@storybook/react"

import { SiteHeader } from "@/components/site-header"

const meta = {
  title: "site/Header",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: () => <SiteHeader />,
  args: {},
}
