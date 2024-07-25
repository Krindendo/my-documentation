"use strict"

import { Button } from "@/components/ui/Button"
import MDXCodeBox from "@/components/MDX/CodeBox"
import MDXCodeTabs from "@/components/MDX/CodeTabs"
import MDXImage from "@/components/MDX/Image"

import Callout from "./components/Common/Callout"
import { Card, CardDescription, CardTitle } from "./components/Common/Card"
import MdxCard from "./components/Common/MdxCard"
import ReactLogo from "./components/Icons/Languages/React"
import Link from "./components/Link"
import { cn } from "./util/cn"

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button,
  //
  Card: {
    //
    Box: Card,
    //
    Title: CardTitle,
    //
    Description: CardDescription,
  },
  MdxCard,
  Icons: {
    React: ReactLogo,
  },
  Callout,
}

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
  // Renders an Image Component for `img` tags
  img: MDXImage,
  // Renders a Link Component for `a` tags
  a: ({ className, ...props }) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn(className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
}
