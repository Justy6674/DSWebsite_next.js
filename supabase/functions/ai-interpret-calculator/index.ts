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
    const { inputs, results } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create comprehensive health interpretation prompt
    const systemPrompt = `You are a qualified Australian Nurse Practitioner specialising in weight management and metabolic health at Downscale Health. 
    
    Provide a personalised, professional health interpretation based on calculator results. Be encouraging, evidence-based, and practical.
    
    CRITICAL FORMATTING RULES:
    - Use plain text only - NO markdown formatting, NO asterisks, NO hashtags, NO bold text
    - Use Australian spelling (e.g. "specialise", "centre", "colour", "realise", "analyse")
    - Write in clear paragraphs without special formatting
    - Do not use any symbols like *, #, **, ###, etc.
    
    CONTENT REQUIREMENTS:
    - Focus on the four pillars of weight management: nutrition, movement, sleep, and mental health
    - Encourage booking a consultation to discuss their personalised plan
    - Emphasise problem-solving approach and ongoing support
    - Highlight the health benefits of weight loss, not just aesthetic goals
    - Mention that regular appointments help optimise results and overcome challenges
    
    Focus on:
    1. What the numbers mean for this individual's health
    2. Key health insights and observations 
    3. How the four pillars (nutrition, movement, sleep, mental health) apply to them
    4. Why booking regular appointments helps with problem-solving and accountability
    5. Health benefits of achieving their goals (not just weight loss)
    6. Positive reinforcement and encouragement
    
    Always end by encouraging them to book a consultation to discuss their personalised approach to the four pillars and develop a sustainable plan together.
    
    Use Australian healthcare context and terminology. Be supportive, non-judgmental, and professional.`;

    // Create detailed user prompt with all the calculator data
    const userPrompt = `Please interpret these health assessment results:

PERSONAL DETAILS:
- Age: ${inputs.age} years
- Sex: ${inputs.sex}
- Weight: ${inputs.weight} kg
- Height: ${inputs.height} cm
- Waist circumference: ${inputs.waist || 'Not provided'} cm
- Activity level: ${inputs.activityLevel}
- Goal: ${inputs.goal}
- On GLP-1 medication: ${inputs.onGlp1 ? 'Yes' : 'No'}
- Regular exercise: ${inputs.exerciseRegularly ? 'Yes' : 'No'}
- Hot climate: ${inputs.hotClimate ? 'Yes' : 'No'}
- Recent weight loss: ${inputs.recentWeightLoss ? 'Yes' : 'No'}

CALCULATED RESULTS:
- BMI: ${results.bmi}
- BMR (Basal Metabolic Rate): ${results.bmr} calories/day
- TDEE (Total Daily Energy Expenditure): ${results.tdee} calories/day
- Goal calories: ${results.goalCalories} calories/day
- Protein target: ${results.protein}g/day
- Carbohydrates: ${results.carbs}g/day
- Fat: ${results.fat}g/day
- Lean body mass: ${results.leanBodyMass} kg
- Fat mass: ${results.fatMass} kg
- Hydration needs: ${results.hydrationNeeds} litres/day
${results.waistToHeightRatio ? `- Waist-to-height ratio: ${results.waistToHeightRatio}` : ''}
${results.waistRisk ? `- Waist risk assessment: ${results.waistRisk}` : ''}
${results.isLowCalorie ? '- Note: Calories are quite low for this individual' : ''}

Please provide a comprehensive, supportive interpretation focusing on practical health insights and next steps.`;

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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const interpretation = data.choices[0].message.content;

    return new Response(JSON.stringify({ interpretation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-interpret-calculator function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});