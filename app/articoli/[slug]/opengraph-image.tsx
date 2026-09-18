import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import { CLUSTER_LABELS } from "@/lib/labels";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { isPillarSlug } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllArticleSlugs()
    .filter((slug) => !isPillarSlug(slug))
    .map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return ogImage({
    kicker: CLUSTER_LABELS[article.cluster],
    title: article.title,
    subtitle: article.description,
    badge: `${article.readingMinutes} min`,
  });
}
