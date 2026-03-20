import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Precepteur AI - Le suivi scolaire intelligent pour les parents",
  description:
    "Recevez chaque soir un bilan personnalise de la journee scolaire de votre enfant. Notes, devoirs, absences — tout en un message. 5,99 EUR/mois.",
  keywords: [
    "suivi scolaire",
    "Pronote",
    "parents",
    "college",
    "lycee",
    "IA",
    "education",
    "devoirs",
    "notes",
  ],
  openGraph: {
    title: "Precepteur AI - Le suivi scolaire intelligent pour les parents",
    description:
      "Recevez chaque soir un bilan personnalise de la journee scolaire de votre enfant.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
