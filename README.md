# AsmaMai

Landing informative per [asmamai.it](https://asmamai.it).

## Pagine

- `/` — home
- `/acari-animali` — allergeni ambientali
- `/allergie-alimentari` — allergie alimentari
- `/asma-allergico` — guida generale asma allergico
- `/privacy` — privacy

Ogni landing raccoglie l'email (Formspree) e comunica che il foglio illustrativo arriverà via mail entro poche ore.

## Setup locale

```bash
npm install
cp .env.example .env.local
# metti FORMSPREE_FORM_ID
npm run dev
```

## Deploy

Vercel + dominio GoDaddy `asmamai.it`. Abilita Web Analytics sul progetto Vercel.
