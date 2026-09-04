"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LevelBadge } from "@/components/LevelBadge";
import type { FoodCategory, SulfiteLevel } from "@/lib/foods";
import { CATEGORY_LABELS, SULFITE_LEVEL_LABELS } from "@/lib/labels";

export type FoodRow = {
  slug: string;
  name: string;
  category: FoodCategory;
  sulfiteLevel: SulfiteLevel;
  typicalRange: string;
  labelCodes: string[];
};

const ALL = "tutti";

export function FoodTable({ foods }: { foods: FoodRow[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [level, setLevel] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods.filter((food) => {
      if (category !== ALL && food.category !== category) return false;
      if (level !== ALL && food.sulfiteLevel !== level) return false;
      if (q && !food.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [foods, category, level, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block text-sm text-deep/80">
          Cerca
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome alimento"
            className="mt-1 w-full rounded-xl border border-deep/15 bg-white/80 px-3 py-2 text-deep outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 sm:w-56"
          />
        </label>
        <label className="block text-sm text-deep/80">
          Categoria
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-deep/15 bg-white/80 px-3 py-2 text-deep outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            <option value={ALL}>Tutte</option>
            {(Object.keys(CATEGORY_LABELS) as FoodCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORY_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-deep/80">
          Livello solfiti
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 w-full rounded-xl border border-deep/15 bg-white/80 px-3 py-2 text-deep outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            <option value={ALL}>Tutti</option>
            {(Object.keys(SULFITE_LEVEL_LABELS) as SulfiteLevel[]).map((key) => (
              <option key={key} value={key}>
                {SULFITE_LEVEL_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-deep/10 bg-white/70">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-sky-100/70 text-deep">
            <tr>
              <th className="px-4 py-3 font-semibold">Alimento</th>
              <th className="px-4 py-3 font-semibold">Categoria</th>
              <th className="px-4 py-3 font-semibold">Livello</th>
              <th className="px-4 py-3 font-semibold">Range tipico</th>
              <th className="px-4 py-3 font-semibold">Codici E</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((food) => (
              <tr key={food.slug} className="border-t border-deep/8">
                <td className="px-4 py-3">
                  <Link
                    href={`/alimenti/${food.slug}`}
                    className="font-medium text-teal hover:text-teal-dark"
                  >
                    {food.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-deep/75">
                  {CATEGORY_LABELS[food.category]}
                </td>
                <td className="px-4 py-3">
                  <LevelBadge level={food.sulfiteLevel} />
                </td>
                <td className="px-4 py-3 text-deep/75">{food.typicalRange}</td>
                <td className="px-4 py-3 text-deep/75">
                  {food.labelCodes.length > 0 ? food.labelCodes.join(", ") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-sm text-deep/60">Nessun alimento corrisponde ai filtri.</p>
        ) : null}
      </div>
    </div>
  );
}
