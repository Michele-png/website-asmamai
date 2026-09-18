import { ContainsBadge, LevelBadge } from "@/components/LevelBadge";
import type { Drug } from "@/lib/drugs";
import type { Food } from "@/lib/foods";
import { CATEGORY_LABELS, CONTAINS_LABELS, SULFITE_LEVEL_LABELS } from "@/lib/labels";

/*
 * Le schede sono tabelle HTML vere (<table>), non <dl>: i dati strutturati in
 * tabella sono quelli che motori e modelli linguistici estraggono e citano più
 * volentieri per "X contiene solfiti?". Il badge resta per la lettura umana.
 */

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-deep">
      {children}
    </span>
  );
}

type Row = { label: string; value: React.ReactNode; text: string };

function FactTable({ caption, rows }: { caption: string; rows: Row[] }) {
  return (
    <table className="mt-4 w-full border-collapse text-sm">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-deep/8 align-top">
            <th
              scope="row"
              className="w-[38%] py-2.5 pr-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-deep/45"
            >
              {row.label}
            </th>
            <td className="py-2.5 text-deep/80">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-deep/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function FoodFactCard({ food }: { food: Food }) {
  const rows: Row[] = [
    {
      label: "Solfiti",
      text: SULFITE_LEVEL_LABELS[food.sulfiteLevel],
      value: (
        <span className="flex flex-wrap items-center gap-2">
          <LevelBadge level={food.sulfiteLevel} />
          <span className="text-deep/60">{CATEGORY_LABELS[food.category]}</span>
        </span>
      ),
    },
    { label: "Range tipico / limite UE", text: food.typicalRange, value: food.typicalRange },
    {
      label: "Codici E in etichetta",
      text: food.labelCodes.join(", "),
      value:
        food.labelCodes.length > 0 ? (
          <span className="flex flex-wrap gap-2">
            {food.labelCodes.map((code) => (
              <Chip key={code}>{code}</Chip>
            ))}
          </span>
        ) : (
          "nessuno"
        ),
    },
    { label: "Perché si aggiungono", text: food.whyAdded, value: food.whyAdded },
  ];

  return (
    <div className="rounded-2xl border border-deep/10 bg-white/80 p-5 shadow-sm">
      <FactTable caption={`${food.name}: solfiti in sintesi`} rows={rows} />
      <ListBlock title="Alternative" items={food.alternatives} />
      <ListBlock title="Consigli" items={food.tips} />
    </div>
  );
}

export function DrugFactCard({ drug }: { drug: Drug }) {
  const rows: Row[] = [
    {
      label: "Contiene solfiti?",
      text: CONTAINS_LABELS[drug.containsSulfites],
      value: (
        <span className="flex flex-wrap items-center gap-2">
          <ContainsBadge value={drug.containsSulfites} />
          <span className="text-deep/60">{drug.form}</span>
        </span>
      ),
    },
    { label: "Principio attivo", text: drug.activeIngredient, value: drug.activeIngredient },
    ...(drug.aliases.length > 0
      ? [
          {
            label: "Nomi commerciali verificati",
            text: drug.aliases.join(", "),
            value: drug.aliases.join(", "),
          },
        ]
      : []),
    { label: "Eccipiente solfito", text: drug.sulfiteExcipient, value: drug.sulfiteExcipient },
    {
      label: "Rilevanza per l'asma",
      text: drug.relevanceForAsthma,
      value: drug.relevanceForAsthma,
    },
    ...(drug.notes ? [{ label: "Note", text: drug.notes, value: drug.notes }] : []),
  ];

  return (
    <div className="rounded-2xl border border-deep/10 bg-white/80 p-5 shadow-sm">
      <FactTable caption={`${drug.name}: solfiti in sintesi`} rows={rows} />
    </div>
  );
}
