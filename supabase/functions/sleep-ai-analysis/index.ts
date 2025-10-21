import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentType, score, answers } = await req.json();
    
    if (!assessmentType || score === undefined || !answers) {
      throw new Error('Missing required assessment data');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create detailed analysis prompt based on assessment type
    let systemPrompt = '';
    let userPrompt = '';

    if (assessmentType === 'STOP-BANG Sleep Apnea Screening') {
      systemPrompt = `You are a sleep medicine specialist providing professional analysis of STOP-BANG assessment results. Provide clinical insights while being clear this is screening only, not diagnosis.

Focus on:
1. Clinical interpretation of the score
2. Specific risk factors identified
3. Lifestyle interventions that may help
4. When to seek professional evaluation
5. Connection to weight management if relevant

Be professional, evidence-based, and supportive.`;

      const answerLabels = ['Snoring', 'Tired', 'Observed apneas', 'Blood pressure', 'BMI >35', 'Age >50', 'Neck circumference', 'Male gender'];
      const positiveFactors = Object.entries(answers)
        .map(([key, value], index) => value ? answerLabels[index] : null)
        .filter(Boolean);

      userPrompt = `STOP-BANG Assessment Results:
Score: ${score}/8
Positive factors: ${positiveFactors.join(', ') || 'None'}

Please provide a detailed analysis including:
1. What this score means clinically
2. Specific risk factors to address
3. Lifestyle modifications that could help
4. Timeline for seeking medical evaluation
5. How sleep apnea affects weight management

Keep response under 300 words, professional but accessible.`;
    
    } else if (assessmentType === 'Epworth Sleepiness Scale') {
      systemPrompt = `You are a sleep medicine specialist analyzing Epworth Sleepiness Scale results. Provide professional interpretation while emphasizing this is screening only.

Focus on:
1. What the score indicates about daytime sleepiness
2. Most concerning situations from their responses
3. Potential underlying causes
4. Sleep hygiene recommendations
5. When professional evaluation is needed
6. Impact on daily functioning and safety

Be thorough but accessible, evidence-based and supportive.`;

      const situations = ['reading', 'watching TV', 'sitting inactive', 'car passenger', 'lying down afternoon', 'sitting talking', 'after lunch', 'car traffic'];
      const highRiskAnswers = Object.entries(answers)
        .map(([key, value], index) => value >= 2 ? `${situations[index]} (${value}/3)` : null)
        .filter(Boolean);

      userPrompt = `Epworth Sleepiness Scale Results:
Score: ${score}/24
High sleepiness situations (≥2 points): ${highRiskAnswers.join(', ') || 'None'}

Please provide detailed analysis including:
1. Clinical interpretation of this sleepiness level
2. Most concerning situations identified
3. Potential underlying sleep disorders
4. Safety implications (driving, work)
5. Sleep hygiene recommendations
6. When to seek medical evaluation
7. Connection to metabolic health

Keep response under 350 words, professional but patient-friendly.`;
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sleep-ai-analysis function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate analysis',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});