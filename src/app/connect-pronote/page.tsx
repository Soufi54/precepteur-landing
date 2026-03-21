"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Lock,
  Shield,
  Check,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  BookOpen,
  FileText,
  Clock,
  XIcon,
  Menu,
  Flag,
} from "lucide-react";

export default function ConnectPronotePage() {
  const [step, setStep] = useState(1);
  const [pronoteUrl, setPronoteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setConnecting(false);
    setConnected(true);
    setStep(3);
  };

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
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={`text-sm hidden sm:inline ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Informations" : s === 2 ? "Connexion" : "Termine"}
                </span>
                {s < 3 && (
                  <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Information */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Connectez votre compte Pronote
                </h1>
                <p className="text-muted-foreground text-lg">
                  En 2 minutes, commencez a recevoir vos bilans quotidiens.
                </p>
              </div>

              {/* What we access */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Ce que nous consultons (lecture seule)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Notes et moyennes</p>
                        <p className="text-sm text-muted-foreground">Toutes les notes, moyennes de classe, coefficients</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Devoirs et cahier de textes</p>
                        <p className="text-sm text-muted-foreground">Devoirs a rendre, dates limites, consignes</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Absences et retards</p>
                        <p className="text-sm text-muted-foreground">Absences justifiees et non justifiees, retards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Emploi du temps</p>
                        <p className="text-sm text-muted-foreground">Planning des cours, modifications d&apos;emploi du temps</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* What we DON'T do */}
              <Card className="mb-6 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Ce que nous ne faisons JAMAIS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <XIcon className="h-4 w-4 text-red-500 shrink-0" />
                      Modifier des donnees sur Pronote
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="h-4 w-4 text-red-500 shrink-0" />
                      Envoyer des messages a l&apos;etablissement
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="h-4 w-4 text-red-500 shrink-0" />
                      Partager vos identifiants avec des tiers
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="h-4 w-4 text-red-500 shrink-0" />
                      Vendre ou partager les donnees scolaires
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Security info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <Lock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Chiffrement AES-256</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <Flag className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Heberge en France</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Conforme RGPD</p>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full gap-2 h-12 text-base">
                Continuer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Connection form */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Vos identifiants Pronote
                </h1>
                <p className="text-muted-foreground">
                  Ces informations sont chiffrees et securisees. Nous ne les voyons jamais en clair.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleConnect} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        URL Pronote de l&apos;etablissement
                      </label>
                      <Input
                        type="url"
                        placeholder="https://0123456A.index-education.net/pronote/"
                        value={pronoteUrl}
                        onChange={(e) => setPronoteUrl(e.target.value)}
                        required
                        className="h-11"
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Vous trouverez cette adresse sur le site de l&apos;etablissement ou dans vos emails de rentree.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Identifiant parent
                      </label>
                      <Input
                        type="text"
                        placeholder="votre.identifiant"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Votre mot de passe Pronote"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-11 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3">
                      <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Vos identifiants sont chiffres avec le standard <strong className="text-foreground">AES-256</strong> avant
                        d&apos;etre stockes. Personne chez Precepteur AI ne peut les lire. Vous pouvez les supprimer a tout moment.
                      </p>
                    </div>

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
                        type="submit"
                        disabled={connecting || !pronoteUrl || !username || !password}
                        className="flex-1 gap-2 h-11 text-base"
                      >
                        {connecting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Test de connexion en cours...
                          </>
                        ) : (
                          <>
                            Tester la connexion
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center">
              <div className="mb-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Connexion reussie !
                </h1>
                <p className="text-muted-foreground text-lg">
                  Votre compte Pronote est connecte. Voici ce que nous avons trouve :
                </p>
              </div>

              {/* Mock data found */}
              <Card className="mb-8 text-left">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <span className="font-medium">Etablissement</span>
                      </div>
                      <span className="text-muted-foreground">College Jean Moulin</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="font-medium">Enfant(s) detecte(s)</span>
                      </div>
                      <span className="text-muted-foreground">Yasmine D. — 4eme B</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">Notes disponibles</span>
                      </div>
                      <span className="text-muted-foreground">47 notes ce trimestre</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">Prochain bilan</span>
                      </div>
                      <span className="text-primary font-medium">Ce soir a 19h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Link href="/#inscription">
                  <Button className="w-full gap-2 h-12 text-base">
                    Finaliser mon inscription
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Plus qu&apos;une etape : choisissez Telegram ou WhatsApp pour recevoir vos bilans.
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
