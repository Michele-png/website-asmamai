import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Opts = {
  kicker: string;
  title: string;
  subtitle?: string;
  badge?: string;
};

/**
 * Immagine Open Graph generata a build time (next/og, font di default).
 * Serve a due cose: anteprime decenti quando una scheda viene condivisa su
 * WhatsApp/Facebook (dove avviene l'outreach) e il requisito "immagine grande"
 * di Google Discover. Nessun font remoto: il build non deve dipendere dalla rete.
 */
export function ogImage({ kicker, title, subtitle, badge }: Opts) {
  const titleSize = title.length > 70 ? 48 : title.length > 45 ? 56 : 66;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #eaf6fa 0%, #f7fbfc 55%, #e2f2ec 100%)",
          color: "#12323c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#1f7a8c",
            }}
          >
            {kicker}
          </div>
          {badge ? (
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                padding: "10px 22px",
                borderRadius: 999,
                background: "#ffffff",
                border: "2px solid #1f7a8c",
                color: "#1f7a8c",
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          {subtitle ? (
            <div style={{ fontSize: 30, lineHeight: 1.35, color: "#2f5561", maxWidth: 1000 }}>
              {subtitle.length > 170 ? `${subtitle.slice(0, 167)}…` : subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#1f7a8c",
              display: "flex",
            }}
          />
          <div style={{ fontWeight: 700 }}>{SITE.name}</div>
          <div style={{ color: "#5b7b85" }}>{`· ${SITE.tagline}`}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
