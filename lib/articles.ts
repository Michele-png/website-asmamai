import { cache } from "react";
import {
  loadMarkdownDir,
  optionalReviewer,
  requireDate,
  requireEnum,
  requireFaq,
  requireNumber,
  requireSlugMatch,
  requireSources,
  requireString,
  requireStringArray,
} from "@/lib/markdown";
import { AUTHOR_ID, type AuthorId } from "@/lib/site";

export const ARTICLE_CLUSTERS = [
  "sintomi",
  "meccanismi",
  "diagnosi",
  "alimenti",
  "etichette",
  "farmaci",
  "rimedi",
  "quotidiano",
  "pillar",
] as const;

export type ArticleCluster = (typeof ARTICLE_CLUSTERS)[number];

export type ArticleSource = { title: string; url: string };
export type ArticleFaq = { q: string; a: string };

export type Article = {
  title: string;
  slug: string;
  description: string;
  tldr: string;
  cluster: ArticleCluster;
  publishedAt: string;
  updatedAt: string;
  author: AuthorId;
  reviewer: string | null;
  readingMinutes: number;
  faq: ArticleFaq[];
  sources: ArticleSource[];
  related: string[];
  body: string;
};

function parseArticle(file: ReturnType<typeof loadMarkdownDir>[number]): Article {
  const rel = `articoli/${file.filename}`;
  const slug = requireSlugMatch(file.data, file.slug, rel);
  const author = requireString(file.data, "author", rel);
  if (author !== AUTHOR_ID) {
    throw new Error(
      `content/${rel}: campo "author" deve essere "${AUTHOR_ID}" (trovato "${author}")`,
    );
  }
  return {
    title: requireString(file.data, "title", rel),
    slug,
    description: requireString(file.data, "description", rel),
    tldr: requireString(file.data, "tldr", rel),
    cluster: requireEnum(file.data, "cluster", rel, ARTICLE_CLUSTERS),
    publishedAt: requireDate(file.data, "publishedAt", rel),
    updatedAt: requireDate(file.data, "updatedAt", rel),
    author,
    reviewer: optionalReviewer(file.data, rel),
    readingMinutes: requireNumber(file.data, "readingMinutes", rel),
    faq: requireFaq(file.data, rel),
    sources: requireSources(file.data, rel),
    related: requireStringArray(file.data, "related", rel),
    body: file.body,
  };
}

export const getAllArticles = cache((): Article[] => {
  return loadMarkdownDir("articoli")
    .map(parseArticle)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title, "it"));
});

export const getArticleBySlug = cache((slug: string): Article | null => {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
});

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getRelatedArticles(article: Article): Article[] {
  const bySlug = new Map(getAllArticles().map((item) => [item.slug, item]));
  return article.related
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Article => Boolean(item));
}

export function getLatestArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}
