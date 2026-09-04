import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { graphJsonLd, personJsonLd } from "@/lib/seo";
import { AUTHORS, SITE } from "@/lib/site";

const author = AUTHORS["michele-scalzotto"];

export const metadata: Metadata = pageMetadata({
  title: "Chi siamo",
  description: `${author.name}, ${author.role}. ${SITE.description}`,
  path: "/chi-siamo",
});

export default function ChiSiamoPage() {
  return (
    <article className="relative mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <JsonLd data={graphJsonLd(personJsonLd())} />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Chi siamo
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">
        Un paziente, non un brand di integratori
      </h1>
      <div className="prose-asma mt-8">
        <p>
          Mi chiamo {author.name}. Ho l&apos;asma e una sensibilità ai solfiti
          che, per anni, ho faticato a nominare: i sintomi c&apos;erano, le
          etichette erano un geroglifico, e tra una visita e l&apos;altra restava
          un vuoto di spiegazioni pratiche.
        </p>
        <p>
          {SITE.name} nasce da lì. Non vendo prodotti, non ho un integratore da
          spingere, non sostituisco lo specialista. Il sito esiste per mettere in
          italiano, con fonti primarie, quello che un asmatico si chiede di
          fronte a un vino, un aceto, un foglietto illustrativo o un attacco che
          arriva «senza motivo».
        </p>
        <p>
          Il metodo è dichiarato: PubMed, EFSA, AIFA, regolamenti UE. Quando un
          revisore medico sarà coinvolto, il suo nome comparirà in pagina. Fino
          ad allora i testi restano firmati da un paziente che ha fatto il lavoro
          di sintesi — e che sbaglia, aggiorna, corregge.
        </p>
        <p>
          Se vuoi scrivere:{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </div>
    </article>
  );
}
