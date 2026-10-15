import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@dashboard/pomodoro',
    '@dashboard/clock',
    '@dashboard/weather',
    '@dashboard/chat',
  ],
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
