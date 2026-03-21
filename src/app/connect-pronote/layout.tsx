import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connecter Pronote | Precepteur AI",
  description:
    "Connectez votre compte Pronote a Precepteur AI en 2 minutes. Securise, chiffre AES-256, lecture seule. Commencez a recevoir vos bilans scolaires.",
};

export default function ConnectPronoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
