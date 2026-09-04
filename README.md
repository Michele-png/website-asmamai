# AsmaMai

Guida italiana indipendente alla **sensibilità ai solfiti negli asmatici**: [asmamai.it](https://asmamai.it).

## Pagine

- `/` — home
- `/solfiti-e-asma` — guida principale (canonical del pillar `solfiti-e-asma`)
- `/articoli` — indice articoli · `/articoli/<slug>` — articolo
- `/alimenti` — tabella alimenti · `/alimenti/<slug>` — scheda
- `/farmaci` — tabella farmaci · `/farmaci/<slug>` — scheda
- `/chi-siamo` · `/metodo-editoriale` · `/contatti` · `/privacy`
- `/acari-animali` · `/allergie-alimentari` · `/asma-allergico` — landings fogli illustrativi
- `/robots.txt` · `/sitemap.xml` · `/llms.txt` · `/llms-full.txt`

`/articoli/solfiti-e-asma` fa redirect 308 a `/solfiti-e-asma`.

## Come aggiungere un articolo, un alimento o un farmaco

1. Crea un file Markdown in `content/articoli/`, `content/alimenti/` o `content/farmaci/`.
2. Il **filename** deve coincidere con lo `slug` (`come-leggere-etichetta-solfiti.md`).
3. Compila il frontmatter YAML (nomi campo fissi, sotto). Il loader legge **tutti** i `.md` della cartella: non c’è un registro manuale.
4. `npm run build` valida i campi. Se manca un campo, l’errore cita file e nome campo.

Lo `slug` del pillar è `solfiti-e-asma` (`cluster: pillar`). Quella scheda va in `content/articoli/solfiti-e-asma.md` e viene servita su `/solfiti-e-asma`.

YAML: per `containsSulfites` usa `"no"` tra virgolette. Un `no` nudo diventa boolean `false` (YAML 1.1); il loader lo accetta comunque. Qualsiasi valore con `:` (es. `answer: "Sì: …"`) va tra virgolette, altrimenti il parser YAML lo legge come mappa.

## Contratto contenuto

### Articoli — `content/articoli/<slug>.md`

```yaml
title: string            # H1, ≤70 chars, mirrors the search query
slug: string             # equals filename
description: string      # meta description ≤155 chars
tldr: string             # 40–150 words, answer-first summary shown under H1
cluster: sintomi | meccanismi | diagnosi | alimenti | etichette | farmaci | rimedi | quotidiano | pillar
publishedAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD
author: michele-scalzotto
reviewer: null           # or a reviewer id string in future; when null, do NOT render any reviewer line
readingMinutes: number
faq:
  - q: string
    a: string
sources:
  - title: string
    url: string
related: [slug, slug]    # other article slugs
```

Body: Markdown. Gli H2 sono domande. Tabelle, liste, blockquote e link sono ammessi. Route: `/articoli/<slug>` (il pillar su `/solfiti-e-asma`).

### Alimenti — `content/alimenti/<slug>.md`

```yaml
name: string             # e.g. "Gamberi e crostacei"
slug: string
category: bevande | frutta | verdura | pesce | carne | condimenti | dolci | conserve | altro
sulfiteLevel: alto | medio | basso | variabile | assente
typicalRange: string     # e.g. "50–150 mg/kg" or "n.d."
labelCodes: [E220, E223]  # E-numbers typically used
whyAdded: string         # one sentence
answer: string           # 1–2 sentence direct answer to "<name> contengono solfiti?" (used as TL;DR + meta description)
alternatives: [string]
tips: [string]
updatedAt: YYYY-MM-DD
sources:
  - title: string
    url: string
```

### Farmaci — `content/farmaci/<slug>.md`

```yaml
name: string             # commercial or generic name as commonly searched
slug: string
activeIngredient: string
form: string             # e.g. "soluzione iniettabile", "aerosol", "collirio"
containsSulfites: si | no | variabile
sulfiteExcipient: string # e.g. "sodio metabisolfito (E223)" or "nessuno"
relevanceForAsthma: string # one sentence
answer: string           # 1–2 sentence direct answer
notes: string
updatedAt: YYYY-MM-DD
sources:
  - title: string
    url: string
```

## SEO e GEO

- Metadata: title, description, canonical, Open Graph, Twitter card, robots index/follow
- JSON-LD: Organization, WebSite, Person, MedicalWebPage + Article, FAQPage, BreadcrumbList, Drug
- `robots.txt` consente i crawler classici e i bot LLM (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended, CCBot); `Disallow: /api/`
- `sitemap.xml` con `lastModified` dal frontmatter
- `/llms.txt` (indice) e `/llms-full.txt` (testi completi degli articoli)

## Lead magnet

Sulle schede articolo/alimento/farmaco: «Lista stampabile: alimenti e farmaci con solfiti (PDF)» (`landing: solfiti`). Le tre landings originali restano invariate.

## Setup locale

```bash
npm install
cp .env.example .env.local
# metti FORMSPREE_FORM_ID
npm run dev
```

## Deploy

Vercel + dominio GoDaddy `asmamai.it`. Abilita Web Analytics sul progetto Vercel.
