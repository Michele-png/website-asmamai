import type { Article } from "@/lib/articles";
import type { Drug } from "@/lib/drugs";
import type { Food } from "@/lib/foods";
import { AUTHORS, ORGANIZATION, SITE, absoluteUrl, articleUrl } from "@/lib/site";

const CONDITION_ID = `${SITE.url}/#condition-asma-solfiti`;
const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const PERSON_ID = `${SITE.url}/#person-michele-scalzotto`;
const LOGO_ID = `${SITE.url}/#logo`;

export type JsonLdNode = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function organizationJsonLd(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    description: ORGANIZATION.description,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: ORGANIZATION.logo,
    },
    founder: { "@id": PERSON_ID },
  };
}

export function personJsonLd(): JsonLdNode {
  const author = AUTHORS["michele-scalzotto"];
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    jobTitle: author.role,
    description: author.role,
    url: absoluteUrl("/chi-siamo"),
    sameAs: author.sameAs,
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "it-IT",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function siteGraphJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), personJsonLd(), websiteJsonLd()],
  };
}

function sulfiteCondition(): JsonLdNode {
  return {
    "@type": "MedicalCondition",
    "@id": CONDITION_ID,
    name: "Asma indotta da solfiti",
    alternateName: ["Sulfite-induced asthma", "Sensibilità ai solfiti"],
  };
}

export function articleJsonLd(article: Article): JsonLdNode {
  const url = articleUrl(article.slug);
  const webpageId = `${url}#webpage`;
  const articleId = `${url}#article`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": webpageId,
        url,
        name: article.title,
        description: article.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": CONDITION_ID },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        lastReviewed: article.updatedAt,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": articleId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Article",
        "@id": articleId,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "it-IT",
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntityOfPage: { "@id": webpageId },
        about: { "@id": CONDITION_ID },
      },
      sulfiteCondition(),
    ],
  };
}

export function faqJsonLd(
  faq: { q: string; a: string }[],
  pageUrl: string,
): JsonLdNode | null {
  if (faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: faq.map((item, index) => ({
      "@type": "Question",
      "@id": `${pageUrl}#faq-${index + 1}`,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdNode {
  const last = items[items.length - 1];
  const pageUrl = last ? absoluteUrl(last.href) : SITE.url;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function foodJsonLd(food: Food): JsonLdNode {
  const url = absoluteUrl(`/alimenti/${food.slug}`);
  const question = `${food.name} contengono solfiti?`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: food.name,
        description: food.answer,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": CONDITION_ID },
        dateModified: food.updatedAt,
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": `${url}#faq` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "@id": `${url}#faq-1`,
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: food.answer,
            },
          },
        ],
      },
      sulfiteCondition(),
    ],
  };
}

export function drugJsonLd(drug: Drug): JsonLdNode {
  const url = absoluteUrl(`/farmaci/${drug.slug}`);
  const drugId = `${url}#drug`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: drug.name,
        description: drug.answer,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": drugId },
        dateModified: drug.updatedAt,
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": drugId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Drug",
        "@id": drugId,
        name: drug.name,
        activeIngredient: drug.activeIngredient,
        description: drug.answer,
        proprietaryName: drug.name,
      },
      sulfiteCondition(),
    ],
  };
}

export function graphJsonLd(...nodes: Array<JsonLdNode | null | undefined>): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is JsonLdNode => Boolean(node)),
  };
}

function nodesOf(data: JsonLdNode): JsonLdNode[] {
  const graph = data["@graph"];
  return Array.isArray(graph) ? (graph as JsonLdNode[]) : [data];
}

export function articlePageJsonLd(
  article: Article,
  breadcrumbs: BreadcrumbItem[],
): JsonLdNode {
  const url = articleUrl(article.slug);
  return graphJsonLd(
    ...nodesOf(articleJsonLd(article)),
    faqJsonLd(article.faq, url),
    breadcrumbJsonLd(breadcrumbs),
  );
}

export function foodPageJsonLd(food: Food, breadcrumbs: BreadcrumbItem[]): JsonLdNode {
  return graphJsonLd(...nodesOf(foodJsonLd(food)), breadcrumbJsonLd(breadcrumbs));
}

export function drugPageJsonLd(drug: Drug, breadcrumbs: BreadcrumbItem[]): JsonLdNode {
  return graphJsonLd(...nodesOf(drugJsonLd(drug)), breadcrumbJsonLd(breadcrumbs));
}
