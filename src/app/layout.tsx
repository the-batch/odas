import type { Metadata } from "next";
import { Antonio, Arimo } from "next/font/google";
import { company } from "@/data/site";
import "lenis/dist/lenis.css";
import "./globals.scss";

const antonio = Antonio({ subsets: ["latin"], variable: "--font-antonio", display: "swap" });
const arimo = Arimo({ subsets: ["latin"], variable: "--font-arimo", display: "swap" });

export const metadata: Metadata = {
  title: `${company.name} — Stratégie digitale & communication en Afrique de l’Ouest`,
  description: company.description,
  // Prototype non déployé : désactiver noindex uniquement une fois le vrai site prêt.
  robots: { index: false, follow: false },
  openGraph: {
    title: "ODAS — Connecter marques & humains avec audace",
    description: company.description,
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/brand/odas-red.png", width: 1000, height: 1000, alt: "ODAS" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${antonio.variable} ${arimo.variable}`}>
      <head>
        <link rel="preload" as="image" href="/brand/odas-white.png" />
        <noscript><style>{`.preloader { display: none !important; }`}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
