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

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Authorization':  `Bearer ${apiKey}`,
        'HTTP-Referer':   'https://mood-cinema-five.vercel.app',
        'X-Title':        'MoodCinema',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
      })
    });

    const rawText = await response.text();

    if (!response.ok) {
      console.error('OpenRouter error:', response.status, rawText);
      return res.status(502).json({
        error: `OpenRouter error ${response.status}: ${rawText.slice(0, 200)}`
      });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch(e) {
      return res.status(502).json({ error: 'Invalid JSON from OpenRouter' });
    }

    const text = data?.choices?.[0]?.message?.content || '';

    if (!text) {
      console.error('Empty OpenRouter response:', JSON.stringify(data));
      return res.status(502).json({ error: 'Empty response — please try again.' });
    }

    // Return in same shape frontend expects
    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
