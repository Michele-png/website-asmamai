import Link from "next/link";
import { PILLAR_SLUG } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl text-deep">Pagina non trovata</h1>
      <p className="mt-4 text-deep/70">
        Il link è rotto o la scheda non è ancora online. Riparti da qui:
      </p>
      <ul className="mt-8 space-y-3">
        <li>
          <Link href={`/${PILLAR_SLUG}`} className="font-semibold text-teal hover:text-teal-dark">
            Guida: solfiti e asma
          </Link>
        </li>
        <li>
          <Link href="/articoli" className="text-teal hover:text-teal-dark">
            Articoli
          </Link>
        </li>
        <li>
          <Link href="/alimenti" className="text-teal hover:text-teal-dark">
            Alimenti
          </Link>
        </li>
        <li>
          <Link href="/farmaci" className="text-teal hover:text-teal-dark">
            Farmaci
          </Link>
        </li>
        <li>
          <Link href="/" className="text-teal hover:text-teal-dark">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}
