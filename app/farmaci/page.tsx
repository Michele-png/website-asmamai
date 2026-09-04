import type { Metadata } from "next";
import { DrugTable } from "@/components/DrugTable";
import { LeadMagnet } from "@/components/LeadMagnet";
import { getAllDrugs } from "@/lib/drugs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Farmaci con solfiti",
  description:
    "Farmaci rilevanti per chi ha asma e sensibilità ai solfiti: eccipienti, forma farmaceutica e foglio illustrativo.",
  path: "/farmaci",
});

export default function FarmaciIndexPage() {
  const drugs = getAllDrugs();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Database
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">
        Farmaci con solfiti
      </h1>
      <p className="mt-4 max-w-2xl text-deep/70">
        Dati dal foglio illustrativo e dalle banche dati regolatorie. Non
        sospendere un farmaco senza il medico: questa tabella serve a fare
        domande, non a sostituire la prescrizione.
      </p>

      {drugs.length === 0 ? (
        <p className="mt-10 text-deep/65">Nessuna scheda farmaco per ora.</p>
      ) : (
        <div className="mt-8">
          <DrugTable
            drugs={drugs.map((drug) => ({
              slug: drug.slug,
              name: drug.name,
              activeIngredient: drug.activeIngredient,
              form: drug.form,
              containsSulfites: drug.containsSulfites,
              sulfiteExcipient: drug.sulfiteExcipient,
            }))}
          />
        </div>
      )}

      <LeadMagnet />
    </div>
  );
}
