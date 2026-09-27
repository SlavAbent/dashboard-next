import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dashboard-next',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
