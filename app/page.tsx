import Link from "next/link";
import { LANDING_LIST, SITE } from "@/lib/content";

export default function HomePage() {
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

      <section className="relative mx-auto flex min-h-[78vh] w-full max-w-5xl flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <p className="animate-rise font-display text-5xl tracking-tight text-deep sm:text-7xl md:text-8xl">
          {SITE.name}
        </p>
        <h1 className="animate-rise-delay mt-5 max-w-2xl font-display text-2xl leading-snug text-deep/90 sm:text-3xl">
          {SITE.tagline}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-deep/70 sm:text-lg">
          L&apos;asma allergico non si risolve solo con l&apos;inalatore. Qui trovi
          guide chiare per capire sintomi, trigger e passi concreti — pensate per
          chi si sente perso dopo la visita.
        </p>
        <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
          <a
            href="#guide"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Scegli la tua guida
          </a>
        </div>
      </section>

      <section
        id="guide"
        className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8"
      >
        <h2 className="font-display text-3xl text-deep sm:text-4xl">
          Tre percorsi
        </h2>
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
    </div>
  );
}
