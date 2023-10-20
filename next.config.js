const withForgetti = require('forgetti-loader/next');

const nextConfig = withForgetti({
  // Forgetti options. See https://github.com/lxsmnsyc/forgetti/tree/main#configuration for more details.
  preset: 'react',
})({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
