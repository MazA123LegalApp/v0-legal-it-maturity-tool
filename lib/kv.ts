const kvUrl = process.env.KV_REST_API_URL!
const kvToken = process.env.KV_REST_API_TOKEN!

export async function kvSet(key: string, value: any) {
  return await fetch(`${kvUrl}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  })
}

export async function kvGet(key: string): Promise<any | null> {
  const res = await fetch(`${kvUrl}/get/${key}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kvToken}`,
    },
    next: { revalidate: 0 }, // always fetch fresh
  })
  if (!res.ok) return null
  const { result } = await res.json()
  return result ?? null
}
