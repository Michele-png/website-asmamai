export type LandingSlug =
  | "acari-animali"
  | "allergie-alimentari"
  | "asma-allergico";

export type LandingConfig = {
  slug: LandingSlug;
  title: string;
  shortLabel: string;
  headline: string;
  description: string;
  bullets: string[];
  sheetName: string;
};

export const SITE = {
  name: "AsmaMai",
  tagline: "Orientarsi quando l'asma non è sotto controllo",
  emailNotifyHint:
    "Entro poche ore riceverai il foglio illustrativo a questa email.",
} as const;

export const LANDINGS: Record<LandingSlug, LandingConfig> = {
  "acari-animali": {
    slug: "acari-animali",
    title: "Acari, piante, cani e gatti",
    shortLabel: "Allergeni ambientali",
    headline: "Soluzioni per l'asma con allergia ad acari, piante, cani o gatti",
    description:
      "Se i sintomi peggiorano con polvere, pollini o animali, il foglio illustrativo ti aiuta a capire cosa sta succedendo e quali passi pratici affrontare — senza sostituire il medico.",
    bullets: [
      "Come riconoscere i trigger ambientali tipici",
      "Cosa puoi fare subito a casa (senza panico)",
      "Cosa chiedere al medico o all'allergologo",
    ],
    sheetName: "Foglio illustrativo — allergeni ambientali",
  },
  "allergie-alimentari": {
    slug: "allergie-alimentari",
    title: "Allergie alimentari",
    shortLabel: "Allergie alimentari",
    headline: "Soluzioni per asma con allergie alimentari",
    description:
      "Quando l'asma si intreccia con reazioni al cibo, serve chiarezza: cosa osservare, cosa evitare di improvvisare, e come prepararti al colloquio con lo specialista.",
    bullets: [
      "Segnali da non confondere con altro",
      "Digestione, reflusso e sintomi respiratori",
      "Domande utili da portare alla visita",
    ],
    sheetName: "Foglio illustrativo — allergie alimentari",
  },
  "asma-allergico": {
    slug: "asma-allergico",
    title: "Ogni asma allergico",
    shortLabel: "Guida generale",
    headline: "Soluzioni per ogni tipo di asma allergico",
    description:
      "Una mappa pratica per chi si sente perso dopo la diagnosi: sintomi, tempi (immediato vs ritardato), fattori che peggiorano, e le dimensioni da affrontare oltre l'inalatore.",
    bullets: [
      "Sintomi tipici spiegati in linguaggio chiaro",
      "Cose che peggiorano l'asma (oltre l'allergene)",
      "Come riprendere il filo quando ti senti abbandonato dal sistema",
    ],
    sheetName: "Foglio illustrativo — asma allergico",
  },
};

export const LANDING_LIST = Object.values(LANDINGS);
