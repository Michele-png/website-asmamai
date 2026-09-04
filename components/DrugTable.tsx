"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ContainsBadge } from "@/components/LevelBadge";
import type { ContainsSulfites } from "@/lib/drugs";
import { CONTAINS_LABELS } from "@/lib/labels";

export type DrugRow = {
  slug: string;
  name: string;
  activeIngredient: string;
  form: string;
  containsSulfites: ContainsSulfites;
  sulfiteExcipient: string;
};

const ALL = "tutti";

export function DrugTable({ drugs }: { drugs: DrugRow[] }) {
  const [contains, setContains] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drugs.filter((drug) => {
      if (contains !== ALL && drug.containsSulfites !== contains) return false;
      if (
        q &&
        !drug.name.toLowerCase().includes(q) &&
        !drug.activeIngredient.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [drugs, contains, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block text-sm text-deep/80">
          Cerca
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome o principio attivo"
            className="mt-1 w-full rounded-xl border border-deep/15 bg-white/80 px-3 py-2 text-deep outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 sm:w-64"
          />
        </label>
        <label className="block text-sm text-deep/80">
          Solfiti
          <select
            value={contains}
            onChange={(e) => setContains(e.target.value)}
            className="mt-1 w-full rounded-xl border border-deep/15 bg-white/80 px-3 py-2 text-deep outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            <option value={ALL}>Tutti</option>
            {(Object.keys(CONTAINS_LABELS) as ContainsSulfites[]).map((key) => (
              <option key={key} value={key}>
                {CONTAINS_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-deep/10 bg-white/70">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-sky-100/70 text-deep">
            <tr>
              <th className="px-4 py-3 font-semibold">Farmaco</th>
              <th className="px-4 py-3 font-semibold">Principio attivo</th>
              <th className="px-4 py-3 font-semibold">Forma</th>
              <th className="px-4 py-3 font-semibold">Solfiti</th>
              <th className="px-4 py-3 font-semibold">Eccipiente</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((drug) => (
              <tr key={drug.slug} className="border-t border-deep/8">
                <td className="px-4 py-3">
                  <Link
                    href={`/farmaci/${drug.slug}`}
                    className="font-medium text-teal hover:text-teal-dark"
                  >
                    {drug.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-deep/75">{drug.activeIngredient}</td>
                <td className="px-4 py-3 text-deep/75">{drug.form}</td>
                <td className="px-4 py-3">
                  <ContainsBadge value={drug.containsSulfites} />
                </td>
                <td className="px-4 py-3 text-deep/75">{drug.sulfiteExcipient}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-sm text-deep/60">Nessun farmaco corrisponde ai filtri.</p>
        ) : null}
      </div>
    </div>
  );
}
