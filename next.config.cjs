/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set distDir to .next to override any cached Vercel settings
  distDir: '.next',
  // NUCLEAR OPTION: Disable SSR entirely to eliminate ALL hydration errors
  output: 'export',
  trailingSlash: true,
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
  // Security headers - CSP removed to allow Next.js hydration
  // Next.js needs to load dynamic JavaScript chunks which CSP was blocking
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  // TEMPORARILY DISABLE CSP TO TEST IF IT'S BLOCKING REACT
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: `
  //             default-src 'self';
  //             script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
  //             style-src 'self' 'unsafe-inline';
  //             img-src 'self' blob: data: https:;
  //             font-src 'self' data:;
  //             object-src 'none';
  //             base-uri 'self';
  //             form-action 'self';
  //             frame-ancestors 'none';
  //             upgrade-insecure-requests;
  //           `.replace(/\s{2,}/g, ' ').trim()
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY'
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin'
  //         }
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;