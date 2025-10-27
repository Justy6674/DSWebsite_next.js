/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set distDir to .next to override any cached Vercel settings
  distDir: '.next',
  // Enable SSR for proper blog crawlability on Vercel
  // Removed 'output: export' to enable server-side rendering for blog posts from Supabase
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
  // Optimize images for fast loading
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['www.downscale.com.au'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.downscale.com.au',
      },
    ],
  },
  // Security headers + Performance caching optimizations
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
      // Blog posts - Aggressive caching with stale-while-revalidate
      {
        source: '/blog/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate=86400'
          },
        ],
      },
      // Location pages - Long-term caching with weekly revalidation
      {
        source: '/weight-loss-clinic-:city*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=604800'
          },
        ],
      },
      // Assessment tools - Medium-term caching
      {
        source: '/assessment/:tool*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=7200, stale-while-revalidate=86400'
          },
        ],
      },
      // Service pages - Medium-term caching
      {
        source: '/:service(medical-weight-management|nutrition-meal-planning|sleep-recovery-optimisation|movement-activity-programs|mental-health-support|goal-setting-maintenance)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=7200, stale-while-revalidate=86400'
          },
        ],
      },
      // Static pages - Long-term caching
      {
        source: '/:page(about|pricing|faq|how-it-works|medicare|locations|facts|conditions|meet-the-team|clinical-services)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=14400, stale-while-revalidate=86400'
          },
        ],
      },
      // API routes - Short-term caching
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=300, stale-while-revalidate=600'
          },
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