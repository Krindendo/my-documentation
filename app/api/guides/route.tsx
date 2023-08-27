import { NextRequest } from "next/server"
import { allGuides } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import { safeStringToInteger } from "@/lib/utils"

//TODO: Make test for this request

export const runtime = "edge"

export const preferredRegion = ["fra1", "cdg1"]

const PER_PAGE = 20

export async function GET(req: NextRequest) {
  try {
    const keywords = req.nextUrl.searchParams.get("keywords")
    let page = safeStringToInteger(req.nextUrl.searchParams.get("page"))
    if (page <= 0) {
      page = 1
    }

    let guides = allGuides
      .filter((guide) => guide.published)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    if (keywords) {
      guides = guides.filter((guide) =>
        guide.title.toLowerCase().includes(keywords.toLowerCase())
      )
    }

    const guidesLength = guides.length
    const maxPages = Math.ceil(guidesLength / PER_PAGE)

    const startIndex = (page - 1) * PER_PAGE
    const endIndex = startIndex + PER_PAGE
    guides = guides.slice(startIndex, endIndex)

    const response = {
      currentPage: page,
      maximumPages: maxPages,
      guidesPerPage: PER_PAGE,
      guidesLength,
      guides,
    }

    return new Response(JSON.stringify(response))
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
