import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription Eleve | Precepteur AI",
  description:
    "Inscris-toi sur Precepteur AI et recois chaque soir un bilan personnalise de tes devoirs, notes et agenda scolaire.",
};

export default function InscriptionEleveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
