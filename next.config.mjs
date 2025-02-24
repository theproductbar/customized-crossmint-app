/** @type {import('next').NextConfig} */
const nextConfig = {
  // Needed for Wallet Connect with next.js apps which we use via dynamic-labs in react-ui: https://docs.reown.com/appkit/next/core/installation#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript checks
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks
  },
};

export default nextConfig;
