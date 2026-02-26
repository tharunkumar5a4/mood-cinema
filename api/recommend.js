// api/recommend.js
// ─────────────────────────────────────────────
// Vercel Serverless Function — Anthropic Proxy
// Your API key lives here (in Vercel env vars)
// The frontend NEVER sees the key
// ─────────────────────────────────────────────

export default async function handler(req, res) {

  // ── Only allow POST requests ──────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Read the prompt sent from the frontend ────
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt' });
  }

  // ── Call Anthropic using the secret key ───────
  // process.env.ANTHROPIC_API_KEY is set in Vercel dashboard
  // It is NEVER sent to the browser
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY,
        'anthropic-version':    '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic error:', errText);
      return res.status(502).json({ error: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
