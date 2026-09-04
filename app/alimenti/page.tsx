import type { Metadata } from "next";
import { FoodTable } from "@/components/FoodTable";
import { LeadMagnet } from "@/components/LeadMagnet";
import { getAllFoods } from "@/lib/foods";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Alimenti con solfiti",
  description:
    "Tabella degli alimenti che possono contenere solfiti: livello, range tipico e codici E. Pensata per chi ha l'asma.",
  path: "/alimenti",
});

export default function AlimentiIndexPage() {
  const foods = getAllFoods();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Database
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">
        Alimenti con solfiti
      </h1>
      <p className="mt-4 max-w-2xl text-deep/70">
        Livelli indicativi da etichette e letteratura, non una soglia clinica.
        Filtra per categoria e livello; ogni riga apre la scheda completa.
      </p>

      {foods.length === 0 ? (
        <p className="mt-10 text-deep/65">Nessuna scheda alimento per ora.</p>
      ) : (
        <div className="mt-8">
          <FoodTable
            foods={foods.map((food) => ({
              slug: food.slug,
              name: food.name,
              category: food.category,
              sulfiteLevel: food.sulfiteLevel,
              typicalRange: food.typicalRange,
              labelCodes: food.labelCodes,
            }))}
          />
        </div>
      )}

      <LeadMagnet />
    </div>
  );
}
