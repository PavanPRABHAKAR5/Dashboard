/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverExternalPackages: ["mongoose"],
      },
      eslint:{
        ignoreDuringBuilds: true,
      }
};

export default nextConfig;

