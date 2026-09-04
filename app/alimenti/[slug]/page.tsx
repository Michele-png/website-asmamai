import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { FoodFactCard } from "@/components/FactCards";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllFoodSlugs, getFoodBySlug } from "@/lib/foods";
import { CATEGORY_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";
import { foodPageJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllFoodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) return {};
  return pageMetadata({
    title: `${food.name} e solfiti`,
    description: food.answer,
    path: `/alimenti/${food.slug}`,
    modifiedTime: food.updatedAt,
  });
}

export default async function FoodPage({ params }: Props) {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Alimenti", href: "/alimenti" },
    { name: food.name, href: `/alimenti/${food.slug}` },
  ];

  return (
    <ArticleLayout
      breadcrumbs={breadcrumbs}
      jsonLd={foodPageJsonLd(food, breadcrumbs)}
      kicker={CATEGORY_LABELS[food.category]}
      title={`${food.name}: contengono solfiti?`}
      tldr={food.answer}
      updatedAt={food.updatedAt}
      factCard={<FoodFactCard food={food} />}
      sources={food.sources}
    >
      <MarkdownBody content={food.body} />
    </ArticleLayout>
  );
}
