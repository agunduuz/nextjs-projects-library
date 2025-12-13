import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Workspace root uyarısını sustur
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
    ],
  },
  outputFileTracingRoot: undefined,

  // ESLint ve TypeScript kontrolleri
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Turbopack development'ta kullan (production'da otomatik webpack)
  experimental: {
    turbo: {
      // Turbopack ayarları (sadece dev mode)
    },
  },
};

export default nextConfig;
