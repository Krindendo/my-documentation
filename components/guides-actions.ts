import { Guide } from "@/.contentlayer/generated"

import { fetcher, getBaseUrl } from "@/lib/utils"

export interface Guides {
  currentPage: number
  maximumPages: number
  guidesPerPage: number
  guidesLength: number
  guides: Guide[]
}

export const initGuides = {
  currentPage: 0,
  maximumPages: 0,
  guidesPerPage: 0,
  guidesLength: 0,
  guides: [],
} as Guides

export const guidesPreload = async () => {
  void (await getGuides(0, ""))
}

export async function getGuides(selectedPage: number, keywords: string) {
  //TODO: check this

  try {
    const url = new URL("/api/guides", getBaseUrl())
    if (selectedPage) {
      url.searchParams.set("page", selectedPage.toString())
    }
    if (keywords) {
      url.searchParams.set("keywords", keywords)
    }

    const data = await fetcher<Guides>(url.toString())

    if (data.data) {
      return data.data
    }
    return null
  } catch (error) {
    return null
  }
}
