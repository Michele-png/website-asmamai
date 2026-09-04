import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contatti",
  description: `Come contattare ${SITE.name}: ${SITE.contactEmail}.`,
  path: "/contatti",
});

export default function ContattiPage() {
  return (
    <article className="relative mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Contatti
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">Scrivici</h1>
      <p className="mt-5 text-lg leading-relaxed text-deep/75">
        Per segnalazioni, correzioni di etichette o richieste stampa:
      </p>
      <p className="mt-6">
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="font-display text-2xl text-teal hover:text-teal-dark"
        >
          {SITE.contactEmail}
        </a>
      </p>
      <p className="mt-8 text-sm text-deep/60">
        Non è un canale di consulenza medica. Per sintomi acuti rivolgiti al tuo
        medico o al pronto soccorso.
      </p>
    </article>
  );
}
