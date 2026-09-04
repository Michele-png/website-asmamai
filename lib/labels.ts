import type { ArticleCluster } from "@/lib/articles";
import type { ContainsSulfites } from "@/lib/drugs";
import type { FoodCategory, SulfiteLevel } from "@/lib/foods";

export const CLUSTER_LABELS: Record<ArticleCluster, string> = {
  sintomi: "Sintomi",
  meccanismi: "Meccanismi",
  diagnosi: "Diagnosi",
  alimenti: "Alimenti",
  etichette: "Etichette",
  farmaci: "Farmaci",
  rimedi: "Rimedi",
  quotidiano: "Quotidiano",
  pillar: "Guida principale",
};

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  bevande: "Bevande",
  frutta: "Frutta",
  verdura: "Verdura",
  pesce: "Pesce",
  carne: "Carne",
  condimenti: "Condimenti",
  dolci: "Dolci",
  conserve: "Conserve",
  altro: "Altro",
};

export const SULFITE_LEVEL_LABELS: Record<SulfiteLevel, string> = {
  alto: "Alto",
  medio: "Medio",
  basso: "Basso",
  variabile: "Variabile",
  assente: "Assente",
};

export const CONTAINS_LABELS: Record<ContainsSulfites, string> = {
  si: "Sì, contiene solfiti",
  no: "Senza solfiti",
  variabile: "Variabile",
};
