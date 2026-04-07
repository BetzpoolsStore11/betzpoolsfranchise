import localFont from "next/font/local";

/**
 * Self-hosted franchise fonts via Fontsource (no build-time Google Fonts fetch).
 * Paths are relative to this file; files ship inside node_modules/@fontsource*.
 */
const montserratLatin = localFont({
  src: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-fran-sans",
  display: "swap",
});

const playfairLatin = localFont({
  src: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
  variable: "--font-fran-serif",
  display: "swap",
});

const heroDisplay = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/jost/files/jost-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/jost/files/jost-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/jost/files/jost-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hero-display",
  display: "swap",
});

const betzBody = localFont({
  src: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  variable: "--font-betz-body",
  display: "swap",
});

/** Latin opsz + wght variable file (matches prior next/font/google axes: ["opsz"]). */
const betzSerif = localFont({
  src: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2",
  variable: "--font-betz-serif",
  display: "swap",
});

export const franchiseMontserrat = montserratLatin;
export const franchisePlayfair = playfairLatin;
export const franchiseHeroDisplay = heroDisplay;
export const franchiseBetzBody = betzBody;
export const franchiseBetzSerif = betzSerif;
