import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription Parent | Précepteur AI",
  description:
    "Inscrivez-vous sur Précepteur AI et recevez chaque soir le bilan scolaire de votre enfant sur WhatsApp ou Telegram.",
};

export default function InscriptionParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
