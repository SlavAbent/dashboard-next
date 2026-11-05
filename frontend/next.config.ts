import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@dashboard/pomodoro',
    '@dashboard/clock',
    '@dashboard/weather',
    '@dashboard/chat',
  ],
};

export default nextConfig;
