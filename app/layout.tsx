import type { Metadata } from "next";
import {
  franchiseBetzBody as betzBody,
  franchiseBetzSerif as betzSerif,
  franchiseHeroDisplay as heroDisplay,
  franchiseMontserrat as montserrat,
  franchisePlayfair as playfair,
} from "./fonts/franchiseFonts";
import franchiseStyles from "./franchise/franchise.module.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franchise | Betz Pools",
  description:
    "Partner with Ontario’s premier pool company. Leverage 80 years of proven service excellence to scale your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col ${franchiseStyles.franRoot} ${montserrat.variable} ${playfair.variable} ${heroDisplay.variable} ${betzBody.variable} ${betzSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
