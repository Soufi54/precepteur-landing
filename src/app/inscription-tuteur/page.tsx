"use client";

import { Suspense, useState, useEffect } from "react";
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
  const [phone, setPhone] = useState("");
  const [hasEleves, setHasEleves] = useState(false);
  const [codeEleve, setCodeEleve] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Warm up Render on page load
  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const body: Record<string, unknown> = {
        role: "tutor",
        parent_first_name: prenom,
        email,
        phone,
        child_has_phone: false,
        has_pronote: false,
        platform: "whatsapp",
      };

      if (hasEleves && codeEleve.trim()) {
        body.student_code = codeEleve.trim();
      }

      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.ok) {
        setStep(4);
      } else {
        setError(data.error || "Une erreur est survenue. Réessayez.");
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  const STEPS = ["Informations", "Élèves", "Confirmation", "Succès"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Précepteur AI</span>
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
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    step > s
                      ? "bg-primary text-primary-foreground"
                      : step === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {STEPS[s - 1]}
                </span>
                {s < 4 && (
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
                  Suivez les progrès de vos élèves en temps réel sur WhatsApp.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Votre prénom
                    </label>
                    <Input
                      type="text"
                      placeholder="Votre prénom"
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Votre téléphone (WhatsApp)
                    </label>
                    <Input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11"
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Nécessaire pour vous contacter via WhatsApp.
                    </p>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!prenom.trim() || !email.trim() || !phone.trim()}
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
                  Vos élèves
                </h1>
                <p className="text-muted-foreground">
                  Avez-vous un code de liaison d&apos;un élève ?
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
                      Oui, j&apos;en ai un
                    </button>
                  </div>

                  {hasEleves && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Code de liaison <span className="text-muted-foreground font-normal">(facultatif)</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Code fourni par le parent ou l'élève"
                        value={codeEleve}
                        onChange={(e) => setCodeEleve(e.target.value)}
                        className="h-11"
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Ce code vous est transmis par la famille de l&apos;élève.
                      </p>
                    </div>
                  )}

                  {!hasEleves && (
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Vous pourrez associer des élèves directement depuis votre espace après inscription.
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
                  Vérifiez vos informations avant de valider.
                </p>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Prénom</span>
                    <span className="text-sm font-medium">{prenom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium">{email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Téléphone</span>
                    <span className="text-sm font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Plateforme</span>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Code élève</span>
                    <span className="text-sm font-medium">
                      {hasEleves && codeEleve.trim() ? codeEleve.trim() : "Aucun"}
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
                  Inscription réussie !
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  Bienvenue sur Précepteur AI, {prenom}.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-green-800">
                    Vous allez recevoir un message WhatsApp. Si vous ne le recevez pas, ouvrez WhatsApp et envoyez &ldquo;Bonjour&rdquo; au <strong>06 64 62 42 58</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <a href="https://wa.me/33664624258?text=Bonjour" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 h-12 text-base">
                    Ouvrir WhatsApp
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="ghost" className="w-full text-sm text-muted-foreground">
                    Retour à l&apos;accueil
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Précepteur AI. Tous droits réservés.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-primary transition-colors">CGU</Link>
            <span>&middot;</span>
            <Link href="/legal" className="hover:text-primary transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
