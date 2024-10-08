'use strict';

const ENABLE_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,
  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  images: {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We allow SVGs to be used as images
    dangerouslyAllowSVG: true,
    // We add it to the remote pattern for the static images we use from GitHub
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/nodejs/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'website-assets.oramasearch.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // On static export builds we want the output directory to be "build"
  distDir: ENABLE_STATIC_EXPORT ? 'build' : '.next',
  // On static export builds we want to enable the export feature
  output: ENABLE_STATIC_EXPORT ? 'export' : undefined,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  // Adds custom WebPack configuration to our Next.hs setup
  webpack: function (config) {
    // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
    // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
    // Once Next.js uses Turbopack for their build process we can remove this
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    return config;
  },
  experimental: {
    // Some of our static pages from `getStaticProps` have a lot of data
    // since we pass the fully-compiled MDX page from `MDXRemote` through
    // a page's static props.
    largePageDataBytes: 128 * 100000,
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      '@radix-ui/react-accessible-icon',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      'tailwindcss',
    ],
    // Removes the warning regarding the WebPack Build Worker
    webpackBuildWorker: false,
  },
};

export default nextConfig;
