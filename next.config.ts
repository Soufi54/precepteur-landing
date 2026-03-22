import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGitHubPages ? "/precepteur-landing" : "",
  assetPrefix: isGitHubPages ? "/precepteur-landing/" : "",
};

export default nextConfig;
