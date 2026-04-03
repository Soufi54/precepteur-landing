"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users,
  XIcon,
  Menu,
  ExternalLink,
} from "lucide-react";

const API_URL = "https://precepteur-ai.onrender.com";

export default function InscriptionTuteurPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <InscriptionTuteurContent />
    </Suspense>
  );
}

function InscriptionTuteurContent() {
  const [step, setStep] = useState(1);
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [hasEleves, setHasEleves] = useState(false);
  const [codeEleve, setCodeEleve] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "tutor",
          parent_first_name: prenom,
          parent_email: email,
          child_has_phone: false,
          has_pronote: false,
          ...(hasEleves && codeEleve ? { liaison_code: codeEleve } : {}),
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setTelegramLink(data.telegram_link);
        setStep(4);
      } else {
        setError(data.error || "Une erreur est survenue. Reessayez.");
      }
    } catch {
      setError("Impossible de contacter le serveur. Reessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  const STEPS = ["Informations", "Eleves", "Confirmation"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Precepteur AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/#inscription">
              <Button size="sm">S&apos;inscrire</Button>
            </Link>
          </nav>
          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm text-muted-foreground py-1" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
            <Link href="/blog" className="block text-sm text-muted-foreground py-1" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          {/* Progress steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    step > s || (step === 4)
                      ? "bg-primary text-primary-foreground"
                      : step === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {(step > s || step === 4) ? <Check className="h-4 w-4" /> : s}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {STEPS[s - 1]}
                </span>
                {s < 3 && (
                  <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Informations */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Inscription tuteur / accompagnant
                </h1>
                <p className="text-muted-foreground text-lg">
                  Suivez les progres de vos eleves en temps reel.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Votre prenom
                    </label>
                    <Input
                      type="text"
                      placeholder="Votre prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Votre email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!prenom.trim() || !email.trim()}
                    className="w-full gap-2 h-12 text-base"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Eleves */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Vos eleves
                </h1>
                <p className="text-muted-foreground">
                  Avez-vous deja des eleves inscrits sur Precepteur AI ?
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setHasEleves(false)}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        !hasEleves
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      <Users className="h-5 w-5 mx-auto mb-2" />
                      Pas encore
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasEleves(true)}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        hasEleves
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      <Check className="h-5 w-5 mx-auto mb-2" />
                      Oui, j&apos;en ai
                    </button>
                  </div>

                  {hasEleves && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Code de liaison
                      </label>
                      <Input
                        type="text"
                        placeholder="Code fourni par le parent"
                        value={codeEleve}
                        onChange={(e) => setCodeEleve(e.target.value)}
                        className="h-11"
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Ce code vous est transmis par le parent de l&apos;eleve.
                      </p>
                    </div>
                  )}

                  {!hasEleves && (
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Vous pourrez inviter des parents et associer des eleves directement depuis votre compte Telegram apres inscription.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 gap-2 h-11 text-base"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Confirmation
                </h1>
                <p className="text-muted-foreground">
                  Verifiez vos informations avant de valider.
                </p>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Prenom</span>
                    <span className="text-sm font-medium">{prenom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium">{email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Eleves existants</span>
                    <span className="text-sm font-medium">
                      {hasEleves ? (codeEleve ? `Oui (code: ${codeEleve})` : "Oui") : "Non"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setStep(2); setError(""); }}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 gap-2 h-11 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      Valider l&apos;inscription
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center">
              <div className="mb-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Inscription reussie !
                </h1>
                <p className="text-muted-foreground text-lg">
                  Bienvenue sur Precepteur AI. Connectez-vous maintenant sur Telegram pour acceder a votre espace tuteur.
                </p>
              </div>

              <div className="space-y-4">
                {telegramLink ? (
                  <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2 h-12 text-base">
                      Ouvrir Telegram
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Link href="/#inscription">
                    <Button className="w-full gap-2 h-12 text-base">
                      Retour a l&apos;accueil
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <p className="text-sm text-muted-foreground">
                  Un lien de confirmation a ete envoye a {email}.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Precepteur AI. Tous droits reserves.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialite</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-primary transition-colors">CGU</Link>
            <span>&middot;</span>
            <Link href="/legal" className="hover:text-primary transition-colors">Mentions legales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
