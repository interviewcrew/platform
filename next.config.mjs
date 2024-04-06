import nextMDX from "@next/mdx";

import { recmaPlugins } from "./src/mdx/recma.mjs";
import { rehypePlugins } from "./src/mdx/rehype.mjs";
import { remarkPlugins } from "./src/mdx/remark.mjs";
import withSearch from "./src/mdx/search.mjs";

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com", pathname: "/u/*" },
      { hostname: "cdn.discordapp.com", pathname: "/avatars/*" },
      { hostname: "*.googleusercontent.com", pathname: "/a/*" },
      { hostname: "*.gravatar.com", pathname: "/**" },
      { hostname: "media.licdn.com", pathname: "**" },
      { hostname: "uploadthing.com", pathname: "/f/**" },
      { hostname: "utfs.io", pathname: "/f/**" },
      { hostname: "tailwindui.com", pathname: "/**" },
      { hostname: "images.unsplash.com", pathname: "/**" },
      { hostname: "img.clerk.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
};

export default withSearch(withMDX(nextConfig));
