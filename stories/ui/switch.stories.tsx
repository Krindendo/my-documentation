import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const meta: Meta<typeof Switch> = {
  title: "ui/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Switch>

export const Base: Story = {
  render: (args) => <Switch />,
  args: {},
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Sleep Mode</Label>
    </div>
  ),
  args: {},
}
