import { SiteConfig } from "types"
import { absoluteUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "Build Aplications with Confidence",
  description:
    "The site is made to serve as documentation that will facilitate programming. It contains examples and definitions of the various functions that are used.",
  url: absoluteUrl(""),
  ogImage: "",
  links: {
    github: "https://github.com/Krindendo/my-documentation",
  },
}
