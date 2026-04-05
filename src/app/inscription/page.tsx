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
  XIcon,
  Menu,
  ExternalLink,
} from "lucide-react";

const API_URL = "https://precepteur-ai.onrender.com";

const ENT_OPTIONS = [
  { value: "ile_de_france", label: "Ile-de-France (MonLycee / MonCollege)" },
  { value: "ent77", label: "Seine-et-Marne (ENT77)" },
  { value: "ent91", label: "Essonne (ENT91)" },
  { value: "ac_lyon", label: "Academie de Lyon" },
  { value: "ac_rennes", label: "Academie de Rennes" },
  { value: "ac_reims", label: "Academie de Reims" },
  { value: "ac_orleans_tours", label: "Academie Orleans-Tours" },
  { value: "val_doise", label: "Val d'Oise" },
  { value: "e_lyco", label: "e-lyco (Pays de la Loire)" },
  { value: "laclasse_lyon", label: "laclasse.com (Lyon)" },
  { value: "occitanie_montpellier", label: "Occitanie (Montpellier)" },
  { value: "", label: "Connexion directe (sans ENT)" },
];

// Bug 1: 3 steps only — Infos, Pronote, Confirmation (platform removed)
const STEPS = ["Vos informations", "Pronote", "Confirmation"];

export default function InscriptionParentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <InscriptionParentContent />
    </Suspense>
  );
}

