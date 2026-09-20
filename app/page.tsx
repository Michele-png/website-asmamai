import Link from "next/link";
import { Byline } from "@/components/Byline";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnet } from "@/components/LeadMagnet";
import { getAllArticles, getLatestArticles } from "@/lib/articles";
import { LANDING_LIST } from "@/lib/content";
import { latestContentDate } from "@/lib/dates";
import { getAllDrugs } from "@/lib/drugs";
import { getAllFoods } from "@/lib/foods";
import { CLUSTER_LABELS } from "@/lib/labels";
import { homeJsonLd } from "@/lib/seo";
import {
  AUTHOR_ID,
  AUTHORS,
  PILLAR_SLUG,
  SITE,
  TRIGGER_HUBS,
  articlePath,
  formatItDate,
} from "@/lib/site";

const author = AUTHORS[AUTHOR_ID];

/*
 * FAQ della home: risposte autonome (40–80 parole) che spiegano cos'è il sito,
 * chi scrive e come si scelgono le fonti. Sono i segnali E-E-A-T che i tool
 * GEO/AEO non trovavano in home. Niente diagnosi, niente terapia (AGENTS.md).
 */
function homeFaq(counts: { articles: number; foods: number; drugs: number }) {
  return [
    {
      q: "Cos'è AsmaMai?",
      a: `AsmaMai è una guida italiana indipendente ai fattori che possono scatenare l'asma: solfiti, farmaci, alimenti e allergeni ambientali. Per ogni trigger raccoglie una guida, tabelle di alimenti o farmaci e le fonti primarie (PubMed, EFSA, AIFA, regolamenti UE). Non vende prodotti e non ospita pubblicità. Il primo percorso pubblicato riguarda i solfiti; gli altri arrivano uno alla volta.`,
    },
    {
      q: "Chi scrive i contenuti?",
      a: `I testi sono scritti da ${author.name}, paziente asmatico con sensibilità ai solfiti e formazione statistica e informatica. Non è un medico: il sito informa e aiuta a preparare la visita, non formula diagnosi né indica terapie. Ogni pagina riporta autore, data di pubblicazione o aggiornamento e l'elenco delle fonti.`,
    },
    {
      q: "Quali trigger dell'asma copre il sito?",
      a: `Oggi il percorso completo è quello sui solfiti (E220–E228): una guida, ${counts.articles} articoli, ${counts.foods} schede alimenti e ${counts.drugs} schede farmaci. In preparazione: aspirina e FANS, istamina, acari, pollini e animali. Ogni percorso ha la stessa struttura, così le informazioni si confrontano facilmente.`,
    },
    {
      q: "I contenuti sono revisionati da un medico?",
      a: `Non ancora. Quando un medico revisiona un testo, il suo nome compare in pagina sotto l'autore, nella riga «Revisione medica»; finché quella riga manca, il testo è firmato solo dal paziente che lo ha scritto. Il metodo editoriale spiega come funziona la revisione e come segnalare un errore.`,
    },
    {
      q: "Come vengono scelte le fonti?",
      a: `Preferiamo documenti che si possono aprire e verificare: studi su PubMed, pareri EFSA, fogli illustrativi e RCP nella Banca Dati Farmaci AIFA, regolamenti UE sull'etichettatura (1169/2011) e sugli additivi (1333/2008). Blog e riassunti commerciali non sono fonti. Ogni articolo elenca le fonti in fondo, con link diretto al documento.`,
    },
  ];
}

