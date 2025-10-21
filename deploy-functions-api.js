// Deploy Supabase Functions via Management API
// This is how Lovable deploys without Docker

const SUPABASE_ACCESS_TOKEN = 'YOUR_SUPABASE_ACCESS_TOKEN'; // Get from https://supabase.com/dashboard/account/tokens
const PROJECT_REF = 'pooebqhsshfafkhvccrl';

async function deployFunction(name, code) {
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/functions/${name}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        verify_jwt: false,
        import_map: true,
        entrypoint_path: 'index.ts',
        import_map_path: 'import_map.json',
        body: code
      })
    }
  );

  const result = await response.json();
  console.log(`Deployed ${name}:`, result);
}

// Read function code
const fs = require('fs');

const functions = [
  'generate-blog-sitemap',
  'blog-rss', 
  'ping-google-sitemap'
];

functions.forEach(async (funcName) => {
  const code = fs.readFileSync(`./supabase/functions/${funcName}/index.ts`, 'utf8');
  await deployFunction(funcName, code);
});