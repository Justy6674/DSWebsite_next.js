import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pooebqhsshfafkhvccrl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.downscale.com.au';
  const currentDate = new Date().toISOString();

  // Core pages with high priority
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medicare`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Service pages
  const servicePages = [
    'medical-weight-management',
    'nutrition-meal-planning',
    'sleep-recovery-optimisation',
    'movement-activity-programs',
    'mental-health-support',
    'goal-setting-maintenance',
  ].map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Location pages - Australian cities
  const locations = [
    'sydney',
    'melbourne',
    'brisbane',
    'perth',
    'adelaide',
    'canberra',
    'hobart',
    'darwin',
    'gold-coast',
    'sunshine-coast',
    'newcastle',
    'wollongong',
    'geelong',
    'townsville',
    'cairns',
    'toowoomba',
    'ballarat',
    'bendigo',
    'albury-wodonga',
    'launceston',
    'mackay',
    'rockhampton',
    'bunbury',
    'mandurah',
    'wagga-wagga',
    'alice-springs',
  ].map(location => ({
    url: `${baseUrl}/weight-loss-clinic-${location}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Legal and utility pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/data-deletion`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Tool pages
  const toolPages = [
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Assessment tools
  const assessmentPages = [
    {
      url: `${baseUrl}/assessment/adhd`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/assessment/bed`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/assessment/epworth`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/assessment/menopause`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/assessment/stop-bang`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
  ];

  // Additional info pages
  const infoPages = [
    {
      url: `${baseUrl}/facts`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/meet-the-team`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/clinical-services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Fetch blog posts from Supabase
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    console.log('Sitemap debug - Blog posts:', blogPosts?.length, 'Error:', error);

    if (!error && blogPosts && blogPosts.length > 0) {
      blogPages = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at || post.created_at,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
      console.log('Sitemap debug - Generated blog pages:', blogPages.length);
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [
    ...corePages,
    ...servicePages,
    ...locations,
    ...toolPages,
    ...assessmentPages,
    ...infoPages,
    ...legalPages,
    ...blogPages,
  ];
}
