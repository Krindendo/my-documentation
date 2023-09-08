import { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Input> = {
  title: "ui/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Input>

export const Base: Story = {
  render: (args) => <Input {...args} />,
  args: { type: "email", placeholder: "Enter your email address..." },
}

export const Disabled: Story = {
  render: (args) => <Input disabled {...args} />,
  args: { ...Base.args },
}
export const Error: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input
        {...args}
        id="email-2"
        className="border-red-500 focus-visible:ring-red-500"
      />
      <p className="text-sm text-red-400">Invalid email address</p>
    </div>
  ),
  args: { ...Base.args },
}
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
  args: { ...Base.args },
}
export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p className="text-sm text-slate-500">Enter your email address.</p>
    </div>
  ),
  args: { ...Base.args },
}
export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <Input {...args} />
      <Button type="submit" className="w-full">
        Continue with email
      </Button>
    </div>
  ),
  args: { ...Base.args },
}
