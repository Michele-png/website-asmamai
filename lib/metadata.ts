import type { Metadata } from "next";
import { AUTHORS, SITE, absoluteUrl } from "@/lib/site";

export function pageMetadata(opts: {
  title: string;
  /** true = niente suffisso "· AsmaMai" (per title già lunghi o già "a domanda"). */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  /** true se il segmento ha un proprio opengraph-image.tsx: niente fallback (che lo sovrascriverebbe). */
  hasSegmentImage?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const isArticle = opts.type === "article";
  // Fallback: l'immagine OG del sito, solo per le pagine senza opengraph-image.tsx
  // di segmento (un `images` esplicito qui prevale sul file-based del segmento).
  const fallbackImage = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630 };
  const images = opts.hasSegmentImage ? {} : { images: [fallbackImage] };
  const twitterImages = opts.hasSegmentImage ? {} : { images: [fallbackImage.url] };

  // Gli articoli hanno title da ~60 caratteri: il suffisso li farebbe troncare in SERP.
  const absolute = opts.absoluteTitle ?? isArticle;

  return {
    title: absolute ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      ...images,
      type: isArticle ? "article" : "website",
      ...(isArticle
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
            authors: [AUTHORS["michele-scalzotto"].name],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...twitterImages,
    },
  };
}
