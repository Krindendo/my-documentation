import type { Meta, StoryObj } from "@storybook/react"
import { AlertTriangle } from "lucide-react"

import { Callout } from "@/components/callout"

const meta = {
  title: "components/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => (
    <Callout {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Callout>
  ),
  args: {},
}

export const Danger: Story = {
  render: (args) => (
    <Callout {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Callout>
  ),
  args: { type: "danger" },
}

export const Warning: Story = {
  render: (args) => (
    <Callout {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Callout>
  ),
  args: { type: "warning" },
}

export const WithIcon: Story = {
  render: (args) => (
    <Callout {...args} icon={<AlertTriangle />}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Callout>
  ),
  args: {},
}

export const WithClassname: Story = {
  render: (args) => (
    <Callout className="flex gap-4" {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Callout>
  ),
  args: {},
}
