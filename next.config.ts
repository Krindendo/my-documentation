import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default withContentCollections(nextConfig);
