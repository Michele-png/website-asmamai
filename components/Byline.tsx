import Link from "next/link";
import { AUTHORS, formatItDate, type AuthorId } from "@/lib/site";

type Props = {
  authorId?: AuthorId | string;
  publishedAt?: string;
  updatedAt: string;
  readingMinutes?: number;
  /** "Ultimo aggiornamento" invece di "Aggiornato il" (home e indici). */
  variant?: "article" | "page";
  className?: string;
};

/*
 * Riga autore + date. L'autore è un link alla pagina /chi-siamo con il ruolo
 * accanto al nome; le date stanno in <time dateTime> così motori e modelli
 * linguistici le leggono come date e non come testo. Il ruolo non è un titolo
 * sanitario (vedi AGENTS.md): resta "paziente asmatico", mai "educatore" o
 * "coach".
 */
export function Byline({
  authorId,
  publishedAt,
  updatedAt,
  readingMinutes,
  variant = "article",
  className,
}: Props) {
  const author = authorId && authorId in AUTHORS ? AUTHORS[authorId as AuthorId] : null;
  const updatedLabel = variant === "page" ? "Ultimo aggiornamento" : "Aggiornato il";

  return (
    <div className={`text-sm text-deep/60 ${className ?? ""}`}>
      {author ? (
        <p>
          <span className="text-deep/50">Di </span>
          <Link
            href="/chi-siamo"
            rel="author"
            className="font-medium text-deep/80 underline decoration-accent/40 underline-offset-2 hover:text-teal"
          >
            {author.name}
          </Link>
          <span className="text-deep/50"> · {author.role}</span>
        </p>
      ) : null}
      <p className={author ? "mt-1" : undefined}>
        {publishedAt ? (
          <>
            Pubblicato il{" "}
            <time dateTime={publishedAt}>{formatItDate(publishedAt)}</time>
            {" · "}
          </>
        ) : null}
        {updatedLabel} <time dateTime={updatedAt}>{formatItDate(updatedAt)}</time>
        {readingMinutes ? ` · ${readingMinutes} min di lettura` : null}
      </p>
    </div>
  );
}
