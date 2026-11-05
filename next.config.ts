import type { NextConfig } from "next";

// Static export for GitHub Pages on the custom domain (muhaffiz.app).
// The site is served from the domain root, so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
