import { SiteConfig } from "types"
import { getAbsoluteUrl, getBaseUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "My Wiki",
  description:
    "The site is made to serve as documentation that will facilitate programming. It contains examples and definitions of the various functions that are used.",
  url: getBaseUrl(),
  ogImage: getAbsoluteUrl("/og.jpg"),
  links: {
    github: "https://github.com/Krindendo/my-documentation",
  },
}
