import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soufi54.github.io/precepteur-landing"),
  title: {
    default: "Precepteur AI - Le suivi scolaire intelligent pour les parents | Pronote sur Telegram",
    template: "%s | Precepteur AI",
  },
  description:
    "Recevez chaque soir un bilan personnalise de la journee scolaire de votre enfant sur Telegram ou WhatsApp. Notes, devoirs, absences, exercices IA. Compatible Pronote. 7 jours gratuits.",
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
    "Telegram",
    "WhatsApp",
    "assistant scolaire",
    "suivi notes enfant",
    "alertes Pronote",
    "exercices personnalises",
    "application suivi scolaire parents",
    "pronote alternative",
  ],
  authors: [{ name: "Precepteur AI" }],
  creator: "Precepteur AI",
  publisher: "Precepteur AI",
  openGraph: {
    title: "Precepteur AI - Le suivi scolaire intelligent pour les parents",
    description:
      "Recevez chaque soir un bilan personnalise de la journee scolaire de votre enfant sur Telegram ou WhatsApp. Compatible Pronote. 7 jours gratuits.",
    type: "website",
    locale: "fr_FR",
    url: "https://soufi54.github.io/precepteur-landing",
    siteName: "Precepteur AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precepteur AI - Le suivi scolaire intelligent pour les parents",
    description:
      "Recevez chaque soir un bilan personnalise de la journee scolaire de votre enfant. Compatible Pronote. 7 jours gratuits.",
    creator: "@precepteur_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://soufi54.github.io/precepteur-landing",
  },
  category: "education",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://soufi54.github.io/precepteur-landing/#website",
      url: "https://soufi54.github.io/precepteur-landing",
      name: "Precepteur AI",
      description: "Assistant scolaire intelligent pour les parents - Bilans quotidiens via Telegram et WhatsApp",
      publisher: {
        "@id": "https://soufi54.github.io/precepteur-landing/#organization",
      },
      inLanguage: "fr-FR",
    },
    {
      "@type": "Organization",
      "@id": "https://soufi54.github.io/precepteur-landing/#organization",
      name: "Precepteur AI",
      url: "https://soufi54.github.io/precepteur-landing",
      email: "contact@precepteur.ai",
      description: "Assistant scolaire intelligent qui aide les parents a suivre la scolarite de leurs enfants via Telegram et WhatsApp.",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Precepteur AI",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, Telegram, WhatsApp",
      description: "Assistant scolaire IA connecte a Pronote. Bilans quotidiens, alertes notes, exercices personnalises.",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          name: "Essai gratuit 7 jours",
        },
        {
          "@type": "Offer",
          price: "5.99",
          priceCurrency: "EUR",
          name: "Abonnement Standard",
          billingDuration: "P1M",
        },
        {
          "@type": "Offer",
          price: "8.99",
          priceCurrency: "EUR",
          name: "Abonnement Famille",
          billingDuration: "P1M",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "C'est quoi exactement Precepteur AI ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Precepteur AI est un assistant scolaire intelligent qui se connecte au compte Pronote de votre enfant et vous envoie chaque soir un bilan clair sur Telegram ou WhatsApp.",
          },
        },
        {
          "@type": "Question",
          name: "Mes donnees sont-elles securisees ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolument. Vos identifiants sont chiffres avec le standard AES-256. Les donnees scolaires sont hebergees en France. Nous sommes conformes au RGPD.",
          },
        },
        {
          "@type": "Question",
          name: "Combien coute Precepteur AI ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "7 jours d'essai gratuit sans carte bancaire. Ensuite 5,99 EUR/mois pour 1 enfant ou 8,99 EUR/mois pour le forfait famille (jusqu'a 3 enfants).",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics (privacy-friendly) - Replace data-domain when deploying */}
        {/* <script defer data-domain="precepteur-ai.com" src="https://plausible.io/js/script.js"></script> */}

        {/* Umami Analytics (privacy-friendly alternative) - Replace data-website-id when deploying */}
        {/* <script defer src="https://analytics.example.com/script.js" data-website-id="YOUR_WEBSITE_ID"></script> */}
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
