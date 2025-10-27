import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export const alt = 'Downscale Weight Loss Clinic Blog Post';

const supabaseUrl = 'https://pooebqhsshfafkhvccrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

export default async function Image({ params }: { params: { slug: string } }) {
  let title = 'Downscale Weight Loss Blog';
  let category = 'Health & Wellness';
  let author = 'Downscale Team';

  // Fetch blog post data
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, category, author')
      .eq('slug', params.slug)
      .eq('published', true)
      .maybeSingle();

    if (post) {
      title = post.title;
      category = post.category || 'Health & Wellness';
      author = post.author || 'Downscale Team';
    }
  } catch (error) {
    console.error('Error fetching blog post for OG image:', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #334155 0%, #475569 50%, #b68a71 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#ffffff',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Blog Badge */}
        <div
          style={{
            backgroundColor: '#b68a71',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {category}
        </div>

        {/* Blog Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '48px' : '56px',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '40px',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Author and Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '22px',
            fontWeight: '500',
            color: '#fef5e7',
          }}
        >
          <span>By {author}</span>
          <span style={{ color: '#b68a71' }}>•</span>
          <span>Downscale Weight Loss Clinic</span>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#b68a71',
            opacity: 0.8,
          }}
        >
          www.downscale.com.au
        </div>

        {/* Decorative Element */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(182, 138, 113, 0.2)',
            border: '3px solid #b68a71',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}