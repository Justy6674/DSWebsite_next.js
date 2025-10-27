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
            fontSize: '64px',
            fontWeight: '800',
            marginBottom: '16px',
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
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center',
            color: '#fef5e7',
            maxWidth: '800px',
            lineHeight: 1.2,
          }}
        >
          Professional Telehealth Weight Loss<br />& Weight Maintenance Clinic
        </div>

        {/* Key Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            fontSize: '20px',
            fontWeight: '500',
            color: '#fef5e7',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <div>🩺 Nurse Practitioner</div>
          <div>💊 Medicare Eligible</div>
          <div>🇦🇺 Australia Wide</div>
        </div>

        {/* Call to Action */}
        <div
          style={{
            backgroundColor: '#b68a71',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '8px',
            fontSize: '22px',
            fontWeight: '700',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          From Only $45 Maximum Out-of-Pocket
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#fef5e7',
            opacity: 0.9,
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