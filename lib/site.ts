export const SITE = {
  name: "AsmaMai",
  url: "https://asmamai.it",
  tagline: "Solfiti e asma: guida indipendente",
  description:
    "AsmaMai è la guida italiana indipendente alla sensibilità ai solfiti per chi ha l'asma: sintomi, alimenti, farmaci ed evidenze scientifiche, scritta da un paziente e basata su fonti primarie.",
  emailNotifyHint:
    "Entro poche ore riceverai il materiale informativo a questa email.",
  contactEmail: "info@asmamai.it",
  locale: "it_IT",
  language: "it",
  logoPath: "/logo.svg",
} as const;

export const PILLAR_SLUG = "solfiti-e-asma";

export const AUTHOR_ID = "michele-scalzotto" as const;

export type AuthorId = typeof AUTHOR_ID;

export type Author = {
  id: AuthorId;
  name: string;
  role: string;
  sameAs: string[];
};

export const AUTHORS: Record<AuthorId, Author> = {
  "michele-scalzotto": {
    id: "michele-scalzotto",
    name: "Michele Scalzotto",
    role: "Fondatore di AsmaMai, paziente asmatico con sensibilità ai solfiti",
    sameAs: [],
  },
};

export const ORGANIZATION = {
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logoPath}`,
  description: SITE.description,
} as const;

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE.url}${path}`;
}

export function articlePath(slug: string): string {
  return slug === PILLAR_SLUG ? `/${PILLAR_SLUG}` : `/articoli/${slug}`;
}

export function articleUrl(slug: string): string {
  return absoluteUrl(articlePath(slug));
}

export function isPillarSlug(slug: string): boolean {
  return slug === PILLAR_SLUG;
}

export function formatItDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
