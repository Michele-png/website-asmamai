import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: `Informativa privacy di ${SITE.name}: come trattiamo l'email raccolta per i fogli illustrativi.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-deep">Privacy</h1>
      <p className="mt-4 text-deep/70">Ultimo aggiornamento: agosto 2026</p>

      <div className="prose-asma mt-8 space-y-5 text-deep/80 leading-relaxed">
        <p>
          {SITE.name} ({" "}
          <a className="underline" href="https://asmamai.it">
            asmamai.it
          </a>
          ) raccoglie l&apos;indirizzo email solo quando lo inserisci
          volontariamente per ricevere un foglio illustrativo informativo.
        </p>

        <h2 className="font-display text-2xl text-deep">Titolare</h2>
        <p>
          Il titolare del trattamento è il gestore del sito {SITE.name}. Per
          richieste privacy puoi rispondere all&apos;email con cui ti
          contatteremo dopo la richiesta del foglio.
        </p>

        <h2 className="font-display text-2xl text-deep">Dati trattati</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Indirizzo email</li>
          <li>Landing / tema richiesto (es. allergeni ambientali)</li>
          <li>Data e ora della richiesta</li>
          <li>Consenso espresso tramite checkbox</li>
        </ul>

        <h2 className="font-display text-2xl text-deep">Finalità</h2>
        <p>
          Inviarvi il materiale informativo richiesto e, se necessario,
          chiarimenti legati a quell&apos;invio. Non vendiamo i dati a terzi a
          fini commerciali.
        </p>

        <h2 className="font-display text-2xl text-deep">Base giuridica</h2>
        <p>Consenso dell&apos;interessato (art. 6 GDPR).</p>

        <h2 className="font-display text-2xl text-deep">Conservazione</h2>
        <p>
          Conserviamo l&apos;email per il tempo necessario a evadere la
          richiesta e a gestire eventuali follow-up correlati, salvo obblighi di
          legge diversi. Puoi chiedere la cancellazione in qualsiasi momento.
        </p>

        <h2 className="font-display text-2xl text-deep">Diritti</h2>
        <p>
          Hai diritto di accesso, rettifica, cancellazione, limitazione,
          opposizione e portabilità, e di proporre reclamo al Garante Privacy.
        </p>

        <h2 className="font-display text-2xl text-deep">Nota sanitaria</h2>
        <p>
          I contenuti del sito sono informativi. Non costituiscono diagnosi o
          prescrizione. In caso di emergenza o peggioramento dei sintomi, contatta
          subito un medico o i servizi di emergenza.
        </p>
      </div>
    </article>
  );
}
