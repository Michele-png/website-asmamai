#!/usr/bin/env node
/**
 * Notifica a IndexNow (Bing, Yandex, Seznam, Naver; Bing alimenta ChatGPT search
 * e Copilot) tutti gli URL della sitemap pubblicata. Google non usa IndexNow.
 *
 * Uso:  npm run indexnow            → tutti gli URL della sitemap
 *       npm run indexnow -- /alimenti/vino /farmaci/adrenalina   → solo questi
 *
 * La chiave è il nome del file in public/<chiave>.txt (deve restare identica).
 * Da lanciare dopo ogni deploy che pubblica o aggiorna pagine.
 */
const SITE = "https://asmamai.it";
const KEY = "9961f40b2bffc20e3ddf5166ccf68e24";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? "" : "/"}${p}`))
  : await sitemapUrls();

if (urlList.length === 0) {
  console.error("Nessun URL da inviare.");
  process.exit(1);
}

// IndexNow accetta fino a 10.000 URL per richiesta.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "asmamai.it", key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = ok, 202 = ricevuto (chiave in verifica), 4xx = problema (chiave, formato, quota)
console.log(`IndexNow: HTTP ${res.status} per ${urlList.length} URL`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
