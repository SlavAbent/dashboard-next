import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mock-api/:path*',
        destination: `${process.env.JSON_SERVER_URL ?? 'http://localhost:4001'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
