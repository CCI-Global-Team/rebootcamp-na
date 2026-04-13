import content from "@/data/content.json"

// Re-export the full typed content object as a hook for consistency
export function useSiteContent() {
  return content;
}

// Also export the raw content for direct imports
export { content as siteContent };

// Convenience type export derived from the JSON shape
export type SiteContent = typeof content;
