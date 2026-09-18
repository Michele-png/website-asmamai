import { cache } from "react";
import {
  loadMarkdownDir,
  requireDate,
  requireEnum,
  requireSlugMatch,
  requireSources,
  optionalBoolean,
  requireString,
  requireStringArray,
} from "@/lib/markdown";

export const FOOD_CATEGORIES = [
  "bevande",
  "frutta",
  "verdura",
  "pesce",
  "carne",
  "condimenti",
  "dolci",
  "conserve",
  "altro",
] as const;

export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

export const SULFITE_LEVELS = [
  "alto",
  "medio",
  "basso",
  "variabile",
  "assente",
] as const;

export type SulfiteLevel = (typeof SULFITE_LEVELS)[number];

export type FoodSource = { title: string; url: string };

export type Food = {
  name: string;
  slug: string;
  category: FoodCategory;
  sulfiteLevel: SulfiteLevel;
  typicalRange: string;
  labelCodes: string[];
  whyAdded: string;
  answer: string;
  alternatives: string[];
  tips: string[];
  updatedAt: string;
  sources: FoodSource[];
  body: string;
  /** Il nome è grammaticalmente plurale ("Gamberi", "Uova")? Decide il verbo in titolo e H1. */
  plural: boolean;
};

// Nomi al plurale che l'euristica non coglie (slug).
const PLURAL_SLUGS = new Set(["uova", "hamburger-confezionati"]);
// Nomi al singolare che finiscono in -e (l'euristica li leggerebbe come plurali).
const SINGULAR_SLUGS = new Set(["carne-fresca", "maionese", "senape", "pesce-fresco"]);

function inferPlural(name: string, slug: string): boolean {
  if (PLURAL_SLUGS.has(slug)) return true;
  if (SINGULAR_SLUGS.has(slug)) return false;
  if (/\se\s/.test(name)) return true; // "Pane e pasta", "Dado e brodo"
  const head = name.split(/\s+/)[0].toLowerCase();
  return /[ie]$/.test(head); // Gamberi, Formaggi, Albicocche, Patate
}

/** Verbo accordato: "contiene" / "contengono". */
export function foodVerb(food: Pick<Food, "plural">): string {
  return food.plural ? "contengono" : "contiene";
}

/** Domanda che l'utente digita: "Gamberi contengono solfiti?" */
export function foodQuestion(food: Pick<Food, "name" | "plural">): string {
  return `${food.name} ${foodVerb(food)} solfiti?`;
}

const LEVEL_HINT: Record<SulfiteLevel, string> = {
  alto: "Sì, spesso molti",
  medio: "Spesso sì",
  basso: "Poco o nulla",
  variabile: "Dipende",
  assente: "No",
};

/**
 * Title tag come domanda + risposta, entro ~60 caratteri.
 * "Aceto contiene solfiti? Spesso sì · AsmaMai"
 */
export function foodTitle(food: Pick<Food, "name" | "plural" | "sulfiteLevel" | "typicalRange">): string {
  const base = `${foodQuestion(food)} ${LEVEL_HINT[food.sulfiteLevel]}`;
  const range = food.typicalRange.replace(/\s*\(.*$/, "").trim();
  const withRange = range && !/^n\.?d\.?$/i.test(range) ? `${base}, ${range}` : base;
  if (withRange.length <= 60) return withRange;
  return base;
}

function parseFood(file: ReturnType<typeof loadMarkdownDir>[number]): Food {
  const rel = `alimenti/${file.filename}`;
  return {
    name: requireString(file.data, "name", rel),
    slug: requireSlugMatch(file.data, file.slug, rel),
    category: requireEnum(file.data, "category", rel, FOOD_CATEGORIES),
    sulfiteLevel: requireEnum(file.data, "sulfiteLevel", rel, SULFITE_LEVELS),
    typicalRange: requireString(file.data, "typicalRange", rel),
    labelCodes: requireStringArray(file.data, "labelCodes", rel),
    whyAdded: requireString(file.data, "whyAdded", rel),
    answer: requireString(file.data, "answer", rel),
    alternatives: requireStringArray(file.data, "alternatives", rel),
    tips: requireStringArray(file.data, "tips", rel),
    updatedAt: requireDate(file.data, "updatedAt", rel),
    sources: requireSources(file.data, rel),
    body: file.body,
    plural: optionalBoolean(file.data, "plural") ?? inferPlural(
      requireString(file.data, "name", rel),
      file.slug,
    ),
  };
}

export const getAllFoods = cache((): Food[] => {
  return loadMarkdownDir("alimenti")
    .map(parseFood)
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
});

export const getFoodBySlug = cache((slug: string): Food | null => {
  return getAllFoods().find((food) => food.slug === slug) ?? null;
});

export function getAllFoodSlugs(): string[] {
  return getAllFoods().map((food) => food.slug);
}

/** Altre schede della stessa categoria (per il blocco "Altri alimenti" e per la crawlabilità). */
export function getRelatedFoods(food: Food, limit = 6): Food[] {
  const all = getAllFoods().filter((item) => item.slug !== food.slug);
  const sameCategory = all.filter((item) => item.category === food.category);
  const sameLevel = all.filter(
    (item) => item.category !== food.category && item.sulfiteLevel === food.sulfiteLevel,
  );
  return [...sameCategory, ...sameLevel].slice(0, limit);
}
