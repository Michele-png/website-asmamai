import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/ArticleLayout";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { CLUSTER_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";
import { articlePageJsonLd } from "@/lib/seo";
import { PILLAR_SLUG, SITE, articlePath } from "@/lib/site";

const FALLBACK_TITLE = "Solfiti e asma: capire, riconoscere, evitare le crisi";
const FALLBACK_DESCRIPTION = SITE.description;

export function generateMetadata(): Metadata {
  const article = getArticleBySlug(PILLAR_SLUG);
  if (!article) {
    return pageMetadata({
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
      path: `/${PILLAR_SLUG}`,
    });
  }
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/${PILLAR_SLUG}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default function PillarPage() {
  const article = getArticleBySlug(PILLAR_SLUG);

  if (!article) {
    return (
      <article className="relative mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Guida principale
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-deep sm:text-5xl">
          {FALLBACK_TITLE}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-deep/75">{SITE.description}</p>
        <p className="mt-5 text-deep/70">
          Questa guida sta per essere pubblicata. Intanto puoi consultare le
          schede su alimenti, farmaci e gli articoli già online.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/alimenti"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Alimenti con solfiti
          </Link>
          <Link
            href="/farmaci"
            className="rounded-xl border border-deep/15 bg-white/80 px-5 py-3 text-sm font-semibold text-deep hover:border-accent/40"
          >
            Farmaci con solfiti
          </Link>
          <Link href="/articoli" className="rounded-xl px-5 py-3 text-sm font-semibold text-teal">
            Articoli →
          </Link>
        </div>
      </article>
    );
  }

  const related = getRelatedArticles(article).map((item) => ({
    href: articlePath(item.slug),
    title: item.title,
  }));
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guida", href: `/${PILLAR_SLUG}` },
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
