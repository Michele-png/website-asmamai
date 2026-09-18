import { cache } from "react";
import {
  fieldError,
  loadMarkdownDir,
  optionalStringArray,
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
  /** Nomi commerciali verificati nel testo (es. Bentelan): entrano in title, H1 e schema Drug.alternateName. */
  aliases: string[];
};

const CONTAINS_HINT: Record<ContainsSulfites, string> = {
  si: "Sì",
  no: "No",
  variabile: "Dipende",
};

/** "Soluzioni per aerosol (nebulizzazione)" → "Soluzioni per aerosol" */
function stripParens(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

/** "Betametasone iniettabile (Bentelan)"; con alias la parentesi del nome lascia il posto ai marchi. */
export function drugDisplayName(drug: Pick<Drug, "name" | "aliases">): string {
  if (drug.aliases.length === 0) return drug.name;
  return `${stripParens(drug.name)} (${drug.aliases.slice(0, 3).join(", ")})`;
}

/** "Betametasone iniettabile (Bentelan) contiene solfiti?" */
export function drugQuestion(drug: Pick<Drug, "name" | "aliases">): string {
  return `${drugDisplayName(drug)} contiene solfiti?`;
}

/** Title tag: domanda + risposta secca. Sotto i 60 caratteri privilegia il nome commerciale. */
export function drugTitle(drug: Pick<Drug, "name" | "aliases" | "containsSulfites">): string {
  const hint = CONTAINS_HINT[drug.containsSulfites];
  const candidates = [
    `${drugQuestion(drug)} ${hint}`,
    ...(drug.aliases.length > 0
      ? [`${drug.aliases[0]} (${stripParens(drug.name)}) contiene solfiti? ${hint}`]
      : []),
    `${stripParens(drug.name)} contiene solfiti? ${hint}`,
  ];
  return candidates.find((c) => c.length <= 60) ?? candidates[candidates.length - 1];
}

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
    aliases: optionalStringArray(file.data, "aliases", rel),
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

/** Altri farmaci: prima la stessa forma farmaceutica, poi lo stesso esito sui solfiti. */
export function getRelatedDrugs(drug: Drug, limit = 6): Drug[] {
  const all = getAllDrugs().filter((item) => item.slug !== drug.slug);
  const sameForm = all.filter((item) => item.form === drug.form);
  const sameOutcome = all.filter(
    (item) => item.form !== drug.form && item.containsSulfites === drug.containsSulfites,
  );
  return [...sameForm, ...sameOutcome].slice(0, limit);
}
