import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { CLUSTER_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";
import { articlePageJsonLd } from "@/lib/seo";
import { articlePath, isPillarSlug } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs()
    .filter((slug) => !isPillarSlug(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isPillarSlug(slug)) {
    return pageMetadata({
      title: "Solfiti e asma",
      description: "Guida principale: solfiti e asma.",
      path: "/solfiti-e-asma",
    });
  }
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: articlePath(article.slug),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  if (isPillarSlug(slug)) {
    permanentRedirect("/solfiti-e-asma");
  }
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article).map((item) => ({
    href: articlePath(item.slug),
    title: item.title,
  }));
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Articoli", href: "/articoli" },
    { name: article.title, href: articlePath(article.slug) },
  ];

  return (
    <ArticleLayout
      breadcrumbs={breadcrumbs}
      jsonLd={articlePageJsonLd(article, breadcrumbs)}
      kicker={CLUSTER_LABELS[article.cluster]}
      title={article.title}
      tldr={article.tldr}
      publishedAt={article.publishedAt}
      updatedAt={article.updatedAt}
      authorId={article.author}
      reviewer={article.reviewer}
      readingMinutes={article.readingMinutes}
      faq={article.faq}
      sources={article.sources}
      related={related}
    >
      <MarkdownBody content={article.body} />
    </ArticleLayout>
  );
}
