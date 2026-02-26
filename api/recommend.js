export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenRouter API key not configured on server' });
  }

  // Try multiple free models in order — if one fails, try the next
  const models = [
    'mistralai/mistral-7b-instruct:free',
    'google/gemma-3-4b-it:free',
    'qwen/qwen3-4b:free',
  ];

  let lastError = '';

  for (const model of models) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer':  'https://mood-cinema-five.vercel.app',
          'X-Title':       'MoodCinema',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1500,
          temperature: 0.7,
        })
      });

      const rawText = await response.text();
      let data;
      try { data = JSON.parse(rawText); } catch(e) { continue; }

      // If rate limited, try next model
      if (response.status === 429 || data?.error?.code === 429) {
        lastError = `${model} rate limited`;
        continue;
      }

      if (!response.ok) {
        lastError = `${model} error: ${response.status}`;
        continue;
      }

      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) {
        lastError = `${model} returned empty`;
        continue;
      }

      // Success!
      return res.status(200).json({ content: [{ text }] });

    } catch (err) {
      lastError = err.message;
      continue;
    }
  }

  // All models failed
  return res.status(502).json({
    error: `All AI models are busy right now. Please try again in a moment. (${lastError})`
  });
}
