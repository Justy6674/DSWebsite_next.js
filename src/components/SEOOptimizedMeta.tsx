import Head from "next/head";

interface SEOOptimizedMetaProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: object;
  alternateImages?: string[];
}

export function SEOOptimizedMeta({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "https://www.downscale.com.au/public/og-services.jpg",
  structuredData,
  alternateImages = []
}: SEOOptimizedMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:site_name" content="Downscale Weight Loss Clinic - Australian Weight Loss Clinic" />
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {/* Additional SEO optimizations */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#0077be" />
      <meta name="format-detection" content="telephone=no" />
      {/* Preload critical resources */}
      <link rel="preload" href="/src/assets/australian-beach-hero.jpg" as="image" type="image/jpeg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      {/* Alternate images for different contexts */}
      {alternateImages.map((imageUrl, index) => (
        <link key={index} rel="preload" href={imageUrl} as="image" />
      ))}
    </Head>
  );
}