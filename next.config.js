/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
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

module.exports = nextConfig;
