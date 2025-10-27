import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const alt = 'Downscale Weight Loss Clinic Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pooebqhsshfafkhvccrl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

interface Props {
  params: {
    slug: string;
  };
}

export default async function Image({ params }: Props) {
  const { slug } = params;
  
  let title = 'Downscale Weight Loss Clinic Blog';
  let category = 'Health & Wellness';
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, category')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (post) {
      title = post.title;
      category = post.category || 'Health & Wellness';
    }
  } catch (error) {
    console.error('Error fetching blog post for OG image:', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2%, transparent 2%), radial-gradient(circle at 75% 75%, white 2%, transparent 2%)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 'bold',
            }}
          >
            Downscale Weight Loss Clinic
          </div>
        </div>
        
        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 80 ? '48px' : '64px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
        
        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            www.downscale.com.au/blog
          </div>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.85)',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            Read Article →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
