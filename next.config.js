/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d31wcbk3iidrjq.cloudfront.net",
      },
      { protocol: "https", hostname: "loremflickr.com" },
    ],
  },
};

module.exports = nextConfig;
