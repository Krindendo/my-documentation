import type { Meta, StoryObj } from "@storybook/react"

import { DashboardTableOfContents } from "@/components/dashboard-table-of-contents"

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

const mockTOC: Items = {
  items: [
    {
      url: "#libraries",
      title: "Libraries",
      items: [
        { url: "#shadcnui", title: "shadcn/ui" },
        { url: "#tailwindcss", title: "tailwindcss" },
        { url: "#react", title: "react" },
        { url: "#react-native", title: "react native" },
        { url: "#nextjs", title: "next.js" },
        { url: "#vercel", title: "vercel" },
      ],
    },
    {
      url: "#lecturers",
      title: "Lecturers",
      items: [
        { url: "#kyle-simpson", title: "Kyle Simpson" },
        { url: "#theo-browne", title: "Theo Browne" },
        { url: "#josh-tried-coding", title: "Josh tried coding" },
        { url: "#brendan-eich", title: "Brendan Eich" },
      ],
    },
  ],
}

const meta = {
  title: "components/DashboardTableOfContents",
  component: DashboardTableOfContents,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DashboardTableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  render: (args) => <DashboardTableOfContents {...args} />,
  args: { toc: mockTOC },
}
