import { notFound } from "next/navigation";
import { drugQuestion, getAllDrugSlugs, getDrugBySlug } from "@/lib/drugs";
import { CONTAINS_LABELS } from "@/lib/labels";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllDrugSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drug = getDrugBySlug(slug);
  if (!drug) notFound();
  return ogImage({
    kicker: `Farmaci · ${drug.form}`,
    title: drugQuestion(drug),
    subtitle: drug.answer,
    badge: CONTAINS_LABELS[drug.containsSulfites],
  });
}
