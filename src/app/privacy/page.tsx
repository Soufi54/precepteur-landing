import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de confidentialite | Precepteur AI",
  description:
    "Politique de confidentialite de Precepteur AI. Protection des donnees personnelles, RGPD, traitement des donnees de mineurs.",
};

export default function PrivacyPage() {
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
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Politique de confidentialite
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Derniere mise a jour : 21 mars 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
              <p>
                La societe Precepteur AI (ci-apres &laquo; nous &raquo;, &laquo; notre &raquo; ou &laquo; Precepteur AI &raquo;)
                s&apos;engage a proteger la vie privee de ses utilisateurs et des mineurs dont les donnees scolaires sont traitees
                par notre service.
              </p>
              <p className="mt-2">
                La presente politique de confidentialite decrit comment nous collectons, utilisons, stockons et protegeons
                vos donnees personnelles conformement au Reglement General sur la Protection des Donnees (RGPD)
                et a la loi Informatique et Libertes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des donnees est :<br />
                Precepteur AI<br />
                Email : contact@precepteur.ai<br />
                Delegue a la protection des donnees (DPO) : dpo@precepteur.ai
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Donnees collectees</h2>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">3.1 Donnees fournies directement</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Adresse email (pour l&apos;inscription et la communication)</li>
                <li>Identifiants Pronote (chiffres en AES-256, jamais stockes en clair)</li>
                <li>Preferences de messagerie (Telegram ou WhatsApp)</li>
                <li>Identifiant Telegram ou numero WhatsApp</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">3.2 Donnees scolaires consultees</h3>
              <p>Via votre compte Pronote, nous consultons en lecture seule :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Notes et moyennes de l&apos;eleve</li>
                <li>Devoirs et cahier de textes</li>
                <li>Absences et retards</li>
                <li>Emploi du temps</li>
              </ul>
              <p className="mt-2">
                <strong className="text-foreground">Important :</strong> Nous n&apos;accedons jamais aux donnees medicales,
                disciplinaires ou de messagerie interne de Pronote.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">3.3 Donnees collectees automatiquement</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Donnees de navigation anonymisees (pages visitees, duree)</li>
                <li>Adresse IP (anonymisee)</li>
                <li>Type de navigateur et systeme d&apos;exploitation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Protection des donnees de mineurs</h2>
              <p>
                Precepteur AI traite des donnees relatives a des mineurs (eleves de college et lycee). A ce titre,
                nous appliquons des mesures de protection renforcees :
              </p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Le consentement parental est requis pour toute utilisation du service</li>
                <li>Seules les donnees strictement necessaires au fonctionnement du service sont collectees</li>
                <li>Aucune donnee de mineur n&apos;est utilisee a des fins publicitaires ou de profilage commercial</li>
                <li>Les donnees ne sont jamais partagees avec des tiers a des fins marketing</li>
                <li>Un droit de suppression immediat est garanti</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Finalites du traitement</h2>
              <p>Vos donnees sont traitees pour les finalites suivantes :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Fourniture du service : generation de bilans scolaires quotidiens et hebdomadaires</li>
                <li>Alertes personnalisees : notifications en cas de note basse, absence ou tendance negative</li>
                <li>Exercices personnalises : generation d&apos;exercices adaptes au niveau de l&apos;eleve</li>
                <li>Amelioration du service : analyse anonymisee pour ameliorer l&apos;experience utilisateur</li>
                <li>Communication : envoi d&apos;informations relatives au service (mises a jour, maintenance)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Base legale du traitement</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong className="text-foreground">Consentement :</strong> pour l&apos;inscription et l&apos;utilisation du service</li>
                <li><strong className="text-foreground">Execution du contrat :</strong> pour la fourniture du service souscrit</li>
                <li><strong className="text-foreground">Interet legitime :</strong> pour l&apos;amelioration du service et la securite</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Securite des donnees</h2>
              <p>Nous mettons en oeuvre les mesures de securite suivantes :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Chiffrement AES-256 des identifiants Pronote</li>
                <li>Chiffrement TLS/SSL pour toutes les communications</li>
                <li>Hebergement en France sur des serveurs securises</li>
                <li>Acces restreint aux donnees (principe du moindre privilege)</li>
                <li>Journalisation et surveillance des acces</li>
                <li>Tests de securite reguliers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Duree de conservation</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Donnees de compte : conservees pendant la duree de l&apos;abonnement + 30 jours apres la suppression du compte</li>
                <li>Donnees scolaires : conservees pendant l&apos;annee scolaire en cours, supprimees en fin d&apos;annee scolaire</li>
                <li>Identifiants Pronote : supprimes immediatement lors de la suppression du compte</li>
                <li>Donnees de navigation : anonymisees apres 13 mois</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Partage des donnees</h2>
              <p>
                <strong className="text-foreground">Nous ne vendons jamais vos donnees.</strong> Vos donnees peuvent etre partagees uniquement avec :
              </p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Nos sous-traitants techniques (hebergement, envoi de messages) dans le cadre strict de la fourniture du service</li>
                <li>Les autorites competentes en cas d&apos;obligation legale</li>
              </ul>
              <p className="mt-2">Tous nos sous-traitants sont soumis a des obligations contractuelles de confidentialite conformes au RGPD.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Vos droits</h2>
              <p>Conformement au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li><strong className="text-foreground">Droit d&apos;acces :</strong> obtenir une copie de vos donnees personnelles</li>
                <li><strong className="text-foreground">Droit de rectification :</strong> corriger des donnees inexactes</li>
                <li><strong className="text-foreground">Droit a l&apos;effacement :</strong> demander la suppression de vos donnees</li>
                <li><strong className="text-foreground">Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>
                <li><strong className="text-foreground">Droit d&apos;opposition :</strong> vous opposer au traitement de vos donnees</li>
                <li><strong className="text-foreground">Droit a la limitation :</strong> limiter le traitement de vos donnees</li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, contactez-nous a : <a href="mailto:dpo@precepteur.ai" className="text-primary hover:underline">dpo@precepteur.ai</a>
              </p>
              <p className="mt-2">
                Vous avez egalement le droit d&apos;introduire une reclamation aupres de la CNIL
                (Commission Nationale de l&apos;Informatique et des Libertes) : <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Cookies</h2>
              <p>
                Notre site utilise uniquement des cookies techniques strictement necessaires au fonctionnement du site.
                Nous n&apos;utilisons pas de cookies publicitaires ou de suivi. Notre solution d&apos;analyse
                (respectueuse de la vie privee) ne depose aucun cookie et ne collecte aucune donnee personnelle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Modifications</h2>
              <p>
                Nous nous reservons le droit de modifier cette politique de confidentialite. En cas de modification
                substantielle, vous serez informe(e) par email ou via le service. La date de derniere mise a jour
                est indiquee en haut de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact</h2>
              <p>
                Pour toute question relative a cette politique de confidentialite ou au traitement de vos donnees :<br />
                Email : <a href="mailto:contact@precepteur.ai" className="text-primary hover:underline">contact@precepteur.ai</a><br />
                DPO : <a href="mailto:dpo@precepteur.ai" className="text-primary hover:underline">dpo@precepteur.ai</a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Precepteur AI. Tous droits reserves.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-primary transition-colors">CGU</Link>
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
