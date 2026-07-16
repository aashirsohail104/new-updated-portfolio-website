const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat'

export async function sendMessage(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Failed to get response')
  }

  return data.reply
}
