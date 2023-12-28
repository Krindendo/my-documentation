"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ----------------------------- */

export default function Page() {
  return <></>
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.className === "some-class") {
          console.log("node", node)
        }
      })
    }
  })
})

const target = document.querySelector("#nesto")
const options = {
  childList: true,
  subtree: true,
}

observer.observe(target, options)