export default function HomePage() {
  const latest = getLatestArticles(6);
  const updatedAt = latestContentDate();
  const faq = homeFaq({
    articles: getAllArticles().length,
    foods: getAllFoods().length,
    drugs: getAllDrugs().length,
  });

  return (
    <div className="relative overflow-hidden">
      <JsonLd data={homeJsonLd({ faq, dateModified: updatedAt })} />
      <div
        className="hero-orb animate-breathe -left-24 top-10 size-72 bg-[#b9dde8]"
        aria-hidden
      />
      <div
        className="hero-orb animate-breathe right-[-4rem] top-40 size-80 bg-[#c8e8df]"
        style={{ animationDelay: "1.5s" }}
        aria-hidden
      />

      <section className="relative mx-auto flex min-h-[72vh] w-full max-w-5xl flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <p className="animate-rise font-display text-2xl tracking-tight text-teal sm:text-3xl">
          {SITE.name}
        </p>
        <h1 className="animate-rise-delay mt-4 max-w-3xl font-display text-4xl leading-tight text-deep sm:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-deep/70 sm:text-lg">
          {SITE.heroLead}
        </p>
        <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${PILLAR_SLUG}`}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Inizia dai solfiti
          </Link>
          <Link
            href="/alimenti"
            className="rounded-xl border border-deep/15 bg-white/80 px-5 py-3 text-sm font-semibold text-deep transition hover:border-accent/40"
          >
            Tabella alimenti
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="chi-scrive"
        className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8"
      >
        <div className="rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
            Chi scrive
          </p>
          <h2 id="chi-scrive" className="mt-2 font-display text-2xl text-deep sm:text-3xl">
            Un paziente che cita le fonti, non un medico
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-deep/75">
            {SITE.name} è scritto da{" "}
            <Link
              href="/chi-siamo"
              rel="author"
              className="font-medium text-deep underline decoration-accent/40 underline-offset-2 hover:text-teal"
            >
              {author.name}
            </Link>
            , {author.role.replace(/^Fondatore di AsmaMai, /, "")}. Ogni pagina
            parte dalla risposta, cita studi su PubMed, pareri EFSA, fogli
            illustrativi AIFA e regolamenti UE, e mostra autore e data di
            aggiornamento. Nessuna diagnosi, nessuna indicazione di terapia:
            quelle restano al tuo medico.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Byline authorId={AUTHOR_ID} updatedAt={updatedAt} variant="page" />
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-teal">
              <Link href="/chi-siamo" className="hover:text-teal-dark">
                Chi siamo →
              </Link>
              <Link href="/metodo-editoriale" className="hover:text-teal-dark">
                Metodo editoriale →
              </Link>
              <a href={`mailto:${SITE.contactEmail}`} className="hover:text-teal-dark">
                {SITE.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          Primo percorso
        </p>
        <h2 className="mt-2 font-display text-3xl text-deep sm:text-4xl">
          Solfiti e asma
        </h2>
        <p className="mt-3 max-w-2xl text-deep/70">
          Il trigger più sottovalutato e il più documentato del sito: una guida,
          una tabella alimenti e una tabella farmaci con gli eccipienti da
          controllare.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StartCard
            href={`/${PILLAR_SLUG}`}
            kicker="Guida"
            title="La guida completa"
            text="Il quadro: sintomi, meccanismi, etichette e cosa fare nel quotidiano."
          />
          <StartCard
            href="/alimenti"
            kicker="Alimenti"
            title="Cosa contiene solfiti"
            text="Vino, aceto, frutta secca, gamberi: livello, range e codici E."
          />
          <StartCard
            href="/farmaci"
            kicker="Farmaci"
            title="Eccipienti da controllare"
            text="Autoiniettori, colliri e soluzioni: cosa dice il foglietto."
          />
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          I percorsi
        </p>
        <h2 className="mt-2 font-display text-3xl text-deep sm:text-4xl">
          Un percorso per ogni trigger
        </h2>
        <p className="mt-3 max-w-2xl text-deep/70">
          Ogni fattore che può scatenare l&apos;asma ha la stessa struttura:
          una guida, tabelle di alimenti o farmaci e le evidenze. Partiamo dai
          solfiti; gli altri arrivano uno alla volta.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRIGGER_HUBS.map((hub) => (
            <HubCard key={hub.id} hub={hub} />
          ))}
        </div>
      </section>

      {latest.length > 0 ? (
        <section className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
          <h2 className="font-display text-3xl text-deep sm:text-4xl">Articoli recenti</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {latest.map((article) => (
              <Link
                key={article.slug}
                href={articlePath(article.slug)}
                className="rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-accent/40 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  {CLUSTER_LABELS[article.cluster]}
                </p>
                <h3 className="mt-2 font-display text-xl text-deep">{article.title}</h3>
                <p className="mt-2 text-xs text-deep/55">
                  {formatItDate(article.updatedAt)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-deep/70">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section
        id="guide"
        className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8"
      >
        <h2 className="font-display text-3xl text-deep sm:text-4xl">Tre percorsi</h2>
        <p className="mt-3 max-w-2xl text-deep/70">
          Tre fogli illustrativi gratuiti per chi ha asma allergica. Lascia la
          mail: prepariamo il foglio e te lo inviamo entro poche ore.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {LANDING_LIST.map((landing, index) => (
            <Link
              key={landing.slug}
              href={`/${landing.slug}`}
              className="group animate-drift rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-accent/40 hover:bg-white"
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                {landing.shortLabel}
              </p>
              <h3 className="mt-3 font-display text-xl leading-snug text-deep group-hover:text-teal-dark">
                {landing.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-deep/65">
                {landing.description.slice(0, 120)}…
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-accent">
                Continua →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-3xl px-5 pb-4 sm:px-8">
        <Faq items={faq} />
      </section>

      <section className="relative mx-auto w-full max-w-3xl px-5 pb-20 sm:px-8">
        <LeadMagnet />
      </section>
    </div>
  );
}

function StartCard({
  href,
  kicker,
  title,
  text,
}: {
  href: string;
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-accent/40 hover:bg-white"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        {kicker}
      </p>
      <h3 className="mt-3 font-display text-xl text-deep group-hover:text-teal-dark">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-deep/65">{text}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-accent">
        Apri →
      </span>
    </Link>
  );
}

function HubCard({ hub }: { hub: (typeof TRIGGER_HUBS)[number] }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          {hub.kicker}
        </p>
        {hub.status === "upcoming" ? (
          <span className="rounded-full border border-deep/10 px-2 py-0.5 text-[11px] font-medium text-deep/55">
            In preparazione
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-xl text-deep group-hover:text-teal-dark">
        {hub.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-deep/65">{hub.text}</p>
      {hub.status === "live" ? (
        <span className="mt-5 inline-flex text-sm font-semibold text-accent">
          Apri →
        </span>
      ) : null}
    </>
  );

  if (hub.status === "live" && hub.href) {
    return (
      <Link
        href={hub.href}
        className="group rounded-2xl border border-accent/30 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-accent/60 hover:bg-white"
      >
        {body}
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-deep/15 bg-white/40 p-6">
      {body}
    </div>
  );
}
