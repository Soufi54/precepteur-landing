import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Generales d'Utilisation | Precepteur AI",
  description:
    "Conditions generales d'utilisation de Precepteur AI. Regles d'utilisation du service d'assistant scolaire intelligent.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Precepteur AI</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Retour a l&apos;accueil
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 md:py-20">
        <article className="mx-auto max-w-3xl prose-sm">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Conditions Generales d&apos;Utilisation
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Derniere mise a jour : 21 mars 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Objet</h2>
              <p>
                Les presentes Conditions Generales d&apos;Utilisation (ci-apres &laquo; CGU &raquo;) regissent l&apos;utilisation
                du service Precepteur AI, un assistant scolaire intelligent accessible via Telegram, WhatsApp et le site
                web precepteur.net.
              </p>
              <p className="mt-2">
                En utilisant le service, vous acceptez sans reserve les presentes CGU. Si vous n&apos;acceptez pas ces conditions,
                veuillez ne pas utiliser le service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description du service</h2>
              <p>Precepteur AI propose les fonctionnalites suivantes :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Connexion securisee au compte Pronote parent</li>
                <li>Generation de bilans scolaires quotidiens et hebdomadaires</li>
                <li>Alertes personnalisees (notes, absences, tendances)</li>
                <li>Generation d&apos;exercices personnalises par intelligence artificielle</li>
                <li>Reponses aux questions des parents sur la scolarite de leur enfant</li>
              </ul>
              <p className="mt-2">
                Le service fonctionne en lecture seule sur Pronote : aucune modification n&apos;est jamais apportee
                a votre compte ou aux donnees scolaires.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Inscription et compte</h2>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">3.1 Conditions d&apos;inscription</h3>
              <p>Pour utiliser Precepteur AI, vous devez :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Etre majeur(e) ou representer legalement un mineur</li>
                <li>Disposer d&apos;un compte parent Pronote valide</li>
                <li>Fournir une adresse email valide</li>
                <li>Disposer d&apos;un compte Telegram ou WhatsApp</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">3.2 Responsabilite des identifiants</h3>
              <p>
                Vous etes responsable de la confidentialite de vos identifiants de connexion. Vous vous engagez
                a ne fournir que vos propres identifiants Pronote parent. L&apos;utilisation d&apos;identifiants
                appartenant a un tiers est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Tarifs et paiement</h2>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">4.1 Essai gratuit</h3>
              <p>
                Un essai gratuit de 7 jours est propose a tout nouvel utilisateur. Aucune carte bancaire n&apos;est
                requise pour l&apos;essai gratuit. A l&apos;issue de la periode d&apos;essai, le service est suspendu
                sauf souscription a un abonnement payant.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">4.2 Abonnements</h3>
              <p>Les tarifs en vigueur sont affiches sur le site. Les abonnements sont :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Standard : 5,99 &euro;/mois (1 enfant)</li>
                <li>Famille : 8,99 &euro;/mois (jusqu&apos;a 3 enfants)</li>
                <li>Tarifs annuels avec reduction de 20%</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">4.3 Resiliation</h3>
              <p>
                Vous pouvez resilier votre abonnement a tout moment, sans frais. La resiliation prend effet
                a la fin de la periode de facturation en cours. Aucun remboursement prorata n&apos;est effectue
                pour la periode restante.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Obligations de l&apos;utilisateur</h2>
              <p>En utilisant le service, vous vous engagez a :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Fournir des informations exactes lors de l&apos;inscription</li>
                <li>Utiliser le service uniquement pour le suivi scolaire de votre/vos enfant(s)</li>
                <li>Ne pas tenter de contourner les mesures de securite du service</li>
                <li>Ne pas utiliser le service a des fins illegales ou contraires aux bonnes moeurs</li>
                <li>Respecter les droits de propriete intellectuelle de Precepteur AI</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation de responsabilite</h2>
              <p>
                Precepteur AI s&apos;efforce de fournir un service fiable et precis. Cependant :
              </p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Les bilans sont generes a partir des donnees disponibles sur Pronote. Nous ne garantissons pas l&apos;exhaustivite ou l&apos;exactitude des donnees source.</li>
                <li>Les exercices generes par IA sont fournis a titre indicatif et ne remplacent pas l&apos;enseignement scolaire.</li>
                <li>Le service peut etre temporairement indisponible pour maintenance ou en cas de probleme technique.</li>
                <li>Precepteur AI ne peut etre tenu responsable des decisions prises sur la base des informations fournies par le service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Propriete intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu du site et du service (textes, images, logiciels, marques, logos) est la
                propriete exclusive de Precepteur AI ou de ses partenaires. Toute reproduction, representation
                ou utilisation non autorisee est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Protection des donnees</h2>
              <p>
                Le traitement de vos donnees personnelles est regi par notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">Politique de confidentialite</Link>.
                Nous nous engageons a proteger vos donnees conformement au RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Modification des CGU</h2>
              <p>
                Precepteur AI se reserve le droit de modifier les presentes CGU a tout moment. Les modifications
                prennent effet des leur publication sur le site. En cas de modification substantielle, les utilisateurs
                seront informes par email. L&apos;utilisation continue du service apres modification vaut acceptation
                des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Droit applicable et juridiction</h2>
              <p>
                Les presentes CGU sont regies par le droit francais. En cas de litige, les parties s&apos;engagent
                a rechercher une solution amiable. A defaut, les tribunaux competents de Paris seront seuls competents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
              <p>
                Pour toute question relative aux presentes CGU :<br />
                Email : <a href="mailto:contact@precepteur.ai" className="text-primary hover:underline">contact@precepteur.ai</a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Precepteur AI. Tous droits reserves.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialite</Link>
            <span>&middot;</span>
            <Link href="/legal" className="hover:text-primary transition-colors">Mentions legales</Link>
            <span>&middot;</span>
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
