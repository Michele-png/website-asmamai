import { getAllArticles } from "@/lib/articles";
import { getAllDrugs } from "@/lib/drugs";
import { getAllFoods } from "@/lib/foods";
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
    chunks.push(article.tldr);
    chunks.push("");
    chunks.push(article.body);
    chunks.push("");
    chunks.push("---");
    chunks.push("");
  }

  return chunks.join("\n");
}
