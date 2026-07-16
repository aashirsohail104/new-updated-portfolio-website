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

  const body = {
    contents,
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.95,
      topK: 40,
    },
  }
  if (systemInstruction) body.systemInstruction = systemInstruction

  const model = 'gemini-3.1-flash-lite'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }

  let attempt = 0
  const maxRetries = 2

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url, fetchOptions)

      if (response.status === 429 && attempt < maxRetries) {
        attempt++
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000)
        console.warn(`Gemini API rate-limited (attempt ${attempt}), retrying in ${delay}ms`)
        await new Promise((r) => setTimeout(r, delay))
        continue
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Gemini API error:', errorText)
        let errorMessage = 'AI service error'
        try {
          const errJson = JSON.parse(errorText)
          if (errJson.error?.message) {
            errorMessage = errJson.error.message
          }
        } catch {}
        return res.status(502).json({ error: errorMessage })
      }

      const data = await response.json()
      const candidate = data.candidates?.[0]
      const reply = candidate?.content?.parts?.[0]?.text

      if (!reply) {
        const reason = candidate?.finishReason || 'unknown'
        console.error('Gemini empty reply, finishReason:', reason, JSON.stringify(data))
        return res.status(502).json({
          error:
            reason === 'SAFETY'
              ? 'Response blocked by safety filters. Please rephrase your question.'
              : 'Empty response from AI',
        })
      }

      return res.status(200).json({ reply })
    } catch (err) {
      if (attempt < maxRetries) {
        attempt++
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000)
        console.warn(`Gemini API network error (attempt ${attempt}), retrying in ${delay}ms:`, err.message)
        await new Promise((r) => setTimeout(r, delay))
        continue
      }
      console.error('Chat API error:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
