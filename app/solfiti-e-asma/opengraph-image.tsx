import { getArticleBySlug } from "@/lib/articles";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { PILLAR_SLUG, SITE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const article = getArticleBySlug(PILLAR_SLUG);
  return ogImage({
    kicker: "Guida principale",
    title: article?.title ?? "Solfiti e asma: la guida completa",
    subtitle: article?.description ?? SITE.description,
    badge: article ? `${article.readingMinutes} min` : undefined,
  });
}
