"use strict"

import { siteRedirects } from "./next.json.mjs"

/**
 * These are external redirects that happen before we check dynamic routes and rewrites
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 * @return {Promise<import('next').NextConfig['redirects']>}
 */
const redirects = async () => {
  return siteRedirects.external.map(({ source, destination }) => ({
    source: source.replace("/:locale", "en"),
    // We prevent permanent redirects as in general the redirects are safeguards
    // of legacy or old pages or pages that moved, and in general we don't want permanent redirects
    permanent: false,
    destination,
  }))
}

/**
 * These are rewrites that happen before we check dynamic routes and after we check regular redirects
 * These should be used either for internal or external rewrite rules (like NGINX, for example)
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 * @return {Promise<import('next').NextConfig['rewrites']>}
 */
const rewrites = async () => {
  const mappedRewrites = siteRedirects.internal.map(
    ({ source, destination }) => ({
      source: source.replace("/:locale", "en"),
      destination,
    })
  )

  return { afterFiles: mappedRewrites }
}

export { rewrites, redirects }
