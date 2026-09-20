import { getAllArticles } from "@/lib/articles";
import { latestContentDate } from "@/lib/dates";
import { SITE, articleUrl } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rfc822(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 6)).toUTCString();
}

/**
 * Feed RSS 2.0 degli articoli, ordinati per data di aggiornamento. Aiuta la
 * scoperta da parte di Bing (che alimenta ChatGPT search e Copilot) e dei
 * lettori di feed. Statico: si rigenera a ogni build come la sitemap.
 */
export function GET() {
  const items = getAllArticles()
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl(article.slug)}</link>
      <guid isPermaLink="true">${articleUrl(article.slug)}</guid>
      <pubDate>${rfc822(article.publishedAt)}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} · ${SITE.tagline}`)}</title>
    <link>${SITE.url}</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE.description)}</description>
    <language>it-it</language>
    <lastBuildDate>${rfc822(latestContentDate())}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
