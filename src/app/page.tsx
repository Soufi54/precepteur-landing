"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
      {n}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Pour l'instant on envoie vers un endpoint simple
    // A remplacer par Supabase ou Google Form quand pret
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // On marque quand meme comme soumis pour l'UX
    }
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <span className="text-xl font-bold text-primary">
            Precepteur AI
          </span>
          <a href="#inscription">
            <Button size="sm">Rejoindre la beta</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-white px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            Beta gratuite — Places limitees
          </Badge>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Suivez la scolarite de votre enfant{" "}
            <span className="text-primary">sans effort</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Chaque soir, recevez un bilan clair et personnalise : notes,
            devoirs, absences. Plus besoin de courir apres les informations sur
            Pronote.
          </p>
          <a href="#inscription">
            <Button size="lg" className="text-lg px-8 py-6">
              Essayer gratuitement
            </Button>
          </a>
        </div>
      </section>

      {/* Probleme / Solution */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl font-semibold text-red-800">
                  Le quotidien des parents aujourd&apos;hui
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li className="flex gap-2">
                    <span className="shrink-0">&#10007;</span>
                    Pronote est complexe et peu intuitif
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">&#10007;</span>
                    Vous decouvrez les mauvaises notes trop tard
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">&#10007;</span>
                    Impossible de savoir si les devoirs sont faits
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">&#10007;</span>
                    Aucune alerte en cas d&apos;absence ou de decrochage
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl font-semibold text-green-800">
                  Avec Precepteur AI
                </h3>
                <ul className="space-y-3 text-green-700">
                  <li className="flex gap-2">
                    <CheckIcon />
                    Un bilan clair chaque soir sur Telegram
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon />
                    Alertes instantanees si note basse ou absence
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon />
                    Liste des devoirs avec dates limites
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon />
                    Exercices personnalises generes par IA
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3 Benefices */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Pourquoi les parents adorent Precepteur AI
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 text-4xl">&#128232;</div>
                <h3 className="mb-2 text-lg font-semibold">
                  Bilan quotidien automatique
                </h3>
                <p className="text-muted-foreground">
                  Chaque soir a 19h, un message clair resume la journee
                  scolaire de votre enfant. Zero effort de votre part.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 text-4xl">&#128202;</div>
                <h3 className="mb-2 text-lg font-semibold">
                  Suivi intelligent des notes
                </h3>
                <p className="text-muted-foreground">
                  Tendances, moyennes, alertes : vous voyez tout en un coup
                  d&apos;oeil. Reagissez avant qu&apos;il ne soit trop tard.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 text-4xl">&#129302;</div>
                <h3 className="mb-2 text-lg font-semibold">
                  Exercices adaptes par IA
                </h3>
                <p className="text-muted-foreground">
                  Des exercices generes selon le niveau reel de votre enfant
                  pour progresser la ou il en a le plus besoin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ca marche */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Comment ca marche
          </h2>
          <div className="space-y-10">
            <div className="flex gap-6 items-start">
              <StepNumber n={1} />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Connectez votre compte Pronote
                </h3>
                <p className="text-muted-foreground">
                  En 2 minutes, liez le compte Pronote de votre enfant. Vos
                  identifiants sont chiffres et securises.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <StepNumber n={2} />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Recevez votre bilan chaque soir
                </h3>
                <p className="text-muted-foreground">
                  A 19h, un message Telegram ou WhatsApp vous resume les
                  notes, devoirs et evenements de la journee.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <StepNumber n={3} />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Accompagnez votre enfant sereinement
                </h3>
                <p className="text-muted-foreground">
                  Posez des questions au bot, obtenez des exercices adaptes,
                  et suivez la progression semaine apres semaine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Un prix simple et transparent
          </h2>
          <p className="mb-8 text-muted-foreground">
            Pas d&apos;engagement, annulable a tout moment.
          </p>
          <Card className="border-primary/30">
            <CardContent className="pt-8 pb-8">
              <div className="mb-2 text-5xl font-bold text-primary">
                5,99 &euro;
              </div>
              <div className="mb-6 text-muted-foreground">par mois</div>
              <ul className="mb-8 space-y-3 text-left">
                <li className="flex gap-2">
                  <CheckIcon />
                  Bilan quotidien automatique
                </li>
                <li className="flex gap-2">
                  <CheckIcon />
                  Alertes notes et absences
                </li>
                <li className="flex gap-2">
                  <CheckIcon />
                  Exercices personnalises par IA
                </li>
                <li className="flex gap-2">
                  <CheckIcon />
                  Support via Telegram et WhatsApp
                </li>
                <li className="flex gap-2">
                  <CheckIcon />
                  Donnees chiffrees et securisees
                </li>
              </ul>
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
                Beta gratuite — aucune carte requise
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA / Inscription */}
      <section id="inscription" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Rejoignez la beta gratuite
          </h2>
          <p className="mb-8 text-muted-foreground">
            Soyez parmi les premiers parents a tester Precepteur AI.
            Inscrivez-vous et recevez votre premier bilan des ce soir.
          </p>
          {submitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="py-8">
                <div className="text-2xl mb-2">&#9989;</div>
                <p className="text-lg font-semibold text-green-800">
                  Merci pour votre inscription !
                </p>
                <p className="text-green-700">
                  Nous vous contacterons tres bientot pour configurer votre
                  compte.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading} size="lg">
                {loading ? "..." : "S'inscrire"}
              </Button>
            </form>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Gratuit pendant la beta. Aucune carte bancaire requise.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">Precepteur AI</p>
          <p>
            L&apos;assistant scolaire intelligent pour les parents.
          </p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} Precepteur AI. Tous droits
            reserves.
          </p>
        </div>
      </footer>
    </div>
  );
}
