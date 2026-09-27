import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  experimental: {
    // Vercel restored a stale .next/cache from a prior deployment and it
    // left behind bad directory-scan state, causing a false
    // "pages and app directories" conflict even though this repo only has
    // app/. Disabling the persistent Turbopack build cache prevents that.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
