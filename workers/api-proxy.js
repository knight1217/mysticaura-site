/* ===== Cloudflare Worker: API Proxy =====
 * Protects DeepSeek API Key + enforces IP-based rate limiting
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

    // DeepSeek chat proxy endpoint
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleDeepSeekProxy(request, env, corsOrigin);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleDeepSeekProxy(request, env, corsOrigin) {
  // IP rate limiting (optional KV-based, 50 req/day per IP)
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const today = new Date().toISOString().split('T')[0];

  if (env.MYSTIC_RATE) {
    const key = `rate:${ip}:${today}`;
    const count = parseInt(await env.MYSTIC_RATE.get(key) || '0');
    if (count >= 50) {
      return new Response(JSON.stringify({ error: 'Daily limit reached. Try again tomorrow!' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
      });
    }
    await env.MYSTIC_RATE.put(key, String(count + 1), { expirationTtl: 86400 });
  }

  const body = await request.json();
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
    });
  }

  // Ensure model is set
  if (!body.model) {
    body.model = 'deepseek-chat';
  }

  const deepseekUrl = 'https://api.deepseek.com/v1/chat/completions';

  try {
    const resp = await fetch(deepseekUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
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
