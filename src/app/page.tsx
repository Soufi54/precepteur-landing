"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { subscribeEmail } from "@/lib/supabase";
import {
  Mail,
  TrendingUp,
  Brain,
  Check,
  X,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowRight,
  MessageCircle,
  Smartphone,
  Link as LinkIcon,
  Users,
  Lock,
  Flag,
  Menu,
  XIcon,
  Bell,
  AlertTriangle,
  BarChart3,
  Calendar,
  UserPlus,
  FileText,
  Zap,
  Heart,
  Eye,
  CheckCircle,
  CircleDot,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                           */
/* ------------------------------------------------------------------ */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

function XItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <X className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20">
      {n}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="pb-5 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat mockup components                                            */
/* ------------------------------------------------------------------ */

function ChatBubbleBot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-end max-w-[85%]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
        PA
      </div>
      <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm">
        {children}
      </div>
    </div>
  );
}

function ChatBubbleUser({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-sm">
        {children}
      </div>
    </div>
  );
}

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-[2rem] border-4 border-gray-800 bg-gray-800 p-1 shadow-2xl">
        <div className="mx-auto mb-1 h-6 w-28 rounded-b-2xl bg-gray-800" />
        <div className="overflow-hidden rounded-[1.5rem] bg-[#e8e4df]">
          <div className="flex items-center gap-3 bg-primary px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-bold">
              PA
            </div>
            <div>
              <div className="text-sm font-semibold text-primary-foreground">
                Precepteur AI
              </div>
              <div className="text-xs text-primary-foreground/70">en ligne</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 px-3 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter component                                        */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card with icon                                            */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "primary",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="pt-6">
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Exit intent popup                                                 */
/* ------------------------------------------------------------------ */

