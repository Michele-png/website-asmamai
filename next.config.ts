import type { NextConfig } from "next";

// Header di sicurezza di base. Niente CSP per ora: richiede nonce per gli
// script inline di JSON-LD e Vercel Analytics. Nessun effetto SEO/GEO, solo igiene.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // www → apex (308). Il canonical punta già ad asmamai.it; senza redirect
      // www.asmamai.it serviva una copia identica del sito su un secondo host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.asmamai.it" }],
        destination: "https://asmamai.it/:path*",
        permanent: true,
      },
      {
        source: "/articoli/solfiti-e-asma",
        destination: "/solfiti-e-asma",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
