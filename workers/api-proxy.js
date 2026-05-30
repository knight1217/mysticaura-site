/* ===== Cloudflare Worker: API Proxy =====
 * Protects Gemini API Key + enforces IP-based rate limiting
 * Deploy: npx wrangler deploy
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS for our domains
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
      'https://mysticaura.fun',
      'https://knight1217.github.io',
      'http://localhost:8765',
      'http://localhost:8080'
    ];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
      });
    }

    // Gemini proxy endpoint
    if (url.pathname === '/api/gemini' && request.method === 'POST') {
      return handleGeminiProxy(request, env, corsOrigin);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleGeminiProxy(request, env, corsOrigin) {
  // IP rate limiting
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const today = new Date().toISOString().split('T')[0];

  // Simple rate limit using KV (optional — remove if no KV binding)
  if (env.MYSTIC_RATE) {
    const key = `rate:${ip}:${today}`;
    const count = parseInt(await env.MYSTIC_RATE.get(key) || '0');
    if (count >= 30) {
      return new Response(JSON.stringify({ error: 'Daily limit reached. Try again tomorrow!' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
      });
    }
    await env.MYSTIC_RATE.put(key, String(count + 1), { expirationTtl: 86400 });
  }

  const body = await request.json();
  const geminiKey = env.GEMINI_API_KEY;

  if (!geminiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
    });
  }

  const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + geminiKey;

  try {
    const resp = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Upstream API error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
    });
  }
}
