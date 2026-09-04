import { ContainsBadge, LevelBadge } from "@/components/LevelBadge";
import type { Drug } from "@/lib/drugs";
import type { Food } from "@/lib/foods";
import { CATEGORY_LABELS } from "@/lib/labels";

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-deep">
      {children}
    </span>
  );
}

export function FoodFactCard({ food }: { food: Food }) {
  return (
    <div className="rounded-2xl border border-deep/10 bg-white/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <LevelBadge level={food.sulfiteLevel} />
        <span className="text-sm text-deep/60">{CATEGORY_LABELS[food.category]}</span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Range tipico
          </dt>
          <dd className="mt-1 text-deep/80">{food.typicalRange}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Perché si aggiungono
          </dt>
          <dd className="mt-1 text-deep/80">{food.whyAdded}</dd>
        </div>
      </dl>
      {food.labelCodes.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Codici E
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {food.labelCodes.map((code) => (
              <Chip key={code}>{code}</Chip>
            ))}
          </div>
        </div>
      ) : null}
      {food.alternatives.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Alternative
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-deep/80">
            {food.alternatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {food.tips.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Consigli
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-deep/80">
            {food.tips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function DrugFactCard({ drug }: { drug: Drug }) {
  return (
    <div className="rounded-2xl border border-deep/10 bg-white/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <ContainsBadge value={drug.containsSulfites} />
        <span className="text-sm text-deep/60">{drug.form}</span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Principio attivo
          </dt>
          <dd className="mt-1 text-deep/80">{drug.activeIngredient}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Eccipiente solfito
          </dt>
          <dd className="mt-1 text-deep/80">{drug.sulfiteExcipient}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
            Rilevanza per l&apos;asma
          </dt>
          <dd className="mt-1 text-deep/80">{drug.relevanceForAsthma}</dd>
        </div>
        {drug.notes ? (
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-deep/45">
              Note
            </dt>
            <dd className="mt-1 text-deep/80">{drug.notes}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
