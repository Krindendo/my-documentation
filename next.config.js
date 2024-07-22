//require("./env.mjs")

const { withContentCollections } = require("@content-collections/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withContentCollections(nextConfig)
