// Script to populate blog_posts table with sample data matching sitemap entries
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://pooebqhsshfafkhvccrl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const blogPosts = [
  {
    slug: "choosing-the-right-weight-loss-clinic-in-australia-the-downscale-difference",
    title: "Choosing the Right Weight Loss Clinic in Australia: The Downscale Difference",
    excerpt: "Learn about Downscale's patient-focused weight loss clinic in Australia, offering evidence-based care and personalised support for lasting results.",
    content: `# Choosing the Right Weight Loss Clinic in Australia: The Downscale Difference

## Introduction

Finding a weight loss clinic that aligns with your health needs is crucial for long-term success. In recent years, Australia has witnessed an influx of weight loss providers, and choosing correctly can make the difference between achieving sustainable results and encountering setbacks.

At Downscale, we champion a different philosophy. Our approach is grounded in integrity, continuity, and evidence-based care, ensuring you always know exactly what to expect.

## The Problem With Corporate Clinics

Many Australians who have engaged with large weight loss providers report common challenges, including:

- **Encountering a different clinician** at each visit, leading to inconsistent care
- **Feeling rushed through appointments** and treated as just another number
- **When weight management becomes a production line**, patients often miss out on the support and safety they require

These corporate clinics are frequently focused on throughput rather than the individual patient's journey.

## What Makes Our Weight Loss Clinic Unique

At Downscale, we take pride in offering:

### 1. **Personal-Centred Philosophy**

Our weight loss clinic serves as a partnership where your clinician understands your medical history, challenges, and health aspirations. This relationship ensures our care is consistent, evidence-based, and always focused on the individual.

### 2. **Transparency and Safety**

With the evolving landscape of Medicare and telehealth guidelines, many individuals may feel uncertain about the healthcare services available online. Our telehealth commitment allows you to focus on your health without worrying about the appropriateness of your care.

### 3. **My Story, My Why**

After years of experience working in one of Australia's largest weight loss clinics, I witnessed first-hand how patients often encountered a different clinician at each visit. This inconsistent approach troubled me, leading to the founding of Downscale - a clinic focused on you, not volume.

## Evidence-Based Weight Management

Our approach incorporates:

- **Comprehensive medical assessment** and ongoing monitoring
- **Individualised treatment plans** tailored to your specific needs
- **Evidence-based interventions** supported by current research
- **Continuous support** throughout your weight loss journey

## Conclusion

Choosing the right weight loss clinic is a critical decision that impacts your health and wellbeing. At Downscale, we're committed to providing personalised, evidence-based care that prioritises your individual journey over corporate metrics.

Ready to start your weight loss journey with a clinic that puts you first? Contact Downscale today to learn how our patient-centred approach can help you achieve lasting results.`,
    category: "Weight Loss",
    tags: ["weight loss", "clinic", "australia", "healthcare", "telehealth"],
    author: "Dr. Justin Black",
    published: true,
    featured: true,
    meta_description: "Learn about Downscale's patient-focused weight loss clinic in Australia, offering evidence-based care and personalised support for lasting results.",
    reading_time: 5,
    featured_image: "https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/blog-images/blog-1758003336577.png",
    created_at: "2025-09-16T00:00:00Z",
    updated_at: "2025-09-16T00:00:00Z"
  },
  {
    slug: "understanding-glp-1-medications-for-weight-management",
    title: "Understanding GLP-1 Medications for Weight Management",
    excerpt: "Discover how GLP-1 medications can transform weight management in Australia. Explore evidence-based strategies for sustainable obesity treatment.",
    content: `# Understanding GLP-1 Medications for Weight Management

## The Emergence of Evidence-Based Treatments for Weight Loss

Over recent years, weight management has evolved from a simplistic "eat less, move more" mindset to a recognised chronic disease requiring multifaceted management approaches.

Science now shows obesity's complexity involves genetics, hormones, environment, and biology, where the body defends fat mass through metabolic adaptations.

Comprehensive weight loss treats obesity as a chronic condition, combining nutrition, physical activity, behavioural modification, and medical support.

At Downscale Weight Loss Clinic in Australia, we transform lives through evidence-based telehealth care, focusing on the four pillars to overcome set point challenges.

## Key References

1. Australian Institute of Health and Welfare. Overweight and obesity. AIHW; 2024. Accessed July 13, 2025. https://www.aihw.gov.au/reports/overweight-obesity
2. World Obesity Federation. Obesity Atlas 2025. World Obesity Federation; 2025. Accessed July 13, 2025. https://www.worldobesity.org/resources
3. National Health and Medical Research Council. Clinical practice guidelines for the management of overweight and obesity in adults, adolescents and children in Australia. NHMRC; 2013. Revised 2020. https://www.nhmrc.gov.au/about-us/publications/clinical-practice-guidelines-overweight-and-obesity
4. Wilding JPH, Batterham RL, Calanna S, et al. Once-weekly semaglutide in adults with overweight or obesity. N Engl J Med. 2021;384(11):989-1002. doi:10.1056/NEJMoa2032183
5. Hall KD, Kahan S. Maintenance of lost weight and long-term management of obesity. Med Clin North Am. 2018;102(1):183-197. doi:10.1016/j.mcna.2017.08.012
6. Malhotra A, et al. The Australian Lifestyle Medicine Association position statement of use of prescription medicines and supplementation for weight loss. J Lifestyle Med. 2020;14(2):102-110.
7. Sumithran P, Delbridge E, Purcell K, et al. Long-term persistence of hormonal adaptations to weight loss. N Engl J Med Res. 2011;365(17):1597-1604. doi:10.1056/NEJMoa1105816
8. Blüher M. Obesity: global epidemiology and pathogenesis. Nat Rev Endocrinol. 2019;15(5):288-298. doi:10.1038/s41574-019-0176-8`,
    category: "Medication",
    tags: ["glp-1", "medication", "weight management", "semaglutide", "obesity"],
    author: "Dr. Justin Black",
    published: true,
    featured: false,
    meta_description: "Discover how GLP-1 medications can transform weight management in Australia. Explore evidence-based strategies for sustainable obesity treatment.",
    reading_time: 8,
    featured_image: "https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/blog-images/blog-1752379189242.png",
    created_at: "2025-07-13T00:00:00Z",
    updated_at: "2025-07-13T00:00:00Z"
  }
];

async function populateBlogPosts() {
  console.log('🔄 Starting blog post population...');

  try {
    // Check if any blog posts already exist
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('slug')
      .limit(1);

    if (checkError) {
      console.error('❌ Error checking existing posts:', checkError);
      return;
    }

    if (existingPosts && existingPosts.length > 0) {
      console.log('ℹ️  Blog posts already exist. Skipping population.');
      return;
    }

    // Insert blog posts
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogPosts)
      .select();

    if (error) {
      console.error('❌ Error inserting blog posts:', error);
      return;
    }

    console.log(`✅ Successfully inserted ${data.length} blog posts!`);
    console.log('📝 Created posts:');
    data.forEach(post => {
      console.log(`   - ${post.title} (${post.slug})`);
    });

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the script
populateBlogPosts();