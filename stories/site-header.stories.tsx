import type { Meta, StoryObj } from "@storybook/react"

import { SiteNavigation } from "@/components/site-navigation"

const meta = {
  title: "site/Header",
  component: SiteNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: () => <SiteNavigation />,
  args: {},
}
