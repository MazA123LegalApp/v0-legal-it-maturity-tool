import { Redis } from "@upstash/redis"

export const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function kvSet(key: string, value: unknown) {
  return kv.set(key, value)
}

export async function kvGet<T = unknown>(key: string): Promise<T | null> {
  return kv.get<T>(key)
}
