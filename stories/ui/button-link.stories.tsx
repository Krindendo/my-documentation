import type { Meta, StoryObj } from "@storybook/react"
import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button-link"

const meta = {
  title: "ui/ButtonLink",
  component: ButtonLink,
  parameters: {
    variant: "default",
    size: "default",
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: { href: "#" },
}
export const Secondary: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    variant: "secondary",
    ...Base.args,
  },
}
export const Outline: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    variant: "outline",
    ...Base.args,
  },
}
export const Ghost: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    variant: "ghost",
    ...Base.args,
  },
}
export const Link: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    variant: "link",
    ...Base.args,
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <ButtonLink {...args}>
      Quickstart <ArrowRight className="ml-1 h-4 w-4" />
    </ButtonLink>
  ),
  args: {
    variant: "secondary",
    ...Base.args,
  },
}

export const Large: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    size: "lg",
    ...Base.args,
  },
}
export const Small: Story = {
  render: (args) => <ButtonLink {...args}>Button</ButtonLink>,
  args: {
    size: "sm",
    ...Base.args,
  },
}
