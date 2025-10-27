import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Downscale Weight Loss Clinic - Professional Telehealth Weight Management Australia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #334155 0%, #475569 50%, #b68a71 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Logo/Brand Area */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: '800',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          DOWNSCALE
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center',
            color: '#fef5e7',
            maxWidth: '900px',
          }}
        >
          Professional Telehealth Weight Loss & Weight Maintenance Clinic
        </div>

        {/* Key Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            fontSize: '24px',
            fontWeight: '500',
            color: '#fef5e7',
            textAlign: 'center',
          }}
        >
          <div>🩺 Nurse Practitioner Led</div>
          <div>💊 Medicare Eligible</div>
          <div>🇦🇺 Australia Wide</div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#b68a71',
            opacity: 0.8,
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