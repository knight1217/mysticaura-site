/* ===== Cloudflare Worker: API Proxy (CF AI → DeepSeek fallback) =====
 * Primary: Cloudflare Workers AI (free 10K/day)
 * Fallback: DeepSeek API (pay-per-token)
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
      return new Response(JSON.stringify({ status: 'ok', engine: 'cf-ai' }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
      });
    }

    // Chat proxy: CF AI first, DeepSeek fallback
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleChatProxy(request, env, corsOrigin);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleChatProxy(request, env, corsOrigin) {
  // IP rate limit (50 req/day per IP, optional)
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const today = new Date().toISOString().split('T')[0];

  if (env.MYSTIC_RATE) {
    const key = `rate:${ip}:${today}`;
    const count = parseInt(await env.MYSTIC_RATE.get(key) || '0');
    if (count >= 50) {
      return jsonResponse({ error: 'Daily limit reached. Try again tomorrow!' }, 429, corsOrigin);
    }
    await env.MYSTIC_RATE.put(key, String(count + 1), { expirationTtl: 86400 });
  }

  const body = await request.json();

  // ========== ROUTE 1: Cloudflare Workers AI (free) ==========
  try {
    const cfResult = await tryCloudflareAI(body, env);
    if (cfResult) {
      return jsonResponse(cfResult, 200, corsOrigin);
    }
  } catch (e) {
    console.log('CF AI failed, falling back to DeepSeek:', e.message);
  }

  // ========== ROUTE 2: DeepSeek fallback ==========
  return tryDeepSeek(body, env, corsOrigin);
}

/* ---- Cloudflare Workers AI ---- */
async function tryCloudflareAI(body, env) {
  // Workers AI needs the AI binding
  if (!env.AI) {
    throw new Error('AI binding not configured');
  }

  const messages = body.messages || [];
  const temperature = body.temperature || 0.9;
  const max_tokens = body.max_tokens || 800;

  const result = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages,
    temperature,
    max_tokens
  });

  if (!result || !result.response) {
    throw new Error('Empty CF AI response');
  }

  // Convert CF AI response → OpenAI-compatible format for frontend
  return {
    choices: [{
      message: { content: result.response }
    }]
  };
}

/* ---- DeepSeek fallback ---- */
async function tryDeepSeek(body, env, corsOrigin) {
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'API key not configured' }, 500, corsOrigin);
  }

  if (!body.model) {
    body.model = 'deepseek-chat';
  }

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    return jsonResponse(data, resp.status, corsOrigin);
  } catch (e) {
    return jsonResponse({ error: 'Upstream API error' }, 502, corsOrigin);
  }
}

/* ---- Helpers ---- */
function jsonResponse(data, status, corsOrigin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin
    }
  });
}
