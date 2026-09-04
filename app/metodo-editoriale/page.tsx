import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Metodo editoriale",
  description:
    "Come AsmaMai sceglie le fonti, aggiorna i testi, dichiara i conflitti di interesse e mostra l'eventuale revisore medico.",
  path: "/metodo-editoriale",
});

export default function MetodoPage() {
  return (
    <article className="relative mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Trasparenza
      </p>
      <h1 className="mt-3 font-display text-3xl text-deep sm:text-5xl">
        Metodo editoriale
      </h1>
      <div className="prose-asma mt-8">
        <h2>Fonti primarie</h2>
        <p>
          Preferiamo documenti che si possono aprire e verificare: articoli su
          PubMed, pareri EFSA, fogli illustrativi e RCP in Banca Dati Farmaci
          AIFA, regolamenti UE (in particolare il 1169/2011 sull&apos;etichettatura
          e le norme sugli additivi). I blog e i riassunti commerciali non sono
          fonti. Se una scheda cita un sito di terze parti, è perché rende
          leggibile un foglietto già autorizzato, e il link regolatorio resta in
          elenco.
        </p>

        <h2>Come si aggiorna un testo</h2>
        <p>
          Ogni pagina ha una data di aggiornamento nel frontmatter. Quando cambia
          un regolamento, un foglietto o una revisione EFSA, aggiorniamo la
          scheda e la data. Non promettiamo una cadenza fissa: promettiamo di non
          lasciare in circolo una frase che sappiamo superata.
        </p>

        <h2>Disclaimer medico</h2>
        <p>
          I contenuti di {SITE.name} sono informativi. Non costituiscono diagnosi,
          prescrizione o consiglio terapeutico personalizzato. Non sospendere o
          modificare un farmaco senza il medico che ti ha in cura. In caso di
          crisi asmatica, anafilassi o peggioramento acuto, chiama i servizi di
          emergenza.
        </p>

        <h2>Conflitti di interesse</h2>
        <p>
          Al momento il sito non vende prodotti, non riceve sponsorizzazioni da
          aziende alimentari o farmaceutiche e non include affiliate link. Se
          questo cambiasse, lo scriveremo in questa pagina prima di qualsiasi
          contenuto sponsorizzato.
        </p>

        <h2>Revisore medico</h2>
        <p>
          Il campo <code>reviewer</code> nei file degli articoli è oggi{" "}
          <code>null</code>. Quando un medico reviserà un testo, il suo
          identificativo comparirà nel frontmatter e in pagina, sotto
          l&apos;autore, nella riga «Revisione medica». Finché il campo è vuoto,
          quella riga non viene mostrata: non inventiamo una revisione che non
          c&apos;è.
        </p>
      </div>
    </article>
  );
}
