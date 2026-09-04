import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { LANDING_LIST } from "@/lib/content";
import { getAllDrugs } from "@/lib/drugs";
import { getAllFoods } from "@/lib/foods";
import { PILLAR_SLUG, absoluteUrl, articlePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    `/${PILLAR_SLUG}`,
    "/articoli",
    "/alimenti",
    "/farmaci",
    "/chi-siamo",
    "/metodo-editoriale",
    "/contatti",
    "/privacy",
    ...LANDING_LIST.map((landing) => `/${landing.slug}`),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" || path === `/${PILLAR_SLUG}` ? "weekly" : "monthly",
    priority: path === "/" || path === `/${PILLAR_SLUG}` ? 1 : 0.7,
  }));

  const articles = getAllArticles().map((article) => ({
    url: absoluteUrl(articlePath(article.slug)),
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: article.slug === PILLAR_SLUG ? 1 : 0.8,
  }));

  const foods = getAllFoods().map((food) => ({
    url: absoluteUrl(`/alimenti/${food.slug}`),
    lastModified: food.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const drugs = getAllDrugs().map((drug) => ({
    url: absoluteUrl(`/farmaci/${drug.slug}`),
    lastModified: drug.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seen = new Set<string>();
  return [...staticEntries, ...articles, ...foods, ...drugs].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
