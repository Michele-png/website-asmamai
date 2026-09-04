import { cache } from "react";
import {
  loadMarkdownDir,
  requireDate,
  requireEnum,
  requireSlugMatch,
  requireSources,
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
};

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
