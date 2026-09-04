import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { LANDINGS, LANDING_LIST, type LandingSlug } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LANDING_LIST.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = LANDINGS[slug as LandingSlug];
  if (!landing) return {};
  return pageMetadata({
    title: landing.title,
    description: landing.description,
    path: `/${landing.slug}`,
  });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = LANDINGS[slug as LandingSlug];
  if (!landing) notFound();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <div
        className="hero-orb animate-breathe right-0 top-0 size-64 bg-[#cfe8ef]"
        aria-hidden
      />

      <p className="animate-rise text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        {landing.shortLabel}
      </p>
      <h1 className="animate-rise-delay mt-3 max-w-3xl font-display text-3xl leading-tight text-deep sm:text-5xl">
        {landing.headline}
      </h1>
      <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-deep/75 sm:text-lg">
        {landing.description}
      </p>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise-delay">
          <h2 className="font-display text-2xl text-deep">Cosa troverai nel foglio</h2>
          <ul className="mt-5 space-y-3">
            {landing.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-deep/8 bg-white/60 px-4 py-3 text-deep/80"
              >
                <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-deep/55">
            Contenuto informativo. Non sostituisce diagnosi, terapia o indicazioni
            del tuo medico.
          </p>
        </div>

        <div className="animate-rise-delay-2">
          <LeadForm landing={landing.slug} sheetName={landing.sheetName} />
        </div>
      </div>
    </div>
  );
}