function InscriptionParentContent() {
  const [step, setStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Step 1
  const [prenom, setPrenom] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [telephone, setTelephone] = useState("");
  const [childHasPhone, setChildHasPhone] = useState<boolean | null>(null);

  // Step 2
  const [connectPronote, setConnectPronote] = useState(true);
  const [pronoteUrl, setPronoteUrl] = useState("");
  const [pronoteEnt, setPronoteEnt] = useState("ile_de_france");
  const [pronoteUsername, setPronoteUsername] = useState("");
  const [pronotePassword, setPronotePassword] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<Array<{name: string; context: string; lat: number; lng: number}>>([]);
  const [schools, setSchools] = useState<Array<{nomEtab: string; url: string; cp?: string}>>([]);
  const [selectedSchool, setSelectedSchool] = useState<{nomEtab: string; url: string; cp?: string} | null>(null);
  const [schoolFilter, setSchoolFilter] = useState("");
  const [showManualUrl, setShowManualUrl] = useState(false);

  // Bug 5: Pronote test state
  const [pronoteTestLoading, setPronoteTestLoading] = useState(false);
  const [pronoteTestError, setPronoteTestError] = useState("");
  const [pronoteTestSuccess, setPronoteTestSuccess] = useState(false);

  // Bug 1: platform always whatsapp, no step 3
  const platform = "whatsapp";

  // Step 4 (success)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Bug 4: Warm up Render on form load
  useEffect(() => {
    // Warm up Render backend (cold start takes 30-60s on free tier)
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Bug 2: inverted — childHasPhone=false means parent_child (shared), true means parent (separate)
          role: childHasPhone === false ? "parent_child" : "parent",
          parent_first_name: prenom,
          parent_email: emailVal,
          parent_phone: telephone,
          child_has_phone: childHasPhone ?? false,
          has_pronote: connectPronote,
          pronote_url: connectPronote ? pronoteUrl : "",
          pronote_username: connectPronote ? pronoteUsername : "",
          pronote_password: connectPronote ? pronotePassword : "",
          pronote_ent: connectPronote ? pronoteEnt : "",
          platform,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        // Bug 1: step 4 = success (no step 5 anymore, steps are 1,2,3,4)
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

  const step1Valid = prenom.trim() && emailVal.trim() && telephone.trim() && childHasPhone !== null;
  const step2Valid = !connectPronote || (pronoteUrl.trim() && pronoteUsername.trim() && pronotePassword.trim());

  // Bug 5: Test Pronote connection before advancing from step 2
  async function handleStep2Continue() {
    if (!connectPronote) {
      setStep(3);
      return;
    }

    // All pronote fields must be filled
    if (!pronoteUrl.trim() || !pronoteUsername.trim() || !pronotePassword.trim()) {
      return;
    }

    setPronoteTestLoading(true);
    setPronoteTestError("");
    setPronoteTestSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/pronote/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pronote_url: pronoteUrl,
          username: pronoteUsername,
          password: pronotePassword,
          ent_type: pronoteEnt,
          registration_id: "test_" + Date.now(),
        }),
      });

      const data = await res.json();

      if (data.ok || res.ok) {
        setPronoteTestSuccess(true);
        // Advance after short delay so user sees success message
        setTimeout(() => {
          setPronoteTestLoading(false);
          setStep(3);
        }, 800);
      } else {
        setPronoteTestLoading(false);
        setPronoteTestError(data.error || "Connexion Pronote échouée. Vérifiez vos identifiants.");
      }
    } catch {
      setPronoteTestLoading(false);
      setPronoteTestError("Impossible de tester la connexion Pronote. Vérifiez vos identifiants ou continuez sans.");
    }
  }

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
      // Bug 3: better error handling + logging for schools fetch
      if (!res.ok) {
        console.error("schools fetch error:", res.status, res.statusText);
        setSchools([]);
        return;
      }
      const data = await res.json();
      console.log("schools response:", data);
      // API returns a flat array of objects with nomEtab, url, cp
      const list = Array.isArray(data) ? data : (data.results || data.etablissements || []);
      setSchools(list);
    } catch (err) {
      console.error("schools fetch exception:", err);
      setSchools([]);
    }
  }

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
            <Link href="/inscription">
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
          {/* Progress steps — Bug 1: 3 steps only (1=Infos, 2=Pronote, 3=Confirmation) */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
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
                  {s < 3 && (
                    <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 1: Vos informations */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Vos informations
                </h1>
                <p className="text-muted-foreground text-lg">
                  Inscription en 2 minutes. Premier bilan ce soir à 19h.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Prénom
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
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Votre enfant a-t-il son propre téléphone ?
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setChildHasPhone(true)}
                        className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                          childHasPhone === true
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-muted-foreground hover:border-gray-300"
                        }`}
                      >
                        Oui
                      </button>
                      <button
                        type="button"
                        onClick={() => setChildHasPhone(false)}
                        className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                          childHasPhone === false
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-muted-foreground hover:border-gray-300"
                        }`}
                      >
                        Non
                      </button>
                    </div>
                    {childHasPhone === true && (
                      <p className="mt-3 text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">
                        Il recevra ses exercices sur son propre téléphone.
                      </p>
                    )}
                    {childHasPhone === false && (
                      <p className="mt-3 text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">
                        Vous recevrez les exercices et bilans sur le même compte.
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
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
                  Pronote <span className="text-muted-foreground text-2xl font-normal">(optionnel)</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Connectez Pronote pour recevoir les notes et devoirs automatiquement.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-5">
                  {/* Toggle */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setConnectPronote(true); setPronoteTestError(""); setPronoteTestSuccess(false); }}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        connectPronote
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      Connecter Pronote maintenant
                    </button>
                    <button
                      type="button"
                      onClick={() => { setConnectPronote(false); setPronoteTestError(""); setPronoteTestSuccess(false); }}
                      className={`flex-1 rounded-lg border-2 p-4 text-sm font-medium transition-colors cursor-pointer ${
                        !connectPronote
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-muted-foreground hover:border-gray-300"
                      }`}
                    >
                      Plus tard
                    </button>
                  </div>

                  {connectPronote ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ville de l&apos;établissement
                        </label>
                        <Input
                          type="text"
                          placeholder="Tapez le nom de votre ville..."
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
                            Choisissez l&apos;établissement
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
                                   onClick={() => { setSelectedSchool(s); setPronoteUrl(s.url); }}>
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
                                  onClick={() => { setSelectedSchool(null); setPronoteUrl(""); setSchools([]); setCityQuery(""); }}>
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
                              onChange={(e) => setPronoteUrl(e.target.value)}
                              className="h-11"
                            />
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ENT (portail académique)
                        </label>
                        <select
                          value={pronoteEnt}
                          onChange={(e) => setPronoteEnt(e.target.value)}
                          className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                          Identifiant Pronote
                        </label>
                        <Input
                          type="text"
                          placeholder="Votre identifiant"
                          value={pronoteUsername}
                          onChange={(e) => { setPronoteUsername(e.target.value); setPronoteTestError(""); setPronoteTestSuccess(false); }}
                          className="h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Mot de passe Pronote
                        </label>
                        <Input
                          type="password"
                          placeholder="Votre mot de passe"
                          value={pronotePassword}
                          onChange={(e) => { setPronotePassword(e.target.value); setPronoteTestError(""); setPronoteTestSuccess(false); }}
                          className="h-11"
                        />
                      </div>

                      {/* Bug 5: Pronote test result feedback */}
                      {pronoteTestLoading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Test de connexion Pronote en cours...
                        </div>
                      )}
                      {pronoteTestSuccess && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                          <CheckCircle className="h-4 w-4" />
                          Connexion réussie !
                        </div>
                      )}
                      {pronoteTestError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{pronoteTestError}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => { setPronoteTestError(""); setPronoteTestSuccess(false); }}
                              className="flex-1"
                            >
                              Réessayer
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => { setConnectPronote(false); setPronoteTestError(""); setStep(3); }}
                              className="flex-1"
                            >
                              Continuer sans Pronote
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Vous pourrez connecter Pronote plus tard depuis votre espace personnel.
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
                    {/* Bug 5: use handleStep2Continue instead of direct setStep(3) */}
                    {!pronoteTestError && (
                      <Button
                        onClick={handleStep2Continue}
                        disabled={!step2Valid || pronoteTestLoading}
                        className="flex-1 gap-2 h-11 text-base"
                      >
                        {pronoteTestLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Test en cours...
                          </>
                        ) : (
                          <>
                            Continuer
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Confirmation (was step 4) — Bug 1: back goes to step 2 */}
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
                <CardContent className="pt-6 space-y-1">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Prénom</span>
                    <span className="text-sm font-medium">{prenom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium">{emailVal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Téléphone</span>
                    <span className="text-sm font-medium">{telephone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Enfant avec téléphone</span>
                    <span className="text-sm font-medium">{childHasPhone ? "Oui" : "Non"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Pronote</span>
                    <span className="text-sm font-medium">{connectPronote ? "Connecté" : "Plus tard"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Plateforme</span>
                    <span className="text-sm font-medium">WhatsApp</span>
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

          {/* Step 4: Success — Bug 1: WhatsApp only, no Telegram button */}
          {step === 4 && (
            <div className="text-center">
              <div className="mb-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Inscription réussie !
                </h1>
                <p className="text-muted-foreground text-lg mb-2">
                  Bienvenue sur Précepteur AI, {prenom}.
                </p>
                <p className="text-muted-foreground">
                  Vous recevrez votre premier bilan ce soir à 19h.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/33664624258?text=Bonjour"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2 h-14 text-lg font-semibold">
                    Démarrer sur WhatsApp
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>

                <p className="text-sm text-muted-foreground">
                  Vous recevrez votre premier bilan ce soir à 19h.
                </p>
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