function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    // Check if already dismissed
    if (typeof window !== "undefined" && localStorage.getItem("exitPopupDismissed")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown.current) {
        hasShown.current = true;
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("exitPopupDismissed", "true");
    }
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupEmail) return;
    try {
      await subscribeEmail(popupEmail);
    } catch {
      // Mark as submitted for UX
    }
    setPopupSubmitted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("exitPopupDismissed", "true");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Fermer"
        >
          <XIcon className="h-5 w-5" />
        </button>

        {popupSubmitted ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Merci !</h3>
            <p className="text-muted-foreground">
              Nous vous contacterons pour configurer votre compte.
            </p>
            <Button onClick={handleDismiss} className="mt-4">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Attendez ! Ne partez pas sans votre bilan gratuit
              </h3>
              <p className="text-muted-foreground text-sm">
                Inscrivez-vous maintenant et recevez votre premier bilan scolaire
                personnalise des ce soir. 100% gratuit pendant la beta.
              </p>
            </div>
            <form onSubmit={handlePopupSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={popupEmail}
                onChange={(e) => setPopupEmail(e.target.value)}
                required
                className="h-11"
              />
              <Button type="submit" className="w-full h-11 gap-2">
                Recevoir mon bilan gratuit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Aucune carte bancaire requise. Desinscription en un clic.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [email, setEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);

  async function handleSubmit(
    e: React.FormEvent,
    emailValue: string,
    setSubmittedFn: (v: boolean) => void,
    setLoadingFn: (v: boolean) => void,
  ) {
    e.preventDefault();
    if (!emailValue) return;
    setLoadingFn(true);

    // Track conversion event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("precepteur:signup", { detail: { email: emailValue } }));
    }

    try {
      await subscribeEmail(emailValue);
    } catch {
      // Mark as submitted for UX
    }
    setSubmittedFn(true);
    setLoadingFn(false);
  }

  const navLinks = [
    { label: "Fonctionnalites", href: "#fonctionnalites" },
    { label: "Comment ca marche", href: "#comment-ca-marche" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Temoignages", href: "#temoignages" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Exit intent popup */}
      <ExitIntentPopup />

      {/* ============================================================ */}
      {/*  STICKY HEADER                                               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">
              Precepteur AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
            <a href="#inscription">
              <Button size="sm">Essai gratuit</Button>
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="#inscription"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button size="sm" className="w-full">
                Essai gratuit
              </Button>
            </a>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/50 to-white px-4 py-16 md:py-24 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <Badge
                variant="secondary"
                className="mb-6 text-sm border border-primary/20 bg-primary/5 text-primary px-4 py-1.5"
              >
                Beta gratuite — Places limitees
              </Badge>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                Suivez la scolarite de votre enfant{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                  sans effort
                </span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Chaque soir, recevez un bilan clair et personnalise sur
                Telegram ou WhatsApp : notes, devoirs, absences. Plus besoin de
                naviguer dans Pronote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#inscription">
                  <Button size="lg" className="text-base px-8 py-6 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Essayer gratuitement 7 jours
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#comment-ca-marche">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6"
                  >
                    Decouvrir comment ca marche
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2 justify-center lg:justify-start">
                <Shield className="h-4 w-4" />
                Aucune carte bancaire requise. Donnees chiffrees AES-256.
              </p>
            </div>

            {/* Right: Phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup>
                <ChatBubbleBot>
                  <p className="font-semibold mb-2">
                    Bonsoir ! Voici le bilan de Yasmine (4eme B) :
                  </p>
                  <div className="space-y-1.5">
                    <p>
                      <TrendingUp className="inline h-4 w-4 mr-1 text-primary" />
                      <strong>Notes :</strong> Maths 14/20{" "}
                      <span className="text-muted-foreground">
                        (moyenne classe 11.5)
                      </span>
                    </p>
                    <p>
                      <BookOpen className="inline h-4 w-4 mr-1 text-orange-500" />
                      <strong>Devoirs :</strong> Exercices p.42 SVT{" "}
                      <span className="text-muted-foreground">
                        (pour jeudi)
                      </span>
                    </p>
                    <p>
                      <Check className="inline h-4 w-4 mr-1 text-green-500" />
                      <strong>Absences :</strong> Aucune aujourd&apos;hui
                    </p>
                  </div>
                  <p className="mt-3 pt-2 border-t border-gray-100 text-primary">
                    <Brain className="inline h-4 w-4 mr-1" />
                    Yasmine progresse en maths ! +2 points depuis septembre.
                  </p>
                </ChatBubbleBot>
                <div className="text-center text-xs text-muted-foreground">
                  19:02
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF BAR                                            */}
      {/* ============================================================ */}
      <section className="border-y bg-white px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm font-semibold text-foreground">
            <Users className="inline h-4 w-4 mr-1.5 text-primary" />
            Deja 50+ familles en beta
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <LinkIcon className="h-4 w-4 text-primary" />
              <span>Compatible Pronote</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" />
              <span>Donnees securisees</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flag className="h-4 w-4 text-primary" />
              <span>Made in France</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>4.9/5 satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROBLEM / SOLUTION                                          */}
      {/* ============================================================ */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Le suivi scolaire ne devrait pas etre un casse-tete
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Pronote contient toutes les informations, mais l&apos;interface est
            pensee pour les etablissements, pas pour les parents.
            Precepteur AI change la donne.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  Sans Precepteur AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-red-700">
                  <XItem>Pronote est complexe et peu intuitif</XItem>
                  <XItem>Vous decouvrez les mauvaises notes trop tard</XItem>
                  <XItem>Impossible de savoir si les devoirs sont faits</XItem>
                  <XItem>Aucune alerte en cas d&apos;absence ou de decrochage</XItem>
                  <XItem>Il faut se connecter chaque jour pour verifier</XItem>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50/50 ring-2 ring-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Avec Precepteur AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-700">
                  <CheckItem>Un bilan clair chaque soir sur Telegram ou WhatsApp</CheckItem>
                  <CheckItem>Alertes instantanees si note basse ou absence</CheckItem>
                  <CheckItem>Liste des devoirs avec dates limites</CheckItem>
                  <CheckItem>Exercices personnalises generes par IA</CheckItem>
                  <CheckItem>Tout arrive directement dans votre messagerie</CheckItem>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES (7 cards)                                          */}
      {/* ============================================================ */}
      <section
        id="fonctionnalites"
        className="bg-secondary/50 px-4 py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            Fonctionnalites
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Tout ce dont vous avez besoin, rien de superflu
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Precepteur AI transforme les donnees brutes de Pronote en informations
            claires et actionnables pour les parents.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FeatureCard
              icon={Mail}
              title="Bilans quotidiens IA"
              description="Chaque soir a 19h, un message clair resume la journee scolaire de votre enfant. Notes, devoirs, absences — zero effort de votre part."
              color="primary"
            />
            <FeatureCard
              icon={Bell}
              title="Alertes notes instantanees"
              description="Notification immediate quand une note significativement basse tombe. Ne decouvrez plus un 4/20 deux semaines apres."
              color="red"
            />
            <FeatureCard
              icon={BookOpen}
              title="Rappels devoirs avec aide IA"
              description="Liste des devoirs a rendre avec dates limites. L'IA peut expliquer les consignes et aider a demarrer les exercices."
              color="orange"
            />
            <FeatureCard
              icon={Eye}
              title="Suivi absences et retards"
              description="Alerte immediate en cas d'absence non justifiee ou de retard repete. Gardez le controle meme a distance."
              color="yellow"
            />
            <FeatureCard
              icon={Brain}
              title="Exercices personnalises IA"
              description="Des exercices generes selon le niveau reel de votre enfant pour progresser la ou il en a le plus besoin."
              color="purple"
            />
            <FeatureCard
              icon={BarChart3}
              title="Rapports hebdomadaires"
              description="Chaque dimanche, une synthese complete de la semaine avec tendances, evolution des moyennes et recommandations."
              color="blue"
            />
            <FeatureCard
              icon={Users}
              title="Multi-enfants"
              description="Suivez tous vos enfants au meme endroit. Un bilan par enfant, des alertes individualisees, une vue d'ensemble familiale."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS (3 steps)                                      */}
      {/* ============================================================ */}
      <section id="comment-ca-marche" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            Simple et rapide
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Pret en 2 minutes, sans rien installer
          </h2>
          <p className="mb-16 text-center text-muted-foreground max-w-2xl mx-auto">
            Trois etapes simples pour ne plus jamais rater une information
            scolaire importante.
          </p>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <StepNumber n={1} />
              <div className="mt-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <LinkIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Connectez Pronote
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Renseignez vos identifiants Pronote. Ils sont chiffres
                  en AES-256 et jamais stockes en clair. Acces en lecture seule.
                </p>
              </div>
            </div>
            <div className="text-center">
              <StepNumber n={2} />
              <div className="mt-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Recevez votre bilan
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Chaque soir a 19h, un message Telegram ou WhatsApp vous resume
                  les notes, devoirs et evenements de la journee.
                </p>
              </div>
            </div>
            <div className="text-center">
              <StepNumber n={3} />
              <div className="mt-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Votre enfant progresse
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Posez des questions au bot, obtenez des exercices
                  adaptes, et suivez la progression semaine apres semaine.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/connect-pronote">
              <Button variant="outline" size="lg" className="gap-2">
                Voir la demo de connexion
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEMO SECTION                                                */}
      {/* ============================================================ */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Votre assistant scolaire, toujours disponible
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Posez vos questions a tout moment. Precepteur AI vous
            repond instantanement avec des donnees precises.
          </p>
          <div className="mx-auto max-w-md">
            <PhoneMockup>
              <ChatBubbleBot>
                <p className="font-semibold mb-2">
                  Bonsoir ! Voici le bilan de Yasmine (4eme B) :
                </p>
                <div className="space-y-1">
                  <p>
                    <TrendingUp className="inline h-3.5 w-3.5 mr-1 text-primary" />
                    <strong>Maths :</strong> 14/20 (classe : 11.5)
                  </p>
                  <p>
                    <BookOpen className="inline h-3.5 w-3.5 mr-1 text-orange-500" />
                    <strong>Devoirs :</strong> SVT p.42 pour jeudi
                  </p>
                  <p>
                    <Check className="inline h-3.5 w-3.5 mr-1 text-green-500" />
                    <strong>Absences :</strong> Aucune
                  </p>
                </div>
              </ChatBubbleBot>
              <ChatBubbleUser>
                Elle a progresse en maths ce trimestre ?
              </ChatBubbleUser>
              <ChatBubbleBot>
                <p>
                  Oui ! Yasmine est passee de 11.8 de moyenne au T1
                  a 13.4 au T2. C&apos;est une belle progression de{" "}
                  <strong>+1.6 points</strong>.
                </p>
                <p className="mt-2 text-primary">
                  <TrendingUp className="inline h-3.5 w-3.5 mr-1" />
                  Elle se rapproche du top 10 de la classe.
                </p>
              </ChatBubbleBot>
              <ChatBubbleUser>
                Tu peux lui generer un exercice sur les fractions ?
              </ChatBubbleUser>
              <ChatBubbleBot>
                <p className="mb-2">
                  <Brain className="inline h-3.5 w-3.5 mr-1 text-primary" />
                  Voici un exercice adapte au niveau de Yasmine :
                </p>
                <div className="bg-primary/5 rounded-lg p-2 text-xs">
                  <p className="font-medium mb-1">
                    Exercice : Fractions (niveau 4eme)
                  </p>
                  <p>1) Simplifier 24/36</p>
                  <p>2) Calculer 3/4 + 2/5</p>
                  <p>3) Resoudre : x/3 = 8/12</p>
                </div>
              </ChatBubbleBot>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                       */}
      {/* ============================================================ */}
      <section className="px-4 py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <AnimatedCounter target={50} suffix="+" />
              <p className="mt-2 text-sm text-muted-foreground">Familles en beta</p>
            </div>
            <div>
              <AnimatedCounter target={2} suffix=" min" />
              <p className="mt-2 text-sm text-muted-foreground">Pour s&apos;inscrire</p>
            </div>
            <div>
              <AnimatedCounter target={98} suffix="%" />
              <p className="mt-2 text-sm text-muted-foreground">Taux de satisfaction</p>
            </div>
            <div>
              <AnimatedCounter target={0} suffix=" EUR" />
              <p className="mt-2 text-sm text-muted-foreground">Pendant la beta</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section id="temoignages" className="bg-secondary/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            Temoignages
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Ce que disent les parents
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Ils utilisent Precepteur AI depuis le lancement de la beta.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; Je n&apos;ouvre plus Pronote. Chaque soir je recois
                  le resume de la journee de Yasmine sur Telegram.
                  C&apos;est devenu mon rituel du soir, en 30 secondes je sais
                  tout. &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Karima M.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maman de Yasmine, 4eme — Paris
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; Lucas avait une moyenne qui baissait en physique et je
                  ne m&apos;en etais pas rendu compte. Grace a
                  l&apos;alerte de Precepteur AI, on a pu reagir a
                  temps. Indispensable. &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Thomas L.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Papa de Lucas, 3eme — Lyon
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; Adam me disait toujours qu&apos;il n&apos;avait pas
                  de devoirs. Maintenant je recois la liste chaque soir.
                  Fini les surprises la veille des controles ! &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Samia B.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maman d&apos;Adam, 6eme — Marseille
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; Avec trois enfants scolarises, je passais 30 minutes
                  chaque soir sur Pronote. Maintenant je recois trois bilans
                  clairs, c&apos;est fait en 2 minutes. Un gain de temps enorme. &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Sophie D.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maman de 3 enfants — Toulouse
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; Les exercices generes par l&apos;IA sont vraiment bien
                  adaptes. Ma fille a remonte sa moyenne de maths de 2 points
                  en un mois. Je recommande a tous les parents. &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Mehdi K.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Papa de Lina, 5eme — Lille
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground leading-relaxed italic">
                  &laquo; En tant que mere celibataire qui travaille en horaires
                  decales, je ne pouvais pas verifier Pronote tous les soirs.
                  Precepteur AI m&apos;envoie tout sur WhatsApp, c&apos;est parfait. &raquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    Fatima A.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maman d&apos;Amine, 4eme — Bordeaux
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING                                                     */}
      {/* ============================================================ */}
      <section id="tarifs" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            Tarifs
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Des prix simples et transparents
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Commencez avec 7 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={`text-sm ${!billingAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingAnnual(!billingAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                billingAnnual ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${billingAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Annuel
            </span>
            {billingAnnual && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                -20%
              </Badge>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Free trial */}
            <Card className="relative">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-lg font-semibold text-foreground mb-1">Essai gratuit</h3>
                <p className="text-sm text-muted-foreground mb-6">Decouvrez sans engagement</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground">0 &euro;</div>
                  <div className="text-sm text-muted-foreground">pendant 7 jours</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <CheckItem>Bilan quotidien automatique</CheckItem>
                  <CheckItem>Alertes notes et absences</CheckItem>
                  <CheckItem>1 enfant</CheckItem>
                  <CheckItem>Telegram ou WhatsApp</CheckItem>
                </ul>
                <a href="#inscription">
                  <Button variant="outline" className="w-full gap-2">
                    Commencer l&apos;essai
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Monthly / Solo */}
            <Card className="relative border-primary/30 ring-2 ring-primary/20 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4">
                  Le plus populaire
                </Badge>
              </div>
              <CardContent className="pt-8 pb-8">
                <h3 className="text-lg font-semibold text-foreground mb-1">Standard</h3>
                <p className="text-sm text-muted-foreground mb-6">Pour 1 enfant</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary">
                    {billingAnnual ? "4,79" : "5,99"} &euro;
                  </div>
                  <div className="text-sm text-muted-foreground">
                    par mois{billingAnnual ? ", facture annuellement" : ""}
                  </div>
                  {billingAnnual && (
                    <p className="text-xs text-green-600 mt-1">
                      Soit 57,48 &euro;/an au lieu de 71,88 &euro;
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  <CheckItem>Tout de l&apos;essai gratuit</CheckItem>
                  <CheckItem>Exercices personnalises par IA</CheckItem>
                  <CheckItem>Rapports hebdomadaires</CheckItem>
                  <CheckItem>Questions illimitees au bot</CheckItem>
                  <CheckItem>Support prioritaire</CheckItem>
                </ul>
                <a href="#inscription">
                  <Button className="w-full gap-2 shadow-md">
                    Commencer gratuitement
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Family */}
            <Card className="relative">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-lg font-semibold text-foreground mb-1">Famille</h3>
                <p className="text-sm text-muted-foreground mb-6">Jusqu&apos;a 3 enfants</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground">
                    {billingAnnual ? "7,19" : "8,99"} &euro;
                  </div>
                  <div className="text-sm text-muted-foreground">
                    par mois{billingAnnual ? ", facture annuellement" : ""}
                  </div>
                  {billingAnnual && (
                    <p className="text-xs text-green-600 mt-1">
                      Soit 86,28 &euro;/an au lieu de 107,88 &euro;
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  <CheckItem>Tout du forfait Standard</CheckItem>
                  <CheckItem>Jusqu&apos;a 3 enfants</CheckItem>
                  <CheckItem>Vue famille unifiee</CheckItem>
                  <CheckItem>Alertes individualisees</CheckItem>
                  <CheckItem>Bilan famille hebdomadaire</CheckItem>
                </ul>
                <a href="#inscription">
                  <Button variant="outline" className="w-full gap-2">
                    Commencer gratuitement
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Tous les forfaits incluent 7 jours d&apos;essai gratuit. Annulation a tout moment.
            Les beta-testeurs beneficient d&apos;un tarif preferentiel a vie.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section id="faq" className="bg-secondary/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            FAQ
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Tout ce que vous devez savoir avant de vous lancer.
          </p>
          <div className="rounded-xl border bg-card">
            <div className="px-6">
              <FAQItem
                question="C'est quoi exactement Precepteur AI ?"
                answer="Precepteur AI est un assistant scolaire intelligent qui se connecte au compte Pronote de votre enfant et vous envoie chaque soir un bilan clair sur Telegram ou WhatsApp : notes du jour, devoirs a faire, absences, et des analyses de progression. Vous pouvez aussi poser des questions et demander des exercices personnalises."
              />
              <FAQItem
                question="Comment ca se connecte a Pronote ?"
                answer="Vous renseignez les identifiants Pronote de votre enfant lors de l'inscription. Precepteur AI se connecte de maniere securisee a Pronote chaque jour pour recuperer les nouvelles informations. Vos identifiants sont chiffres en AES-256 et ne sont jamais stockes en clair."
              />
              <FAQItem
                question="Mes donnees sont-elles securisees ?"
                answer="Absolument. Vos identifiants sont chiffres avec le standard AES-256. Les donnees scolaires sont hebergees en France sur des serveurs securises. Nous ne vendons aucune donnee et sommes conformes au RGPD. Vous pouvez supprimer votre compte et toutes vos donnees a tout moment."
              />
              <FAQItem
                question="Ca marche avec quel(s) etablissement(s) ?"
                answer="Precepteur AI fonctionne avec tous les colleges et lycees qui utilisent Pronote en France. C'est le cas de la grande majorite des etablissements publics et prives. Si votre etablissement utilise un autre logiciel (comme Ecole Directe), nous y travaillons pour les prochains mois."
              />
              <FAQItem
                question="Et si mon etablissement n'utilise pas Pronote ?"
                answer="Pour le moment, Precepteur AI est compatible uniquement avec Pronote, qui equipe plus de 80% des colleges et lycees en France. La compatibilite avec Ecole Directe est en cours de developpement et sera disponible prochainement. Inscrivez-vous a la liste d'attente et nous vous previendrons."
              />
              <FAQItem
                question="WhatsApp ou Telegram ?"
                answer="Les deux ! Lors de l'inscription, vous choisissez votre messagerie preferee. Vous pouvez changer a tout moment. L'experience est identique sur les deux plateformes."
              />
              <FAQItem
                question="Comment annuler mon abonnement ?"
                answer="Vous pouvez annuler a tout moment, en un clic, directement depuis le bot Telegram/WhatsApp ou par email. Aucun engagement, aucuns frais de resiliation. Vos donnees seront supprimees dans les 30 jours suivant l'annulation."
              />
              <FAQItem
                question="C'est gratuit combien de temps ?"
                answer="L'essai gratuit dure 7 jours, sans carte bancaire. Les beta-testeurs qui s'inscrivent maintenant beneficieront d'un tarif preferentiel a vie lorsque le service deviendra payant."
              />
              <FAQItem
                question="Les donnees de mon enfant mineur sont-elles protegees ?"
                answer="Oui. Nous traitons les donnees de mineurs avec une attention particuliere, conformement au RGPD et aux recommandations de la CNIL. Seules les donnees strictement necessaires au fonctionnement du service sont collectees. Aucune donnee n'est partagee avec des tiers ou utilisee a des fins publicitaires."
              />
              <FAQItem
                question="Qui est derriere Precepteur AI ?"
                answer="Precepteur AI est developpe en France par une equipe de parents et d'ingenieurs passionnes par l'education. Nous croyons que chaque parent devrait pouvoir suivre la scolarite de son enfant sans effort, quel que soit son niveau technique."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BLOG PREVIEW                                                */}
      {/* ============================================================ */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Ressources pour les parents
              </h2>
              <p className="text-muted-foreground mt-1">
                Guides pratiques pour simplifier le suivi scolaire.
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" size="sm" className="gap-1 hidden sm:inline-flex">
                Voir tous les articles
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/blog/suivi-scolaire-sans-stress" className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3 text-xs">Guide</Badge>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    Comment suivre la scolarite de son enfant sans stress
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    5 methodes concretes pour simplifier le suivi scolaire au quotidien.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/comment-suivre-notes-enfant" className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3 text-xs">Guide</Badge>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    Comment suivre les notes de mon enfant efficacement
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Organisation, outils et conseils pour ne plus rien rater.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/pronote-alternative-parents" className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3 text-xs">Comparatif</Badge>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    Pronote : les meilleures alternatives pour les parents
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Comparatif des solutions qui simplifient vraiment le suivi scolaire.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog">
              <Button variant="outline" size="sm" className="gap-1">
                Voir tous les articles
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA / SIGNUP                                                */}
      {/* ============================================================ */}
      <section
        id="inscription"
        className="bg-primary px-4 py-16 md:py-24"
      >
        <div className="mx-auto max-w-lg text-center">
          <MessageCircle className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Rejoignez la beta gratuite
          </h2>
          <p className="mb-8 text-primary-foreground/80 text-lg leading-relaxed">
            Soyez parmi les premiers parents a tester Precepteur AI.
            Inscrivez-vous et recevez votre premier bilan des ce soir.
          </p>
          {submitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="py-8">
                <Check className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-green-800">
                  Merci pour votre inscription !
                </p>
                <p className="text-green-700 mt-1">
                  Nous vous contacterons tres bientot pour configurer
                  votre compte.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form
              onSubmit={(e) =>
                handleSubmit(e, email, setSubmitted, setLoading)
              }
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white h-12 text-base"
              />
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="secondary"
                className="h-12 px-6 text-base font-semibold gap-2"
              >
                {loading ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    S&apos;inscrire
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
          <p className="mt-4 text-sm text-primary-foreground/60">
            7 jours gratuits. Aucune carte bancaire requise. Annulation en un clic.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">
                  Precepteur AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
                L&apos;assistant scolaire intelligent qui aide les parents
                a suivre la scolarite de leurs enfants sans effort.
              </p>
              {/* Footer email signup */}
              {footerSubmitted ? (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Inscription confirmee !
                </p>
              ) : (
                <form
                  onSubmit={(e) =>
                    handleSubmit(e, footerEmail, setFooterSubmitted, setFooterLoading)
                  }
                  className="flex gap-2 max-w-sm"
                >
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    required
                    className="flex-1 h-9 text-sm"
                  />
                  <Button type="submit" size="sm" disabled={footerLoading}>
                    {footerLoading ? "..." : "S'inscrire"}
                  </Button>
                </form>
              )}
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#fonctionnalites" className="hover:text-primary transition-colors">
                    Fonctionnalites
                  </a>
                </li>
                <li>
                  <a href="#comment-ca-marche" className="hover:text-primary transition-colors">
                    Comment ca marche
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-primary transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/connect-pronote" className="hover:text-primary transition-colors">
                    Connecter Pronote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/legal" className="hover:text-primary transition-colors">
                    Mentions legales
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Politique de confidentialite
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Conditions generales
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@precepteur.ai"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Precepteur AI. Tous droits
              reserves.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Flag className="h-3 w-3" />
                <span>Concu et heberge en France</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                <span>Conforme RGPD</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
