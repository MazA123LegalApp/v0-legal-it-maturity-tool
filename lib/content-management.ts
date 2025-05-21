import { kv } from "@vercel/kv"

// Content types
export type ContentType = "domain-overview" | "maturity-guide" | "template" | "roadmap" | "playbook-section"

// Content item structure
export interface ContentItem {
  id: string
  type: ContentType
  title: string
  content: string
  domain?: string
  maturityBand?: string
  lastUpdated: string
  updatedBy: string
}

// Function to save content
export async function saveContent(contentItem: ContentItem): Promise<boolean> {
  try {
    // Create a unique key for the content item
    const key = generateContentKey(contentItem)

    // Add timestamp
    contentItem.lastUpdated = new Date().toISOString()

    // Save to KV store
    await kv.set(key, JSON.stringify(contentItem))

    return true
  } catch (error) {
    console.error("Error saving content:", error)
    return false
  }
}

// Function to get content
export async function getContent(
  type: ContentType,
  domain?: string,
  maturityBand?: string,
  id?: string,
): Promise<ContentItem | null> {
  try {
    const key = generateContentKey({ type, domain, maturityBand, id } as ContentItem)
    const content = await kv.get(key)

    if (!content) return null

    return typeof content === "string" ? JSON.parse(content) : (content as ContentItem)
  } catch (error) {
    console.error("Error getting content:", error)
    return null
  }
}

// Function to list content
export async function listContent(type?: ContentType, domain?: string, maturityBand?: string): Promise<ContentItem[]> {
  try {
    // Create a pattern for scanning keys
    let pattern = "content:"
    if (type) pattern += `${type}:`
    if (domain) pattern += `${domain}:`
    if (maturityBand) pattern += `${maturityBand}:`
    pattern += "*"

    // Scan for keys matching the pattern
    const keys = await kv.keys(pattern)

    // Get all content items
    const contentItems: ContentItem[] = []
    for (const key of keys) {
      const content = await kv.get(key)
      if (content) {
        contentItems.push(typeof content === "string" ? JSON.parse(content) : (content as ContentItem))
      }
    }

    return contentItems
  } catch (error) {
    console.error("Error listing content:", error)
    return []
  }
}

// Function to delete content
export async function deleteContent(contentItem: ContentItem): Promise<boolean> {
  try {
    const key = generateContentKey(contentItem)
    await kv.del(key)
    return true
  } catch (error) {
    console.error("Error deleting content:", error)
    return false
  }
}

// Helper function to generate a unique key for a content item
function generateContentKey(contentItem: Partial<ContentItem>): string {
  const { type, domain, maturityBand, id } = contentItem
  let key = "content:"

  if (type) key += `${type}:`
  if (domain) key += `${domain}:`
  if (maturityBand) key += `${maturityBand}:`
  if (id) key += id
  else if (contentItem.title) key += contentItem.title.toLowerCase().replace(/\s+/g, "-")
  else key += Date.now().toString()

  return key
}
