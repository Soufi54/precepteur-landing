import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription Tuteur | Precepteur AI",
  description:
    "Rejoignez Precepteur AI en tant qu'accompagnant ou tuteur. Suivez les progres de vos eleves en temps reel via Telegram.",
};

export default function InscriptionTuteurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
