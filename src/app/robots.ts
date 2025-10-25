import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.downscale.com.au';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/portal/',
          '/blog-admin',
          '/api/',
          '/cart/',
          '/account/',
          '/customer_authentication/',
          '/search/suggest',
          '/private/',
          '/tmp/',
          '/test-upload/',
          '/*?utm_*',
          '/*?ref=*',
          '/*?source=*',
          '/*?campaign=*',
          '/*?gclid=*',
          '/*?fbclid=*',
          '/*#*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
        crawlDelay: 0.5,
      },
      // AI crawlers
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'CCBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
        crawlDelay: 1,
      },
      // Block bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'PetalBot',
          'BLEXBot',
          'YandexBot',
          'SerpstatBot',
          'MauiBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-locations.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/blog/rss.xml`,
    ],
  };
}
