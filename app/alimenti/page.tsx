import type { Metadata } from "next";
import { FoodTable } from "@/components/FoodTable";
import { LeadMagnet } from "@/components/LeadMagnet";
import { getAllFoods } from "@/lib/foods";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Alimenti che contengono solfiti: tabella completa (mg/kg, codici E)",
  absoluteTitle: true,
  description:
    "Tabella dei cibi che contengono solfiti: vino, aceto, frutta secca, gamberi, patate e altri 55 alimenti con livello, limite UE in mg/kg e codici E220–E228.",
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
        Alimenti che contengono solfiti: la tabella completa
      </h1>
      <p className="mt-4 max-w-2xl text-deep/70">
        {foods.length} alimenti e bevande con livello indicativo, limite UE in
        mg/kg (Reg. 1333/2008) e codici E220–E228 da cercare in etichetta.
        Livelli da etichette e letteratura, non una soglia clinica. Filtra per
        categoria e livello; ogni riga apre la scheda con la risposta breve.
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
