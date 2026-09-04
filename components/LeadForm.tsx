"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { LeadOfferSlug } from "@/lib/content";
import { SITE } from "@/lib/site";

type Props = {
  landing: LeadOfferSlug;
  sheetName: string;
  submitLabel?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  landing,
  sheetName,
  submitLabel = "Ricevi il foglio illustrativo",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Per continuare serve il consenso al trattamento dei dati.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, landing, consent: true }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Invio non riuscito. Riprova.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Errore inatteso.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-accent/25 bg-white/80 p-6 shadow-sm backdrop-blur"
        role="status"
      >
        <p className="font-display text-xl text-deep">Richiesta ricevuta</p>
        <p className="mt-2 text-deep/80">
          Ti invieremo <strong>{sheetName}</strong> a{" "}
          <span className="text-teal-dark">{email}</span>.
        </p>
        <p className="mt-3 text-sm text-deep/70">{SITE.emailNotifyHint}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-deep/10 bg-white/85 p-6 shadow-sm backdrop-blur"
    >
      <label className="block text-sm font-medium text-deep" htmlFor="email">
        La tua email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="nome@email.com"
        className="mt-2 w-full rounded-xl border border-deep/15 bg-sky-50 px-4 py-3 text-deep outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />

      <label className="mt-4 flex items-start gap-3 text-sm text-deep/80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 size-4 rounded border-deep/30 text-accent focus:ring-accent"
        />
        <span>
          Acconsento al trattamento della mia email per ricevere il materiale
          informativo richiesto. Leggi la{" "}
          <Link href="/privacy" className="underline decoration-accent/50 underline-offset-2 hover:text-teal">
            privacy
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3.5 text-base font-semibold text-white transition hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Invio in corso…" : submitLabel}
      </button>

      <p className="mt-3 text-center text-xs text-deep/55">
        Non è un download immediato: lo prepariamo e te lo mandiamo via email.
      </p>
    </form>
  );
}
