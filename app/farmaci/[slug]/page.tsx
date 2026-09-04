import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { DrugFactCard } from "@/components/FactCards";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllDrugSlugs, getDrugBySlug } from "@/lib/drugs";
import { pageMetadata } from "@/lib/metadata";
import { drugPageJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDrugSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const drug = getDrugBySlug(slug);
  if (!drug) return {};
  return pageMetadata({
    title: `${drug.name} e solfiti`,
    description: drug.answer,
    path: `/farmaci/${drug.slug}`,
    modifiedTime: drug.updatedAt,
  });
}

export default async function DrugPage({ params }: Props) {
  const { slug } = await params;
  const drug = getDrugBySlug(slug);
  if (!drug) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Farmaci", href: "/farmaci" },
    { name: drug.name, href: `/farmaci/${drug.slug}` },
  ];

  return (
    <ArticleLayout
      breadcrumbs={breadcrumbs}
      jsonLd={drugPageJsonLd(drug, breadcrumbs)}
      kicker="Farmaco"
      title={`${drug.name}: contiene solfiti?`}
      tldr={drug.answer}
      updatedAt={drug.updatedAt}
      factCard={<DrugFactCard drug={drug} />}
      sources={drug.sources}
    >
      <MarkdownBody content={drug.body} />
    </ArticleLayout>
  );
}
