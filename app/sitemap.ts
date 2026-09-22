import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://academy.twomindsengine.com", changeFrequency: "monthly", priority: 1 }];
}
