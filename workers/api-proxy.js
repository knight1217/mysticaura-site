/* ===== Cloudflare Worker: API Proxy (CF AI → DeepSeek fallback) =====
 * Primary: Cloudflare Workers AI (free 10K/day)
 * Fallback: DeepSeek API (pay-per-token)
 * Deploy: npx wrangler deploy
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS for our domains + local dev
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
      'https://mysticaura.fun',
      'https://knight1217.github.io',
    ];

    // Allow all localhost + 127.0.0.1 ports (dev), file:// (null origin)
    const isLocal = origin === 'null'
      || origin.startsWith('http://localhost:')
      || origin.startsWith('http://127.0.0.1:');

    const corsOrigin = allowedOrigins.includes(origin) ? origin
      : (isLocal ? origin : allowedOrigins[0]);

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
  const errors = [];

  // ========== ROUTE 1: Cloudflare Workers AI (free) ==========
  try {
    const cfResult = await tryCloudflareAI(body, env);
    if (cfResult) {
      cfResult.engine = 'cf-ai';
      return jsonResponse(cfResult, 200, corsOrigin);
    }
  } catch (e) {
    errors.push('CF_AI: ' + e.message);
    console.log('CF AI failed:', e.message);
  }

  // ========== ROUTE 2: DeepSeek fallback ==========
  try {
    const dsResult = await tryDeepSeekRaw(body, env);
    if (dsResult.ok) {
      const data = dsResult.data;
      if (data.choices) data.engine = 'deepseek';
      return jsonResponse(data, 200, corsOrigin);
    } else {
      errors.push('DeepSeek: ' + (dsResult.error || 'unknown'));
      return jsonResponse({ error: 'All engines failed', details: errors }, 502, corsOrigin);
    }
  } catch (e) {
    errors.push('DeepSeek: ' + e.message);
    return jsonResponse({ error: 'All engines failed', details: errors }, 502, corsOrigin);
  }
}

/* ---- Cloudflare Workers AI ---- */
async function tryCloudflareAI(body, env) {
  // Workers AI needs the AI binding
  if (!env.AI) {
    throw new Error('CF_AI: binding not configured');
  }

  const messages = body.messages || [];
  const temperature = body.temperature || 0.9;
  const max_tokens = body.max_tokens || 800;

  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages,
    temperature,
    max_tokens
  });

  if (!result || !result.response) {
    throw new Error('CF_AI: empty response — ' + JSON.stringify(result));
  }

  // Convert CF AI response → OpenAI-compatible format for frontend
  return {
    choices: [{
      message: { content: result.response }
    }]
  };
}

/* ---- DeepSeek (returns raw result for handleChatProxy) ---- */
async function tryDeepSeekRaw(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return { ok: false, error: 'DEEPSEEK_API_KEY not configured' };
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
    
    if (!resp.ok) {
      return { ok: false, error: `HTTP ${resp.status}: ${JSON.stringify(data)}` };
    }
    
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e.message };
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
