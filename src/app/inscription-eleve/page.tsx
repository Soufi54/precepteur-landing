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
  Lock,
  Eye,
  EyeOff,
  XIcon,
  Menu,
  ExternalLink,
} from "lucide-react";

const API_URL = "https://precepteur-ai.onrender.com";

const CLASS_LEVELS = [
  { value: "6eme", label: "6ème" },
  { value: "5eme", label: "5ème" },
  { value: "4eme", label: "4ème" },
  { value: "3eme", label: "3ème" },
  { value: "2nde", label: "2nde" },
  { value: "1ere", label: "1ère" },
  { value: "Terminale", label: "Terminale" },
];

const ENT_OPTIONS = [
  { value: "ile_de_france", label: "Ile-de-France (MonLycee / MonCollege)" },
  { value: "ent77", label: "Seine-et-Marne (ENT77)" },
  { value: "ent91", label: "Essonne (ENT91)" },
  { value: "ac_lyon", label: "Académie de Lyon" },
  { value: "ac_rennes", label: "Académie de Rennes" },
  { value: "ac_reims", label: "Académie de Reims" },
  { value: "ac_orleans_tours", label: "Académie Orléans-Tours" },
  { value: "val_doise", label: "Val d'Oise" },
  { value: "e_lyco", label: "e-lyco (Pays de la Loire)" },
  { value: "laclasse_lyon", label: "laclasse.com (Lyon)" },
  { value: "occitanie_montpellier", label: "Occitanie (Montpellier)" },
  { value: "", label: "Connexion directe (sans ENT)" },
];

export default function InscriptionElevePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <InscriptionEleveContent />
    </Suspense>
  );
}

