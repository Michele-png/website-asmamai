import { getAllArticles } from "@/lib/articles";
import { drugQuestion, getAllDrugs } from "@/lib/drugs";
import { foodQuestion, getAllFoods } from "@/lib/foods";
import { CATEGORY_LABELS, SULFITE_LEVEL_LABELS } from "@/lib/labels";
import { LANDING_LIST } from "@/lib/content";
import { PILLAR_SLUG, SITE, absoluteUrl, articleUrl } from "@/lib/site";

function line(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${description}`;
}

export function buildLlmsTxt(): string {
  const articles = getAllArticles();
  const foods = getAllFoods();
  const drugs = getAllDrugs();
  const pillar = articles.find((article) => article.slug === PILLAR_SLUG);

  const sections: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Guida principale",
    "",
    pillar
      ? line(pillar.title, articleUrl(pillar.slug), pillar.description)
      : `- [Solfiti e asma](${absoluteUrl(`/${PILLAR_SLUG}`)}): guida in aggiornamento.`,
    "",
    "## Articoli",
    "",
  ];

  if (articles.length === 0) {
    sections.push("Nessun articolo pubblicato al momento.");
  } else {
    for (const article of articles) {
      sections.push(line(article.title, articleUrl(article.slug), article.description));
    }
  }

  sections.push("", "## Alimenti con solfiti", "");
  if (foods.length === 0) {
    sections.push("Schede alimenti in preparazione.");
  } else {
    for (const food of foods) {
      sections.push(
        line(food.name, absoluteUrl(`/alimenti/${food.slug}`), food.answer),
      );
    }
  }

  sections.push("", "## Farmaci con solfiti", "");
  if (drugs.length === 0) {
    sections.push("Schede farmaci in preparazione.");
  } else {
    for (const drug of drugs) {
      sections.push(
        line(drug.name, absoluteUrl(`/farmaci/${drug.slug}`), drug.answer),
      );
    }
  }

  sections.push(
    "",
    "## Chi siamo e metodo",
    "",
    line(
      "Chi siamo",
      absoluteUrl("/chi-siamo"),
      "Chi scrive AsmaMai e perché il sito esiste.",
    ),
    line(
      "Metodo editoriale",
      absoluteUrl("/metodo-editoriale"),
      "Fonti primarie, aggiornamenti, disclaimer e conflitti di interesse.",
    ),
    line("Contatti", absoluteUrl("/contatti"), `Scrivi a ${SITE.contactEmail}.`),
    "",
    "## Optional",
    "",
    line("Privacy", absoluteUrl("/privacy"), "Informativa sul trattamento dei dati."),
  );

  for (const landing of LANDING_LIST) {
    sections.push(
      line(landing.title, absoluteUrl(`/${landing.slug}`), landing.description),
    );
  }

  sections.push("");
  return sections.join("\n");
}

export function buildLlmsFullTxt(): string {
  const articles = getAllArticles();
  const pillar = articles.find((article) => article.slug === PILLAR_SLUG);
  const rest = articles.filter((article) => article.slug !== PILLAR_SLUG);
  const ordered = pillar ? [pillar, ...rest] : articles;

  const chunks = [
    `# ${SITE.name} — testi completi`,
    "",
    `> ${SITE.description}`,
    "",
  ];

  if (ordered.length === 0) {
    chunks.push("Nessun articolo disponibile.");
    return chunks.join("\n");
  }

  for (const article of ordered) {
    chunks.push(`## ${article.title}`);
    chunks.push("");
    chunks.push(articleUrl(article.slug));
    chunks.push("");
    chunks.push(`Aggiornato: ${article.updatedAt}`);
    chunks.push("");
    chunks.push(article.tldr);
    chunks.push("");
    chunks.push(article.body);
    if (article.faq.length > 0) {
      chunks.push("");
      chunks.push("### Domande frequenti");
      for (const item of article.faq) {
        chunks.push("");
        chunks.push(`**${item.q}** ${item.a}`);
      }
    }
    chunks.push("");
    chunks.push("---");
    chunks.push("");
  }

  // Schede alimenti e farmaci: sono le "unità di risposta" che un modello cita
  // per "X contiene solfiti?". Fatti strutturati prima, testo dopo.
  chunks.push("# Alimenti: contengono solfiti?");
  chunks.push("");
  for (const food of getAllFoods()) {
    chunks.push(`## ${foodQuestion(food)}`);
    chunks.push("");
    chunks.push(absoluteUrl(`/alimenti/${food.slug}`));
    chunks.push("");
    chunks.push(`Risposta breve: ${food.answer}`);
    chunks.push("");
    chunks.push(`- Categoria: ${CATEGORY_LABELS[food.category]}`);
    chunks.push(`- Livello di solfiti: ${SULFITE_LEVEL_LABELS[food.sulfiteLevel]}`);
    chunks.push(`- Range tipico / limite UE: ${food.typicalRange}`);
    if (food.labelCodes.length > 0) chunks.push(`- Codici in etichetta: ${food.labelCodes.join(", ")}`);
    chunks.push(`- Perché si aggiungono: ${food.whyAdded}`);
    if (food.alternatives.length > 0) chunks.push(`- Alternative: ${food.alternatives.join("; ")}`);
    chunks.push(`- Aggiornato: ${food.updatedAt}`);
    chunks.push("");
    chunks.push(food.body);
    chunks.push("");
    chunks.push("---");
    chunks.push("");
  }

  chunks.push("# Farmaci: contengono solfiti come eccipiente?");
  chunks.push("");
  for (const drug of getAllDrugs()) {
    chunks.push(`## ${drugQuestion(drug)}`);
    chunks.push("");
    chunks.push(absoluteUrl(`/farmaci/${drug.slug}`));
    chunks.push("");
    chunks.push(`Risposta breve: ${drug.answer}`);
    chunks.push("");
    chunks.push(`- Principio attivo: ${drug.activeIngredient}`);
    chunks.push(`- Forma: ${drug.form}`);
    if (drug.aliases.length > 0) chunks.push(`- Nomi commerciali verificati: ${drug.aliases.join(", ")}`);
    chunks.push(`- Eccipiente solfito: ${drug.sulfiteExcipient}`);
    chunks.push(`- Rilevanza per l'asma: ${drug.relevanceForAsthma}`);
    chunks.push(`- Aggiornato: ${drug.updatedAt}`);
    chunks.push("");
    chunks.push(drug.body);
    chunks.push("");
    chunks.push("---");
    chunks.push("");
  }

  chunks.push(
    "Contenuto informativo. Non sostituisce diagnosi, terapia o indicazioni del medico.",
  );

  return chunks.join("\n");
}
