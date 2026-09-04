import Link from "next/link";
import { LeadMagnet } from "@/components/LeadMagnet";
import { getLatestArticles } from "@/lib/articles";
import { LANDING_LIST } from "@/lib/content";
import { CLUSTER_LABELS } from "@/lib/labels";
import { PILLAR_SLUG, SITE, articlePath, formatItDate } from "@/lib/site";

export default function HomePage() {
  const latest = getLatestArticles(6);

  return (
    <div className="relative overflow-hidden">
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
          Solfiti e asma: capire, riconoscere, evitare le crisi
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-deep/70 sm:text-lg">
          {SITE.description}
        </p>
        <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${PILLAR_SLUG}`}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Leggi la guida
          </Link>
          <Link
            href="/alimenti"
            className="rounded-xl border border-deep/15 bg-white/80 px-5 py-3 text-sm font-semibold text-deep transition hover:border-accent/40"
          >
            Tabella alimenti
          </Link>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
        <h2 className="font-display text-3xl text-deep sm:text-4xl">Inizia da qui</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StartCard
            href={`/${PILLAR_SLUG}`}
            kicker="Guida"
            title="Solfiti e asma"
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
          Alla fine della guida Canva trovi questi stessi tre approfondimenti.
          Lascia la mail: prepariamo il foglio illustrativo e te lo inviamo entro
          poche ore.
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
