export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' })
  }

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' })
  }

  try {
    let systemInstruction = null
    const contents = []

    for (const msg of messages) {
      if (msg.role === 'system') {
        systemInstruction = { parts: [{ text: msg.content }] }
      } else if (msg.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: msg.content }] })
      } else if (msg.role === 'assistant') {
        contents.push({ role: 'model', parts: [{ text: msg.content }] })
      }
    }

    const body = { contents }
    if (systemInstruction) body.systemInstruction = systemInstruction

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', error)
      return res.status(502).json({ error: 'AI service error' })
    }

    const data = await response.json()

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI' })
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
