import { NextRequest, NextResponse } from 'next/server';

function extractMeta(html: string, key: string): string | null {
  // Matches: <meta property="og:title" content="..."> or <meta name="og:title" ...>
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${key}["'][^>]*?content=["']([^"']+)["'][^>]*>`,
    'i'
  );
  const match = html.match(re);
  return match ? match[1] : null;
}

function extractLinkRel(html: string, rel: string): string | null {
  // Matches: <link rel="icon" href="...">
  const re = new RegExp(
    `<link[^>]+rel=["'][^"']*${rel}[^"']*["'][^>]*?href=["']([^"']+)["'][^>]*>`,
    'i'
  );
  const match = html.match(re);
  return match ? match[1] : null;
}

function toAbsoluteUrl(raw: string | null, baseUrl: URL): string | null {
  if (!raw) return null;
  try {
    return new URL(raw, baseUrl).toString();
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url') || '';
  try {
    const target = new URL(urlParam);
    if (target.protocol !== 'https:' && target.protocol !== 'http:') {
      return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
    }

    const res = await fetch(target.toString(), {
      redirect: 'follow',
      headers: {
        // Pretend to be a modern browser to maximise OG tag delivery
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const html = await res.text();
    const base = new URL(res.url || target.toString());

    const ogTitle = extractMeta(html, 'og:title') || extractMeta(html, 'twitter:title');
    const ogDescription = extractMeta(html, 'og:description') || extractMeta(html, 'twitter:description');
    const ogImageRaw = extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image');
    const canonicalRaw = (() => {
      const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*?href=["']([^"']+)["'][^>]*>/i);
      return m ? m[1] : null;
    })();

    // Favicons
    const iconRel =
      extractLinkRel(html, 'icon') ||
      extractLinkRel(html, 'shortcut icon') ||
      extractLinkRel(html, 'apple-touch-icon');

    const image = toAbsoluteUrl(ogImageRaw, base);
    const favicon = toAbsoluteUrl(iconRel, base) || `https://www.google.com/s2/favicons?domain=${base.hostname}&sz=64`;
    const canonical = toAbsoluteUrl(canonicalRaw, base) || base.toString();

    return NextResponse.json({
      url: base.toString(),
      canonical_url: canonical,
      title: ogTitle || null,
      description: ogDescription || null,
      image: image || null,
      favicon,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 400 });
  }
}


