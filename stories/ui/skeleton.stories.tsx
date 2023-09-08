import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { Skeleton } from "@/components/ui/skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "ui/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Base: Story = {
  render: (args) => <Skeleton className="h-5 w-24" />,
  args: {},
}

export const Card: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
  args: {},
}
