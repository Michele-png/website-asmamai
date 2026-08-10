import Link from "next/link";
import { SITE } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
      <Link
        href="/"
        className="font-display text-2xl tracking-tight text-deep transition hover:text-teal"
      >
        {SITE.name}
      </Link>
      <nav className="flex items-center gap-4 text-sm text-deep/70">
        <Link href="/#guide" className="hover:text-teal">
          Guide
        </Link>
        <Link href="/privacy" className="hover:text-teal">
          Privacy
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-5xl px-5 py-10 text-sm text-deep/55 sm:px-8">
      <div className="flex flex-col gap-2 border-t border-deep/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Contenuti informativi, non
          sostituiscono il parere medico.
        </p>
        <Link href="/privacy" className="hover:text-teal">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
