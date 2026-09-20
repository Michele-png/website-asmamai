import { cache } from "react";
import { getAllArticles } from "@/lib/articles";
import { getAllDrugs } from "@/lib/drugs";
import { getAllFoods } from "@/lib/foods";

/**
 * Data più recente fra articoli, alimenti e farmaci. La usano la sitemap
 * (lastmod delle pagine statiche), la home ("Ultimo aggiornamento") e lo
 * schema WebPage della home. Mai `new Date()`: una data che cambia a ogni
 * deploy insegna ai motori che il campo non è affidabile.
 */
export const latestContentDate = cache((): string => {
  const dates = [
    ...getAllArticles().map((a) => a.updatedAt),
    ...getAllFoods().map((f) => f.updatedAt),
    ...getAllDrugs().map((d) => d.updatedAt),
  ].sort();
  return dates[dates.length - 1] ?? "2026-09-04";
});
