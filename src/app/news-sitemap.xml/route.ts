import { NextResponse } from "next/server"

export async function GET() {
  // Fetch all your articles
  // This is a placeholder - replace with your actual data fetching logic
  const articles = await fetchAllArticles()

  // Generate the XML content
  const xml = generateNewsSitemapXml(articles)

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

// Placeholder function - replace with your actual data fetching
async function fetchAllArticles() {
  // This should be replaced with your actual data fetching logic
  // For example, querying your database or API
  return [
    // Example article format
    // {
    //   slug: 'example-article',
    //   category: 'bangladesh',
    //   title: 'Example Article Title',
    //   publishedAt: '2023-01-01T00:00:00Z',
    // }
  ]
}

function generateNewsSitemapXml(articles: any[]) {
  const baseUrl = "https://sarabelanews24.com"

  // XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n'

  // Add entries for each article
  articles.forEach((article) => {
    const pubDate = new Date(article.publishedAt)
    const formattedPubDate = pubDate.toISOString()

    xml += "  <url>\n"
    xml += `    <loc>${baseUrl}/${article.category}/${article.slug}</loc>\n`
    xml += "    <news:news>\n"
    xml += "      <news:publication>\n"
    xml += "        <news:name>সারাবেলা নিউজ ২৪</news:name>\n"
    xml += "        <news:language>bn</news:language>\n"
    xml += "      </news:publication>\n"
    xml += `      <news:publication_date>${formattedPubDate}</news:publication_date>\n`
    xml += `      <news:title>${escapeXml(article.title)}</news:title>\n`
    xml += "    </news:news>\n"
    xml += "  </url>\n"
  })

  // Close the XML
  xml += "</urlset>"

  return xml
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}

