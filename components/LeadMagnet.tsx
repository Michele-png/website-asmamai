import { LeadForm } from "@/components/LeadForm";
import { LEAD_OFFERS } from "@/lib/content";

type Props = {
  className?: string;
};

const offer = LEAD_OFFERS.solfiti;

export function LeadMagnet({ className }: Props) {
  return (
    <section className={`mt-14 ${className ?? ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        Lista stampabile
      </p>
      <h2 className="mt-2 font-display text-2xl text-deep">
        Lista stampabile: alimenti e farmaci con solfiti (PDF)
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-deep/70">
        Una tabella da tenere in cucina e in valigia: alimenti ad alto rischio,
        codici E in etichetta e farmaci con metabisolfito. Te la mandiamo via
        email, non è un download immediato.
      </p>
      <div className="mt-5">
        <LeadForm
          landing="solfiti"
          sheetName={offer.sheetName}
          submitLabel="Ricevi la lista in PDF"
        />
      </div>
    </section>
  );
}
