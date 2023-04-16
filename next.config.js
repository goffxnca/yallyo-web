/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d31wcbk3iidrjq.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
