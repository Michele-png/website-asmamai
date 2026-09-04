import Link from "next/link";
import { PILLAR_SLUG, SITE } from "@/lib/site";

const NAV = [
  { href: `/${PILLAR_SLUG}`, label: "Guida" },
  { href: "/articoli", label: "Articoli" },
  { href: "/alimenti", label: "Alimenti" },
  { href: "/farmaci", label: "Farmaci" },
  { href: "/chi-siamo", label: "Chi siamo" },
];

const FOOTER = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/metodo-editoriale", label: "Metodo editoriale" },
  { href: "/contatti", label: "Contatti" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <Link
        href="/"
        className="font-display text-2xl tracking-tight text-deep transition hover:text-teal"
      >
        {SITE.name}
      </Link>
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-deep/70">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-teal">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-5xl px-5 py-10 text-sm text-deep/55 sm:px-8">
      <div className="flex flex-col gap-4 border-t border-deep/10 pt-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-md">
          © {new Date().getFullYear()} {SITE.name}. Contenuti informativi, non
          sostituiscono diagnosi o terapia. In caso di crisi, cerca assistenza
          medica.
        </p>
        <nav className="flex flex-col gap-2 sm:items-end">
          {FOOTER.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-teal">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
