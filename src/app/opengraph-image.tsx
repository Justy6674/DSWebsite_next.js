import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const alt = 'Downscale Weight Loss Clinic - Professional Telehealth Weight Management';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
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
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '30px',
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Downscale Weight Loss Clinic
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: '20px',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Professional Telehealth Weight Management
          </p>
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.4,
            }}
          >
            From $45 • Medicare Rebates • Australia-Wide
          </p>
        </div>
        
        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '24px',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          www.downscale.com.au
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
