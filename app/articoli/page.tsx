import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { CLUSTER_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";
import { articlePath, formatItDate } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Articoli su solfiti e asma",
  description:
    "Articoli in italiano sulla sensibilità ai solfiti negli asmatici: sintomi, etichette, alimenti, farmaci e vita quotidiana.",
  path: "/articoli",
});

export default function ArticoliIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Archivio
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">Articoli</h1>
      <p className="mt-4 max-w-2xl text-deep/70">
        Guide in linguaggio chiaro, basate su fonti primarie. Ogni pezzo parte
        dalla risposta, poi spiega il perché.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-deep/65">Nessun articolo pubblicato per ora.</p>
      ) : (
        <ul className="mt-10 grid gap-5">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={articlePath(article.slug)}
                className="group block rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  {CLUSTER_LABELS[article.cluster]}
                </p>
                <h2 className="mt-2 font-display text-2xl text-deep group-hover:text-teal-dark">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-deep/60">
                  Aggiornato il {formatItDate(article.updatedAt)} ·{" "}
                  {article.readingMinutes} min
                </p>
                <p className="mt-3 text-sm leading-relaxed text-deep/70">
                  {article.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
