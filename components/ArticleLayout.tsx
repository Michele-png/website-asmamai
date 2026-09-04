import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Sources } from "@/components/Sources";
import { Tldr } from "@/components/Tldr";
import { AUTHORS, formatItDate } from "@/lib/site";
import type { BreadcrumbItem, JsonLdNode } from "@/lib/seo";

type RelatedItem = { href: string; title: string };

type Props = {
  breadcrumbs: BreadcrumbItem[];
  jsonLd: JsonLdNode | JsonLdNode[];
  kicker?: string;
  title: string;
  tldr: string;
  publishedAt?: string;
  updatedAt: string;
  authorId?: string;
  reviewer?: string | null;
  readingMinutes?: number;
  factCard?: ReactNode;
  children: ReactNode;
  faq?: { q: string; a: string }[];
  sources?: { title: string; url: string }[];
  related?: RelatedItem[];
  showLead?: boolean;
};

export function ArticleLayout({
  breadcrumbs,
  jsonLd,
  kicker,
  title,
  tldr,
  publishedAt,
  updatedAt,
  authorId,
  reviewer,
  readingMinutes,
  factCard,
  children,
  faq,
  sources,
  related,
  showLead = true,
}: Props) {
  const author = authorId === "michele-scalzotto" ? AUTHORS["michele-scalzotto"] : null;

  return (
    <article className="relative mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <JsonLd data={jsonLd} />
      <div
        className="hero-orb animate-breathe right-0 top-0 size-64 bg-[#cfe8ef]"
        aria-hidden
      />
      <Breadcrumbs items={breadcrumbs} />
      {kicker ? (
        <p className="animate-rise mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          {kicker}
        </p>
      ) : null}
      <h1 className="animate-rise-delay mt-3 font-display text-3xl leading-tight text-deep sm:text-5xl">
        {title}
      </h1>
      <Tldr>{tldr}</Tldr>
      <p className="mt-5 text-sm text-deep/60">
        {author ? <span>{author.name}</span> : null}
        {author && (publishedAt || updatedAt) ? " · " : null}
        {publishedAt ? <>Pubblicato il {formatItDate(publishedAt)}</> : null}
        {publishedAt && updatedAt ? " · " : null}
        Aggiornato il {formatItDate(updatedAt)}
        {readingMinutes ? ` · ${readingMinutes} min di lettura` : null}
      </p>
      {reviewer ? (
        <p className="mt-1 text-sm text-deep/60">Revisione medica: {reviewer}</p>
      ) : null}

      {factCard ? <div className="mt-8">{factCard}</div> : null}

      <div className="mt-8">{children}</div>

      {faq ? <Faq items={faq} /> : null}
      {sources ? <Sources items={sources} /> : null}

      {related && related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-deep">Articoli correlati</h2>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-teal hover:text-teal-dark"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-10 text-sm text-deep/55">
        Contenuto informativo. Non sostituisce diagnosi, terapia o indicazioni del
        tuo medico. In caso di crisi o peggioramento, cerca assistenza medica.
      </p>

      {showLead ? <LeadMagnet /> : null}
    </article>
  );
}
