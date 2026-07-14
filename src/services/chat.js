const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat'

export async function sendMessage(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) {
    throw new Error('Failed to get response')
  }

  const data = await res.json()
  return data.reply
}
