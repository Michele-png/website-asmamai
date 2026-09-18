import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { SITE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function Image() {
  return ogImage({
    kicker: "Guida indipendente",
    title: "Solfiti e asma: capire, riconoscere, evitare le crisi",
    subtitle: SITE.description,
  });
}
