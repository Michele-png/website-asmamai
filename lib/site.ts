export const SITE = {
  name: "AsmaMai",
  url: "https://asmamai.it",
  tagline: "I trigger dell'asma, spiegati da un paziente",
  description:
    "AsmaMai è la guida italiana indipendente ai fattori che scatenano l'asma: solfiti, farmaci, alimenti e allergeni. Sintomi, tabelle ed evidenze scientifiche, scritte da un paziente e basate su fonti primarie.",
  emailNotifyHint:
    "Entro poche ore riceverai il materiale informativo a questa email.",
  contactEmail: "info@asmamai.it",
  locale: "it_IT",
  language: "it",
  logoPath: "/logo.svg",
} as const;

export const PILLAR_SLUG = "solfiti-e-asma";

// Descrizione del primo percorso (solfiti). Il sito è l'ombrello dei trigger
// dell'asma; i solfiti sono il primo hub, non l'identità del sito.
export const PILLAR_DESCRIPTION =
  "La guida italiana indipendente alla sensibilità ai solfiti per chi ha l'asma: sintomi, alimenti, farmaci ed evidenze scientifiche, scritta da un paziente e basata su fonti primarie.";

export type TriggerHubStatus = "live" | "upcoming";

export type TriggerHub = {
  id: string;
  /** Kicker breve mostrato sopra il titolo. */
  kicker: string;
  title: string;
  text: string;
  status: TriggerHubStatus;
  /** Route del percorso quando è pubblicato. */
  href?: string;
};

/**
 * Percorsi del sito, uno per trigger dell'asma. Aggiungere qui un hub quando
 * il suo pillar è pronto: la home e llms.txt lo leggono da questa lista.
 */
export const TRIGGER_HUBS: TriggerHub[] = [
  {
    id: "solfiti",
    kicker: "Additivi",
    title: "Solfiti",
    text: "Vino, aceto, frutta secca, gamberi e gli eccipienti di autoiniettori e colliri. Il percorso più completo del sito.",
    status: "live",
    href: `/${PILLAR_SLUG}`,
  },
  {
    id: "aspirina-fans",
    kicker: "Farmaci",
    title: "Aspirina e FANS",
    text: "L'asma che peggiora con antinfiammatori e antidolorifici: quali molecole, quali alternative, cosa chiedere al medico.",
    status: "upcoming",
  },
  {
    id: "istamina",
    kicker: "Alimenti",
    title: "Istamina",
    text: "Formaggi stagionati, insaccati, pesce conservato e fermentati: quando gli alimenti ricchi di istamina pesano sull'asma.",
    status: "upcoming",
  },
  {
    id: "acari-animali",
    kicker: "Allergeni ambientali",
    title: "Acari, pollini e animali",
    text: "Polvere di casa, stagioni dei pollini, cani e gatti: riconoscere il trigger e ridurre l'esposizione senza panico.",
    status: "upcoming",
  },
];

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
    // Profili pubblici dell'autore: collegano la Person del sito a una persona verificabile (E-E-A-T).
    sameAs: [
      "https://www.linkedin.com/in/michele-scalzotto",
      "https://github.com/Michele-png",
    ],
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
