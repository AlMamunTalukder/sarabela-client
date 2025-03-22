import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/private/", "/dashboard/", "/*.json$", "/*.xml$"],
    },
    sitemap: "https://sarabelanews24.com/sitemap.xml",
    host: "https://sarabelanews24.com",
  }
}

