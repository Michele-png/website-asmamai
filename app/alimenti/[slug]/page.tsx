import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { FoodFactCard } from "@/components/FactCards";
import { MarkdownBody } from "@/components/MarkdownBody";
import {
  foodQuestion,
  foodTitle,
  getAllFoodSlugs,
  getFoodBySlug,
  getRelatedFoods,
} from "@/lib/foods";
import { CATEGORY_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";
import { AUTHOR_ID } from "@/lib/site";
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
    title: foodTitle(food),
    absoluteTitle: true,
    description: food.answer,
    path: `/alimenti/${food.slug}`,
    hasSegmentImage: true,
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
  const related = getRelatedFoods(food).map((item) => ({
    href: `/alimenti/${item.slug}`,
    title: foodQuestion(item),
  }));

  return (
    <ArticleLayout
      breadcrumbs={breadcrumbs}
      jsonLd={foodPageJsonLd(food, breadcrumbs)}
      kicker={CATEGORY_LABELS[food.category]}
      title={foodQuestion(food)}
      tldr={food.answer}
      updatedAt={food.updatedAt}
      authorId={AUTHOR_ID}
      factCard={<FoodFactCard food={food} />}
      sources={food.sources}
      related={related}
      relatedTitle="Altri alimenti da controllare"
    >
      <MarkdownBody content={food.body} />
    </ArticleLayout>
  );
}
