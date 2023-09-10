import type { Meta, StoryObj } from "@storybook/react"
import { Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    variant: "default",
    size: "default",
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {},
}
export const Secondary: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: "secondary",
  },
}
export const Destructive: Story = {
  render: (args) => <Button {...args}>Remove</Button>,
  args: {
    variant: "destructive",
  },
}
export const Outline: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: "outline",
  },
}
export const Ghost: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: "ghost",
  },
}
export const Link: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: "link",
  },
}
export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Button
    </Button>
  ),
  args: {
    variant: "outline",
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    variant: "secondary",
  },
}

export const Large: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    children: "Button",
    size: "lg",
  },
}
export const Small: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    children: "Button",
    size: "sm",
  },
}
