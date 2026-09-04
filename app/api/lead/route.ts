import { NextRequest, NextResponse } from "next/server";
import { LEAD_OFFERS, isLeadOfferSlug } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  email?: string;
  landing?: string;
  consent?: boolean;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const landing = body.landing;
  const consent = Boolean(body.consent);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Inserisci un'email valida." }, { status: 400 });
  }
  if (!landing || !isLeadOfferSlug(landing)) {
    return NextResponse.json({ ok: false, error: "Landing non valida." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Serve il consenso privacy." },
      { status: 400 },
    );
  }

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  if (!formspreeId) {
    console.error("FORMSPREE_FORM_ID mancante");
    return NextResponse.json(
      {
        ok: false,
        error: "Raccolta email non ancora configurata. Riprova tra poco.",
      },
      { status: 503 },
    );
  }

  const offer = LEAD_OFFERS[landing];
  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      landing,
      landingTitle: offer.title,
      sheetName: offer.sheetName,
      source: "asmamai.it",
      _subject: `[AsmaMai] Nuova richiesta — ${offer.shortLabel}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Formspree error", res.status, detail);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito. Riprova tra poco." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
