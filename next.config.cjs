/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set distDir to .next to override any cached Vercel settings
  distDir: '.next',
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript type errors.
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  // BULLET-PROOF CSP SOLUTION - Allow JavaScript execution on Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data: https:;
              font-src 'self' data:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;