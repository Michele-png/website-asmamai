import { notFound } from "next/navigation";
import { foodQuestion, getAllFoodSlugs, getFoodBySlug } from "@/lib/foods";
import { CATEGORY_LABELS, SULFITE_LEVEL_LABELS } from "@/lib/labels";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllFoodSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) notFound();
  return ogImage({
    kicker: `Alimenti · ${CATEGORY_LABELS[food.category]}`,
    title: foodQuestion(food),
    subtitle: food.answer,
    badge: `Solfiti: ${SULFITE_LEVEL_LABELS[food.sulfiteLevel]}`,
  });
}
