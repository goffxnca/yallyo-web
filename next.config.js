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
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const customPlugins = [
      new webpack.DefinePlugin({
        "process.env.NEXT_PUBLIC_BUILD_YO": JSON.stringify(buildId),
      }),
    ];
    config.plugins.push(...customPlugins);
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
