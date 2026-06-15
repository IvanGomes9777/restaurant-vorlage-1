import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Jost } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Fine-Dining-Restaurant München – AURELIO",
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  keywords: [
    "Fine Dining München",
    "Gourmetrestaurant München",
    "Degustationsmenü",
    "Restaurant Maximilianstraße",
    "Tisch reservieren München",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE.url,
    siteName: SITE.name,
    title: "Fine-Dining-Restaurant München – AURELIO",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fine-Dining-Restaurant München – AURELIO",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${playfair.variable} ${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
