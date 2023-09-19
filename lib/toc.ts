// @ts-nocheck
// TODO: Fix this when we turn strict mode on.

import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

function flattenNode(node) {
  const p = []
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join(``)
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node, current): Items {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

const getToc = () => (node, file) => {
  const table = toc(node)
  file.data = getItems(table.map, {})
}

function removeCode(content: string) {
  const contentAndTripleBackticksRegex = /```[\s\S]*?```/g
  const stringWithoutContentAndTripleBackticks = content.replace(
    contentAndTripleBackticksRegex,
    ""
  )
  return stringWithoutContentAndTripleBackticks
}

function removeComponents(content: string) {
  const componentRegex = /<(\w+)[^>]*>[\s\S]*?<\/\1>/g

  function removeNestedComponents(_content) {
    const withoutComponents = _content.replace(componentRegex, "")
    if (withoutComponents !== _content) {
      return removeNestedComponents(withoutComponents)
    }
    return withoutComponents
  }

  const stringWithoutComponents = removeNestedComponents(content)
  return stringWithoutComponents
}

function removeCodeAndComponents(content: string) {
  const contentWithoutCode = removeCode(content)
  const contentWithoutCodeAndComponents = removeComponents(contentWithoutCode)

  return contentWithoutCodeAndComponents
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const strippedContent = removeCodeAndComponents(content)
  const result = await remark().use(getToc).process(strippedContent)
  return result.data
}
