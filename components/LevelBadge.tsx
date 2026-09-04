import type { ContainsSulfites } from "@/lib/drugs";
import type { SulfiteLevel } from "@/lib/foods";
import { CONTAINS_LABELS, SULFITE_LEVEL_LABELS } from "@/lib/labels";

const LEVEL_CLASS: Record<SulfiteLevel, string> = {
  alto: "bg-[color-mix(in_srgb,var(--danger)_16%,white)] text-[var(--danger)]",
  medio: "bg-[#f7e7c8] text-[#8a5a12]",
  basso: "bg-[#d7eee6] text-teal-dark",
  variabile: "bg-sky-100 text-deep/80",
  assente: "bg-[#e8f6f2] text-teal",
};

const CONTAINS_CLASS: Record<ContainsSulfites, string> = {
  si: "bg-[color-mix(in_srgb,var(--danger)_16%,white)] text-[var(--danger)]",
  no: "bg-[#e8f6f2] text-teal",
  variabile: "bg-sky-100 text-deep/80",
};

export function LevelBadge({ level }: { level: SulfiteLevel }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_CLASS[level]}`}
    >
      {SULFITE_LEVEL_LABELS[level]}
    </span>
  );
}

export function ContainsBadge({ value }: { value: ContainsSulfites }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${CONTAINS_CLASS[value]}`}
    >
      {CONTAINS_LABELS[value]}
    </span>
  );
}
