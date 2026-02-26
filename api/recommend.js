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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured on server' });
  }

  try {
    // Use gemini-1.5-flash — most reliable free model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      })
    });

    // Log full response for debugging
    const rawText = await response.text();

    if (!response.ok) {
      console.error('Gemini HTTP error:', response.status, rawText);
      return res.status(502).json({
        error: `Gemini error ${response.status}: ${rawText.slice(0, 200)}`
      });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch(e) {
      console.error('Failed to parse Gemini response:', rawText);
      return res.status(502).json({ error: 'Invalid JSON from Gemini' });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      console.error('Empty Gemini response:', JSON.stringify(data));
      return res.status(502).json({ error: 'Empty response from Gemini — try again.' });
    }

    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}