function InscriptionEleveContent() {
  const [step, setStep] = useState(1);
  const [prenom, setPrenom] = useState("");
  const [classLevel, setClassLevel] = useState("4eme");
  const [email, setEmail] = useState("");
  const [hasPronote, setHasPronote] = useState(false);
  const [pronoteUrl, setPronoteUrl] = useState("");
  const [entType, setEntType] = useState("ile_de_france");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<Array<{name: string; context: string; lat: number; lng: number}>>([]);
  const [schools, setSchools] = useState<Array<{nomEtab: string; url: string; cp?: string}>>([]);
  const [selectedSchool, setSelectedSchool] = useState<{nomEtab: string; url: string; cp?: string} | null>(null);
  const [schoolFilter, setSchoolFilter] = useState("");
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [pronoteTestStatus, setPronoteTestStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");
  const [pronoteTestError, setPronoteTestError] = useState("");

  // Warm up Render on page load
  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  const testPronote = async () => {
    if (!pronoteUrl || !username || !password) return;
    setPronoteTestStatus("testing");
    setPronoteTestError("");
    try {
      const res = await fetch(`${API_URL}/api/pronote/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pronote_url: pronoteUrl,
          ent_type: entType || "ile_de_france",
          username,
          password,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPronoteTestStatus("success");
      } else {
        setPronoteTestStatus("failed");
        setPronoteTestError(data.error || "Connexion échouée.");
      }
    } catch {
      setPronoteTestStatus("failed");
      setPronoteTestError("Impossible de tester la connexion.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const body: Record<string, unknown> = {
        role: "child",
        parent_first_name: prenom,
        child_class: classLevel,
        child_has_phone: true,
        has_pronote: hasPronote,
        platform: "whatsapp",
      };

      if (email.trim()) {
        body.email = email.trim();
      }

      if (hasPronote && pronoteUrl && username && password) {
        body.pronote_url = pronoteUrl;
        body.pronote_ent = entType || "ile_de_france";
        body.pronote_username = username;
        body.pronote_tested = pronoteTestStatus === "success";
        body.pronote_password = password;
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
        setError(data.error || "Une erreur est survenue. Réessaye.");
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessaye dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  async function searchCity(q: string) {
    if (q.length < 2) { setCityResults([]); return; }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&type=municipality&limit=6`);
      const data = await res.json();
      setCityResults((data.features || []).map((f: { properties: { city?: string; name?: string; context?: string }; geometry: { coordinates: number[] } }) => ({
        name: f.properties.city || f.properties.name || "",
        context: f.properties.context || "",
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      })));
    } catch { setCityResults([]); }
  }

  async function selectCity(city: {name: string; lat: number; lng: number}) {
    setCityQuery(city.name);
    setCityResults([]);
    setSelectedSchool(null);
    setSchoolFilter("");
    try {
      const res = await fetch("https://www.index-education.com/swie/geoloc.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(JSON.stringify({nomFonction: "geoLoc", lat: String(city.lat), long: String(city.lng)})),
      });
      const data = await res.json();
      setSchools(data || []);
    } catch { setSchools([]); }
  }

  const STEPS = ["Informations", "Pronote", "Confirmation", "Succès"];

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
                  Inscription élève
                </h1>
                <p className="text-muted-foreground text-lg">
                  Reçois chaque soir ton bilan personnalisé sur WhatsApp.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ton prénom
                    </label>
                    <Input
                      type="text"
                      placeholder="Ton prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ta classe
                    </label>
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {CLASS_LEVELS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-muted-foreground font-normal">(facultatif)</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="ton@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!prenom.trim()}
                    className="w-full gap-2 h-12 text-base"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Pronote */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Ton compte Pronote
                </h1>
                <p className="text-muted-foreground">
                  Tu as un compte Pronote ?
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setHasPronote(false)}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        !hasPronote
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      <XIcon className="h-5 w-5 mx-auto mb-2" />
                      Non
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasPronote(true)}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        hasPronote
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      <Check className="h-5 w-5 mx-auto mb-2" />
                      Oui
                    </button>
                  </div>

                  {!hasPronote && (
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Pas de problème. Tu pourras connecter ton compte Pronote plus tard depuis ton espace WhatsApp.
                      </p>
                    </div>
                  )}

                  {hasPronote && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ville de l&apos;établissement
                        </label>
                        <Input
                          type="text"
                          placeholder="Tapez le nom de ta ville..."
                          value={cityQuery}
                          onChange={(e) => { setCityQuery(e.target.value); searchCity(e.target.value); }}
                          className="h-11"
                        />
                        {cityResults.length > 0 && (
                          <div className="border rounded-lg mt-1 max-h-48 overflow-y-auto bg-white">
                            {cityResults.map((c, i) => (
                              <div key={i} className="px-4 py-2.5 cursor-pointer hover:bg-secondary/50 border-b last:border-b-0"
                                   onClick={() => selectCity(c)}>
                                <div className="font-semibold text-sm">{c.name}</div>
                                <div className="text-xs text-muted-foreground">{c.context}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {schools.length > 0 && !selectedSchool && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Choisis l&apos;établissement
                          </label>
                          <Input
                            type="text"
                            placeholder="Filtrer..."
                            value={schoolFilter}
                            onChange={(e) => setSchoolFilter(e.target.value)}
                            className="h-11 mb-1"
                          />
                          <div className="border rounded-lg max-h-64 overflow-y-auto bg-white">
                            {schools.filter(s => !schoolFilter || s.nomEtab.toLowerCase().includes(schoolFilter.toLowerCase())).map((s, i) => (
                              <div key={i} className="px-4 py-3 cursor-pointer hover:bg-green-50 border-b last:border-b-0"
                                   onClick={() => { setSelectedSchool(s); setPronoteUrl(s.url); setPronoteTestStatus("idle"); }}>
                                <div className="font-semibold text-sm">{s.nomEtab}</div>
                                <div className="text-xs text-muted-foreground">{s.url}</div>
                                {s.cp && <div className="text-xs text-muted-foreground">{s.cp}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSchool && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="font-semibold text-green-800 text-sm">{selectedSchool.nomEtab}</div>
                          <div className="text-xs text-muted-foreground mt-1">{selectedSchool.url}</div>
                          <button type="button" className="text-xs text-primary mt-2 underline"
                                  onClick={() => { setSelectedSchool(null); setPronoteUrl(""); setSchools([]); setCityQuery(""); setPronoteTestStatus("idle"); }}>
                            Changer d&apos;établissement
                          </button>
                        </div>
                      )}

                      {!selectedSchool && (
                        <div>
                          <button type="button" className="text-xs text-muted-foreground underline mb-2"
                                  onClick={() => setShowManualUrl(!showManualUrl)}>
                            Mon établissement n&apos;apparaît pas — entrer l&apos;URL manuellement
                          </button>
                          {showManualUrl && (
                            <Input
                              type="url"
                              placeholder="https://0000000a.index-education.net/pronote/"
                              value={pronoteUrl}
                              onChange={(e) => { setPronoteUrl(e.target.value); setPronoteTestStatus("idle"); }}
                              className="h-11"
                            />
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Espace Numérique de Travail (ENT)
                        </label>
                        <select
                          value={entType}
                          onChange={(e) => setEntType(e.target.value)}
                          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {ENT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ton identifiant Pronote
                        </label>
                        <Input
                          type="text"
                          placeholder="ton.identifiant"
                          value={username}
                          onChange={(e) => { setUsername(e.target.value); setPronoteTestStatus("idle"); }}
                          className="h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ton mot de passe
                        </label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ton mot de passe Pronote"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPronoteTestStatus("idle"); }}
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

                      {/* Pronote test button */}
                      {pronoteTestStatus === "idle" && pronoteUrl && username && password && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={testPronote}
                          className="w-full gap-2"
                        >
                          Tester la connexion Pronote
                        </Button>
                      )}

                      {pronoteTestStatus === "testing" && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Test de connexion en cours...
                        </div>
                      )}

                      {pronoteTestStatus === "success" && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm text-green-700">Connexion Pronote vérifiée.</span>
                        </div>
                      )}

                      {pronoteTestStatus === "failed" && (
                        <div className="space-y-2">
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-red-700">{pronoteTestError}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Vérifie tes identifiants ou continue sans Pronote — tu pourras le connecter plus tard.
                          </p>
                        </div>
                      )}

                      <div className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          Tes identifiants sont chiffrés avec le standard <strong className="text-foreground">AES-256</strong>.
                          Personne chez Précepteur AI ne peut les lire. Tu peux les supprimer à tout moment.
                        </p>
                      </div>
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
                    {/* If test failed, show "Continuer quand même" */}
                    {hasPronote && pronoteTestStatus === "failed" ? (
                      <Button
                        onClick={() => setStep(3)}
                        variant="outline"
                        className="flex-1 gap-2 h-11 text-base"
                      >
                        Continuer quand même
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setStep(3)}
                        className="flex-1 gap-2 h-11 text-base"
                      >
                        Continuer
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
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
                  Vérifie tes informations avant de valider.
                </p>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Prénom</span>
                    <span className="text-sm font-medium">{prenom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Classe</span>
                    <span className="text-sm font-medium">{classLevel}</span>
                  </div>
                  {email.trim() && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium">{email}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Plateforme</span>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Pronote</span>
                    <span className="text-sm font-medium">
                      {hasPronote && pronoteUrl && pronoteTestStatus === "success"
                        ? "Connecté"
                        : hasPronote && pronoteUrl && pronoteTestStatus !== "failed"
                        ? "À vérifier"
                        : hasPronote && pronoteTestStatus === "failed"
                        ? "Échec — à reconnecter plus tard"
                        : "À connecter plus tard"}
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
                    Tu vas recevoir un message WhatsApp. Si tu ne le reçois pas, ouvre WhatsApp et envoie &ldquo;Bonjour&rdquo; au <strong>06 64 62 42 58</strong>.
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
