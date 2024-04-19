/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login?',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register?',
        permanent: true,
      },
      {
        source: '/sign-out',
        destination: '/api/auth/logout',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
