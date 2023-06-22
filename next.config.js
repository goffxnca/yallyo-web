/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d31wcbk3iidrjq.cloudfront.net",
      },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  publicRuntimeConfig: {
    version: version,
  },
};

module.exports = nextConfig;
