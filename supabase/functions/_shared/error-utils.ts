// Shared error handling utilities for Supabase Edge Functions

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

export function getErrorStack(error: unknown): string {
  if (error instanceof Error) {
    return error.stack || '';
  }
  return '';
}

export function createErrorResponse(
  error: unknown, 
  corsHeaders: Record<string, string>,
  status: number = 500
): Response {
  const errorMessage = getErrorMessage(error);
  console.error('Error:', errorMessage);
  
  return new Response(JSON.stringify({ error: errorMessage }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}