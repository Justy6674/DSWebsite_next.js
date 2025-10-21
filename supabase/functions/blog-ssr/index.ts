import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function basicMarkdownToHtml(md: string) {
  // Super-light markdown rendering for headings, bold/italic, links, and paragraphs
  let safe = escapeHtml(md);
  // Links [text](url)
  safe = safe.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener nofollow">$1</a>');
  // Bold **text**
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic *text*
  safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Headings at line start #####, ####, ###, ##, #
  safe = safe
    .replace(/^######\s?(.*)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s?(.*)$/gm, '<h5>$1</h5>')
    .replace(/^####\s?(.*)$/gm, '<h4>$1</h4>')
    .replace(/^###\s?(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s?(.*)$/gm, '<h2>$1</h2>')
    .replace(/^#\s?(.*)$/gm, '<h2>$1</h2>');
  // Paragraphs
  safe = safe
    .split(/\n\n+/)
    .map((block) => `<p>${block.replace(/\n/g, '<br/>')}</p>`) 
    .join("\n");
  return safe;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const rawSlug = url.searchParams.get("slug") || "";

    // Normalize slug: decode, lower, keep a-z0-9- and _
    // But be less aggressive to avoid breaking valid slugs
    const decoded = decodeURIComponent(rawSlug);
    const normalized = decoded
      .toLowerCase()
      .replace(/[^a-z0-9\-_\s]+/g, "-") // Include spaces initially
      .replace(/\s+/g, "-") // Convert spaces to hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

    console.log(`blog-ssr: Processing slug "${rawSlug}" -> normalized: "${normalized}"`);

    if (!normalized) {
      console.log('blog-ssr: Empty slug, returning 404');
      const notFoundHtml = `<!doctype html><html lang="en"><head>
<meta charset="utf-8" />
<title>Not Found | Downscale Health</title>
<meta name="robots" content="noindex, nofollow" />
<link rel="canonical" href="https://www.downscale.com.au/blog" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head><body><main><h1>Not Found</h1><p>This article does not exist.</p></main></body></html>`;
      return new Response(notFoundHtml, { status: 404, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, content, excerpt, category, tags, author, published, featured, created_at, updated_at, meta_description, reading_time, featured_image")
      .eq("slug", normalized)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("blog-ssr fetch error for slug:", normalized, error);
      throw error;
    }

    console.log(`blog-ssr: Database query completed for "${normalized}", found post:`, !!post);

    if (!post) {
      console.log(`blog-ssr: No published post found for slug "${normalized}"`);
      const notFoundHtml = `<!doctype html><html lang="en"><head>
<meta charset="utf-8" />
<title>Not Found | Downscale Health</title>
<meta name="robots" content="noindex, nofollow" />
<link rel="canonical" href="https://www.downscale.com.au/blog" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head><body><main><h1>Not Found</h1><p>This article does not exist.</p></main></body></html>`;
      return new Response(notFoundHtml, { status: 404, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } });
    }

    const title = `${post.title} | Downscale Health`;
    const description = post.meta_description || post.excerpt || "Evidence-based weight management articles by Downscale Health.";
    const canonical = `https://www.downscale.com.au/blog/${post.slug}`;
    const ogImage = post.featured_image || "https://www.downscale.com.au/og-services.jpg";
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description,
      url: canonical,
      datePublished: post.created_at,
      dateModified: post.updated_at,
      author: {
        "@type": "Person",
        name: post.author || "Downscale Health",
      },
      publisher: {
        "@type": "Organization",
        name: "Downscale Health",
        logo: {
          "@type": "ImageObject",
          url: "https://www.downscale.com.au/og-image.jpg",
        },
      },
      image: ogImage,
      articleSection: post.category,
      keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    } as Record<string, unknown>;

    const contentHtml = post.content ? basicMarkdownToHtml(post.content) : "";

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<meta property="og:title" content="${escapeHtml(post.title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(post.title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ""}
<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>
</head>
<body>
<main>
  <article>
    <header>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(description)}</p>
      <p><small>Published ${new Date(post.created_at).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</small></p>
    </header>
    <section>${contentHtml}</section>
  </article>
</main>
</body>
</html>`;

    console.log(`blog-ssr: Successfully rendered post "${post.title}" for slug "${normalized}"`);

    return new Response(html, {
      status: 200,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", // Cache for 1 hour, serve stale for 24 hours
        "X-Rendered-By": "blog-ssr",
        "X-Rendered-At": new Date().toISOString()
      },
    });
  } catch (e: unknown) {
    console.error("blog-ssr error", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
