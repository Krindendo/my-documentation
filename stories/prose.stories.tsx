import type { Meta, StoryObj } from "@storybook/react"

import { Prose } from "@/components/prose"

const meta = {
  title: "components/Prose",
  component: Prose,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => (
    <>
      <Prose className="mb-4" {...args}>
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </Prose>
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
        iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to
        a series of rabies cases springing up around the country.
      </p>
    </>
  ),
  args: {},
}

export const Article: Story = {
  render: (args) => (
    <Prose {...args}>
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
        iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to
        a series of rabies cases springing up around the country.
      </p>
    </Prose>
  ),
  args: { as: "article" },
}
