import type { MetadataRoute } from "next";

const siteUrl = "https://rebootcampna.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/weekend`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
