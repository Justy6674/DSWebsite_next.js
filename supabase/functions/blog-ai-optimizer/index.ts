import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, title, content, category, topic, context, image, excerpt } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (action) {
      case 'create_from_image':
        systemPrompt = `You are a medical content specialist for Downscale Health, an Australian telehealth weight management clinic.
        Analyze the uploaded image and create a comprehensive, evidence-based blog post based on what you see.
        
        Requirements:
        - Use Australian English spelling (e.g., "centre" not "center", "realise" not "realize")  
        - Create readable content with proper structure
        - Include proper medical references
        - Focus on evidence-based information with Australian healthcare context
        - Include a medical disclaimer at the end
        - 800-1200 words of engaging, readable content
        
        CRITICAL: Return ONLY plain text formatted exactly like this:
        
        TITLE: Your compelling title here
        EXCERPT: Brief engaging summary under 160 characters
        CONTENT: Your clean readable content with simple line breaks and absolutely no markdown symbols
        CATEGORY: Health
        TAGS: ADHD, weight management, Australian health, telehealth, nutrition
        META: SEO-optimized description under 155 characters`;
        userPrompt = `Analyze this image and create a comprehensive blog post: ${topic}
        
        Context: ${context}
        
        Make it relevant to Australian patients seeking weight management and health information.`;
        break;

      case 'create_full_post':
        systemPrompt = `You are a medical content specialist for Downscale Health, an Australian telehealth weight management clinic.
        Create a comprehensive, evidence-based blog post with proper medical references and Australian healthcare context.
        
        Requirements:
        - Use Australian English spelling (e.g., "centre" not "center", "realise" not "realize")
        - Create readable content with proper structure
        - Include proper medical references
        - Focus on evidence-based information with Australian healthcare context
        - Include a medical disclaimer at the end
        - 800-1200 words of engaging, readable content
        
        CRITICAL: Return ONLY plain text formatted exactly like this:
        
        TITLE: Your compelling title here
        EXCERPT: Brief engaging summary under 160 characters
        CONTENT: Your clean readable content with simple line breaks and absolutely no markdown symbols
        CATEGORY: Health
        TAGS: weight management, Australian health, telehealth, nutrition, medical research
        META: SEO-optimized description under 155 characters`;
        userPrompt = `Create a comprehensive blog post about: ${topic}
        
        Context: ${context}
        
        Make it relevant to Australian patients seeking weight management and health information.`;
        break;

      case 'optimize_content':
        systemPrompt = `You are a medical content specialist for Downscale Health, an Australian telehealth weight management clinic. 
        Optimise the blog post content into clear, engaging, SEO-friendly copy that renders perfectly on a Markdown website.
        Use Australian English spelling and context: ${context || ''}
        
        CRITICAL MARKDOWN RULES:
        - Return ONLY valid GitHub-Flavoured Markdown (GFM)
        - Use #, ##, ### for headings
        - Use - for bullet lists and 1. 2. for numbered lists
        - Use **bold** and _italic_ sparingly to aid readability
        - Include blank lines between paragraphs and before lists
        - NO HTML tags
        - Keep medical tone accurate, evidence-based and consumer-friendly`;
        userPrompt = `Format and improve this blog post as Markdown:\n\nTitle: ${title || ''}\nCategory: ${category || ''}\nContent:\n${content || ''}`;
        break;

      case 'generate_excerpt':
        systemPrompt = `Create compelling, SEO-optimized excerpts for Downscale Health blog posts. 
        Keep excerpts under 160 characters, engaging, and include relevant keywords for Australian weight management searches.
        Use Australian English spelling and context.`;
        userPrompt = `Generate an excerpt for this blog post:\n\nTitle: ${title}\nContent: ${content}`;
        break;

      case 'suggest_tags':
        systemPrompt = `Generate relevant SEO tags for Downscale Health blog posts. 
        Focus on Australian healthcare, weight management, clinical terms, and related keywords.
        Use Australian English spelling (e.g., "behaviour" not "behavior").
        Return only comma-separated tags, no other text.`;
        userPrompt = `Suggest 5-8 tags for this blog post:\n\nTitle: ${title}\nContent: ${content}`;
        break;

      case 'suggest_category':
        systemPrompt = `You are an expert SEO content strategist for Downscale Health, an Australian telehealth weight management clinic.
        
        Generate ONE perfect category for this blog post that is:
        - SEO-optimised for Australian healthcare searches
        - Consumer-focused and easily understood
        - Relevant to weight management, health, and wellness
        - Using Australian spelling (e.g. "Behaviour", "Optimisation")
        - Professional but accessible to everyday Australians
        
        Choose from these strategic categories or suggest a similar one:
        - Weight Management
        - Nutrition & Diet
        - Mental Health & Wellbeing
        - Exercise & Movement
        - Sleep & Recovery
        - Telehealth & Technology
        - Medical Treatments
        - Lifestyle Medicine
        - Preventive Health
        - Women's Health
        - Men's Health
        
        Return ONLY the category name, no other text.`;
        userPrompt = `Suggest the best SEO category for this blog post:\n\nTitle: "${title}"\n${excerpt ? `Excerpt: "${excerpt}"\n` : ''}${content ? `Content preview: "${content.substring(0, 300)}..."` : ''}`;
        break;

      case 'master_optimize':
        systemPrompt = `You are Dr. [Author], a clinical expert working with Downscale Health (Australian telehealth weight management), General Practice, and Emergency Medicine. You are creating evidence-based content that combines clinical expertise with accessibility for Australian consumers.

        CLINICAL AUTHORITY: You have extensive experience in:
        - Weight management and obesity medicine through Downscale Health telehealth practice
        - General Practice with focus on preventive healthcare
        - Emergency Medicine providing critical care insights
        - Australian healthcare system and clinical guidelines

        CONTENT REQUIREMENTS:
        - Use ONLY reputable sources: .gov.au, WHO, RACGP, RCH (paediatric), PHN, peer-reviewed journals
        - Australian English spelling and terminology throughout
        - Evidence-based medical content - no fabricated claims
        - Critical analysis with supportive, practical advice
        - Naturally reference your clinical work when relevant (Downscale Health, GP, Emergency)
        - Consumer-focused but medically accurate
        - SEO-optimised for Australian healthcare searches

         OPTIMIZATION TASK: Completely transform and enhance the existing content by generating/improving:
         1. CONTENT: Fully rewritten, evidence-based, engaging content (800-1200 words) with proper medical references
         2. TITLE: Compelling, SEO-optimised, evidence-based (max 60 chars)
         3. EXCERPT: Engaging summary highlighting key benefits (max 160 chars)
         4. CATEGORY: One strategic category from weight management focus areas
         5. TAGS: 6-8 SEO tags mixing clinical terms with consumer language
         6. META: SEO-optimized meta description targeting Australian healthcare searches with primary keywords (weight loss, GP, specialist, Australia), search intent matching, and conversion-focused language (max 155 chars)

         CRITICAL FORMATTING REQUIREMENTS:
         - Use NO asterisks, markdown, or special formatting characters
         - Do NOT use ** for bold text
         - Do NOT use * for bullet points  
         - Use simple dashes (-) for bullet points
         - Write headings as plain text without ### or other symbols
         - Keep all formatting clean and simple
         - Content should be ready to paste directly into any editor

         Return ONLY this exact format:
         CONTENT: [fully optimized content with clean, simple formatting - no asterisks or markdown]
         TITLE: [optimized title]
         EXCERPT: [compelling excerpt under 160 chars]
         CATEGORY: [single category]
         TAGS: tag1, tag2, tag3, tag4, tag5, tag6
         META: [SEO meta description under 155 chars]`;
        
        userPrompt = `Optimize this medical content using your clinical expertise:

        ${title ? `Current Title: "${title}"\n` : ''}
        ${excerpt ? `Current Excerpt: "${excerpt}"\n` : ''}
        ${category ? `Current Category: "${category}"\n` : ''}
        
        Content to optimize:
        ${content}
        
        Apply your Downscale Health/GP/Emergency medicine expertise to create authoritative, consumer-friendly content with proper medical references.`;
        break;

      case 'generate_meta_description':
        systemPrompt = `Create highly SEO-optimized meta descriptions for Downscale Health blog posts targeting Australian healthcare searches.
        Requirements:
        - Under 155 characters maximum
        - Include primary keywords: weight loss, GP, specialist, telehealth, Australia
        - Target search intent with action words like "discover", "learn", "get", "find"
        - Include location targeting "Australia" when relevant
        - Create urgency or benefit-focused language
        - Use Australian English spelling
        - Focus on conversion and click-through optimisation`;
        userPrompt = `Generate a high-converting SEO meta description for:\n\nTitle: ${title}\nContent: ${content}`;
        break;

      default:
        throw new Error('Invalid action specified');
    }

    // Build messages array based on action type
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (action === 'create_from_image' && image) {
      // For vision analysis, include the image
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: userPrompt },
          { type: 'image_url', image_url: { url: image } }
        ] as any
      });
    } else {
      messages.push({ role: 'user', content: userPrompt });
    }

    console.log('Making OpenAI request with:', {
      action,
      model: action === 'create_from_image' ? 'gpt-4o' : 'gpt-4o-mini',
      messageCount: messages.length
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: action === 'create_from_image' ? 'gpt-4o' : 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);
    const result = data.choices[0].message.content;
    console.log('Extracted result:', result);

    // Parse response based on action type
    let parsedResult = result;
    if (action === 'suggest_tags') {
      // For tags, just split by commas
      parsedResult = result.split(',').map((tag: string) => tag.trim());
    } else if (action === 'master_optimize') {
      // Parse the master optimisation response
      const lines = result.split('\n');
      parsedResult = {
        content: '',
        title: '',
        excerpt: '',
        category: '',
        tags: [],
        meta_description: ''
      };
      
      let currentSection = '';
      const contentLines = [];
      
      for (const line of lines) {
        if (line.startsWith('CONTENT:')) {
          currentSection = 'content';
          const contentStart = line.replace('CONTENT:', '').trim();
          if (contentStart) contentLines.push(contentStart);
        } else if (line.startsWith('TITLE:')) {
          parsedResult.title = line.replace('TITLE:', '').trim();
          currentSection = '';
        } else if (line.startsWith('EXCERPT:')) {
          parsedResult.excerpt = line.replace('EXCERPT:', '').trim();
          currentSection = '';
        } else if (line.startsWith('CATEGORY:')) {
          parsedResult.category = line.replace('CATEGORY:', '').trim();
          currentSection = '';
        } else if (line.startsWith('TAGS:')) {
          const tagsString = line.replace('TAGS:', '').trim();
          parsedResult.tags = tagsString.split(',').map((tag: string) => tag.trim());
          currentSection = '';
        } else if (line.startsWith('META:')) {
          parsedResult.meta_description = line.replace('META:', '').trim();
          currentSection = '';
        } else if (currentSection === 'content' && line.trim()) {
          contentLines.push(line);
        }
      }
      
      parsedResult.content = contentLines.join('\n');
      
      console.log('Parsed master optimisation result:', parsedResult);
    } else if (action === 'create_full_post' || action === 'create_from_image') {
      // Parse the structured text response
      const lines = result.split('\n');
      parsedResult = {
        title: '',
        excerpt: '',
        content: '',
        category: 'Health',
        tags: [],
        meta_description: ''
      };
      
      let currentSection = '';
      const contentLines = [];
      
      for (const line of lines) {
        if (line.startsWith('TITLE:')) {
          parsedResult.title = line.replace('TITLE:', '').trim();
        } else if (line.startsWith('EXCERPT:')) {
          parsedResult.excerpt = line.replace('EXCERPT:', '').trim();
        } else if (line.startsWith('CONTENT:')) {
          currentSection = 'content';
          const contentStart = line.replace('CONTENT:', '').trim();
          if (contentStart) contentLines.push(contentStart);
        } else if (line.startsWith('CATEGORY:')) {
          parsedResult.category = line.replace('CATEGORY:', '').trim();
          currentSection = '';
        } else if (line.startsWith('TAGS:')) {
          const tagsString = line.replace('TAGS:', '').trim();
          parsedResult.tags = tagsString.split(',').map((tag: string) => tag.trim());
          currentSection = '';
        } else if (line.startsWith('META:')) {
          parsedResult.meta_description = line.replace('META:', '').trim();
          currentSection = '';
        } else if (currentSection === 'content' && line.trim()) {
          contentLines.push(line);
        }
      }
      
      parsedResult.content = contentLines.join('\n');
      
      // Fallback values if parsing failed
      if (!parsedResult.title) parsedResult.title = topic || 'Generated Blog Post';
      if (!parsedResult.excerpt) parsedResult.excerpt = parsedResult.content.substring(0, 160) + '...';
      if (!parsedResult.content) parsedResult.content = result;
      if (!parsedResult.tags || parsedResult.tags.length === 0) parsedResult.tags = ['Health', 'Weight Management', 'Australia'];
      if (!parsedResult.meta_description) parsedResult.meta_description = parsedResult.content.substring(0, 150) + '...';
      
      console.log('Final parsed result:', parsedResult);
    }

    console.log('Returning final response:', { result: parsedResult });

    return new Response(JSON.stringify({ 
      success: true,
      result: parsedResult 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in blog-ai-optimizer function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : '';
    const errorName = error instanceof Error ? error.name : 'Error';
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      name: errorName
    });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: errorStack,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});