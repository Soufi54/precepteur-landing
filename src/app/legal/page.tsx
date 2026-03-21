import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Legales | Precepteur AI",
  description:
    "Mentions legales de Precepteur AI conformement a la loi francaise. Editeur, hebergeur, CNIL.",
};

export default function LegalPage() {
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
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Mentions legales
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Conformement aux dispositions de la loi n&deg; 2004-575 du 21 juin 2004 pour la confiance dans
            l&apos;economie numerique (LCEN), les presentes mentions legales sont portees a la connaissance
            des utilisateurs du site precepteur-ai.com.
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Editeur du site</h2>
              <p>
                Le site precepteur-ai.com est edite par :<br /><br />
                <strong className="text-foreground">Precepteur AI</strong><br />
                Forme juridique : SAS (Societe par Actions Simplifiee)<br />
                Siege social : Paris, France<br />
                Email : <a href="mailto:contact@precepteur.ai" className="text-primary hover:underline">contact@precepteur.ai</a><br />
                Directeur de la publication : Le president de la societe Precepteur AI
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Hebergeur</h2>
              <p>
                Le site est heberge par :<br /><br />
                <strong className="text-foreground">Cloudflare, Inc.</strong><br />
                101 Townsend St, San Francisco, CA 94107, USA<br />
                Site web : <a href="https://www.cloudflare.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.cloudflare.com</a><br /><br />
                Les donnees utilisateurs sont stockees en France sur des serveurs conformes aux normes europeennes
                de protection des donnees.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Protection des donnees personnelles (CNIL)</h2>
              <p>
                Conformement au Reglement General sur la Protection des Donnees (RGPD) et a la loi Informatique
                et Libertes du 6 janvier 1978 modifiee, vous disposez de droits sur vos donnees personnelles.
              </p>
              <p className="mt-2">
                Le traitement des donnees personnelles effectue par Precepteur AI a fait l&apos;objet des declarations
                necessaires aupres de la CNIL (Commission Nationale de l&apos;Informatique et des Libertes).
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Delegue a la protection des donnees (DPO) :</strong><br />
                Email : <a href="mailto:dpo@precepteur.ai" className="text-primary hover:underline">dpo@precepteur.ai</a>
              </p>
              <p className="mt-2">
                Pour plus d&apos;informations sur le traitement de vos donnees, veuillez consulter notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">Politique de confidentialite</Link>.
              </p>
              <p className="mt-2">
                Vous pouvez exercer vos droits (acces, rectification, effacement, opposition, portabilite, limitation)
                en contactant notre DPO a l&apos;adresse ci-dessus.
              </p>
              <p className="mt-2">
                En cas de difficulte, vous pouvez introduire une reclamation aupres de la CNIL :<br />
                CNIL — 3 Place de Fontenoy — TSA 80715 — 75334 PARIS CEDEX 07<br />
                <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Propriete intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu du site precepteur-ai.com (textes, images, graphismes, logos, icones,
                logiciels, base de donnees) est la propriete exclusive de Precepteur AI ou de ses partenaires
                et est protege par les lois francaises et internationales relatives a la propriete intellectuelle.
              </p>
              <p className="mt-2">
                Toute reproduction, representation, modification, publication, transmission ou denaturation, totale
                ou partielle, du site ou de son contenu, par quelque procede que ce soit, et sur quelque support
                que ce soit, est interdite sans l&apos;autorisation ecrite prealable de Precepteur AI.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
              <p>
                Le site precepteur-ai.com utilise uniquement des cookies techniques strictement necessaires
                au fonctionnement du site. Aucun cookie publicitaire ou de tracking n&apos;est utilise.
              </p>
              <p className="mt-2">
                Conformement a la reglementation en vigueur, les cookies techniques ne necessitent pas
                le consentement prealable de l&apos;utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation de responsabilite</h2>
              <p>
                Precepteur AI s&apos;efforce d&apos;assurer l&apos;exactitude et la mise a jour des informations
                diffusees sur le site. Toutefois, Precepteur AI ne peut garantir l&apos;exactitude, la precision
                ou l&apos;exhaustivite des informations mises a disposition.
              </p>
              <p className="mt-2">
                Precepteur AI decline toute responsabilite pour toute interruption ou indisponibilite du site,
                pour tout dommage resultant d&apos;une intrusion frauduleuse d&apos;un tiers, ou pour toute
                inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens hypertextes vers d&apos;autres sites web. Precepteur AI ne dispose
                d&apos;aucun moyen de controle du contenu de ces sites tiers et n&apos;assume aucune responsabilite
                quant a leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Droit applicable</h2>
              <p>
                Les presentes mentions legales sont regies par le droit francais. En cas de litige, et apres
                tentative de resolution amiable, les tribunaux francais seront seuls competents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact</h2>
              <p>
                Pour toute question relative aux presentes mentions legales :<br />
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
            <Link href="/terms" className="hover:text-primary transition-colors">CGU</Link>
            <span>&middot;</span>
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
