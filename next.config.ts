import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.201.46"],
  ...(isGithubPages && {
    output: "export",
    basePath: "/POS_SYSTEM",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
