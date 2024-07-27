import type { Heading } from '@vcarl/remark-headings';

interface Item {
  depth?: number;
  title: string;
  url: string;
  items?: Item[];
}

export interface TableOfContents {
  items: Item[];
}

function transformHeadingsToTOC(headings: Heading[]): TableOfContents {
  const toc: TableOfContents = { items: [] };
  const stack: Item[] = [];

  for (const heading of headings) {
    const newItem: Item = {
      title: heading.value,
      url: `#${heading.data.id}`,
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.items.push(newItem);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.items) {
        parent.items = [];
      }
      parent.items.push(newItem);
    }

    newItem.depth = heading.depth; // Temporary property for managing depth in the stack
    stack.push(newItem);
  }

  // Remove temporary depth property
  const removeDepthProperty = (item: Item) => {
    delete item.depth;
    if (item.items) {
      item.items.forEach(removeDepthProperty);
    }
  };

  toc.items.forEach(removeDepthProperty);

  return toc;
}

export { transformHeadingsToTOC };

/*

items: [{
url: "#usestate", 
title: "useState", 
items: [{
    url: '#set-function', 
    title: 'Set function'
    }, {
    url: '#example-update-value-in-current-render', 
    title: 'Example: update value in current render'
    }]
}]

*/
