import { Meta, StoryObj } from "@storybook/react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Label> = {
  title: "ui/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Label>

export const Base: Story = {
  render: (args) => (
    <Label {...args} htmlFor="email">
      Accept terms and conditions
    </Label>
  ),
  args: {},
}

export const WithInput: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </div>
    </div>
  ),
  args: {},
}
