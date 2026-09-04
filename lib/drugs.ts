import { cache } from "react";
import {
  fieldError,
  loadMarkdownDir,
  requireDate,
  requireSlugMatch,
  requireSources,
  requireString,
} from "@/lib/markdown";

export const CONTAINS_SULFITES = ["si", "no", "variabile"] as const;
export type ContainsSulfites = (typeof CONTAINS_SULFITES)[number];

export type DrugSource = { title: string; url: string };

export type Drug = {
  name: string;
  slug: string;
  activeIngredient: string;
  form: string;
  containsSulfites: ContainsSulfites;
  sulfiteExcipient: string;
  relevanceForAsthma: string;
  answer: string;
  notes: string;
  updatedAt: string;
  sources: DrugSource[];
  body: string;
};

function parseContainsSulfites(
  data: Record<string, unknown>,
  file: string,
): ContainsSulfites {
  const value = data.containsSulfites;
  // YAML 1.1 parses unquoted `no` as boolean false.
  if (value === false) return "no";
  if (value === true) return "si";
  if (typeof value === "string" && CONTAINS_SULFITES.includes(value as ContainsSulfites)) {
    return value as ContainsSulfites;
  }
  throw fieldError(
    file,
    "containsSulfites",
    'valori ammessi: si | no | variabile (mettere "no" tra virgolette in YAML)',
  );
}

function parseDrug(file: ReturnType<typeof loadMarkdownDir>[number]): Drug {
  const rel = `farmaci/${file.filename}`;
  return {
    name: requireString(file.data, "name", rel),
    slug: requireSlugMatch(file.data, file.slug, rel),
    activeIngredient: requireString(file.data, "activeIngredient", rel),
    form: requireString(file.data, "form", rel),
    containsSulfites: parseContainsSulfites(file.data, rel),
    sulfiteExcipient: requireString(file.data, "sulfiteExcipient", rel),
    relevanceForAsthma: requireString(file.data, "relevanceForAsthma", rel),
    answer: requireString(file.data, "answer", rel),
    notes: requireString(file.data, "notes", rel),
    updatedAt: requireDate(file.data, "updatedAt", rel),
    sources: requireSources(file.data, rel),
    body: file.body,
  };
}

export const getAllDrugs = cache((): Drug[] => {
  return loadMarkdownDir("farmaci")
    .map(parseDrug)
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
});

export const getDrugBySlug = cache((slug: string): Drug | null => {
  return getAllDrugs().find((drug) => drug.slug === slug) ?? null;
});

export function getAllDrugSlugs(): string[] {
  return getAllDrugs().map((drug) => drug.slug);
}