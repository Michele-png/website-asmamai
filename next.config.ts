import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/articoli/solfiti-e-asma",
        destination: "/solfiti-e-asma",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
