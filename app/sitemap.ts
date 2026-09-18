import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getAllDrugs } from "@/lib/drugs";
import { getAllFoods } from "@/lib/foods";
import { PILLAR_SLUG, absoluteUrl, articlePath } from "@/lib/site";

/**
 * Le pagine statiche (home, indici, chi siamo…) cambiano quando cambia il
 * contenuto che elencano: usiamo la data più recente fra articoli, alimenti e
 * farmaci. Mai `new Date()`: un lastmod che cambia a ogni deploy insegna a
 * Google che il campo non è affidabile e lo fa ignorare su tutto il sito.
 */
function latestContentDate(): string {
  const dates = [
    ...getAllArticles().map((a) => a.updatedAt),
    ...getAllFoods().map((f) => f.updatedAt),
    ...getAllDrugs().map((d) => d.updatedAt),
  ].sort();
  return dates[dates.length - 1] ?? "2026-09-04";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDate = latestContentDate();

  // Le landing dei fogli illustrativi (/acari-animali, …) sono noindex: fuori dalla sitemap.
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
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: contentDate,
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
