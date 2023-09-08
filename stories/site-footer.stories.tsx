import type { Meta, StoryObj } from "@storybook/react"

import { SiteFooter } from "@/components/site-footer"

const meta = {
  title: "site/Footer",
  component: SiteFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: () => <SiteFooter />,
  args: {},
}
