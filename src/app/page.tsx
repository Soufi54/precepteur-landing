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
  BookOpen,
  GraduationCap,
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
                personnalisé dès ce soir. 100% gratuit pendant la beta.
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
              Aucune carte bancaire requise. Désinscription en un clic.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero animated phones                                              */
/* ------------------------------------------------------------------ */

function HeroPhones() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // step 0 = nothing shown, then we advance through steps
    const timings = [800, 2300, 4300, 5000, 6500, 6900, 7700, 13000];
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setStep(0);
      timings.forEach((ms, idx) => {
        timers.push(setTimeout(() => setStep(idx + 1), ms));
      });
      // restart after fade out
      timers.push(setTimeout(() => runCycle(), 14200));
    }

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (minStep: number) => step >= minStep && step < 8;

  return (
    <div
      className="flex items-start gap-4 justify-center py-2"
      style={{ opacity: step === 8 ? 0 : 1, transition: step === 8 ? "opacity 1.2s ease" : "none" }}
    >
      {/* Left phone: eleve (dark) */}
      <div className="w-[200px] shrink-0 rounded-[32px] bg-[#0f172a] p-2 shadow-2xl"
           style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.08)" }}>
        <div className="rounded-[26px] bg-[#1e293b] px-3.5 py-6 min-h-[400px] flex flex-col">
          {/* Header */}
          <div className="text-center mb-3.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] to-[#0EA5E9] flex items-center justify-center text-white font-bold text-sm mx-auto mb-1">P</div>
            <div className="text-white font-semibold text-xs">Precepteur</div>
            <div className="text-[#22c55e] text-[0.64rem]">En ligne</div>
          </div>
          {/* Messages */}
          <div className="flex flex-col gap-2 flex-1">
            {show(1) && (
              <div className="max-w-[88%] px-3 py-2 rounded-[13px] rounded-bl-sm bg-[#334155] text-[#e2e8f0] text-[0.82rem] leading-snug self-start"
                   style={{ animation: "phoneBubbleIn 0.4s ease forwards" }}>
                Salut ! Ce soir, on attaque les fractions. Simplifie 12/18.
              </div>
            )}
            {show(2) && (
              <div className="max-w-[88%] px-3 py-2 rounded-[13px] rounded-br-sm bg-[#F97316] text-white text-[0.82rem] leading-snug self-end"
                   style={{ animation: "phoneBubbleIn 0.4s ease forwards" }}>
                2/3 ?
              </div>
            )}
            {show(3) && (
              <div className="max-w-[88%] px-3 py-2 rounded-[13px] rounded-bl-sm bg-[#334155] text-[#e2e8f0] text-[0.82rem] leading-snug self-start"
                   style={{ animation: "phoneBubbleIn 0.4s ease forwards" }}>
                Exact ! Tu as divise par 6, bien vu.
              </div>
            )}
            {show(4) && (
              <div className="pl-0.5">
                <span className="inline-block bg-[#22c55e] text-white text-[0.63rem] font-bold px-2 py-0.5 rounded-full"
                      style={{ animation: "phoneBadgeIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
                  REUSSI
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right phone: parent (light) */}
      <div className="w-[200px] shrink-0 rounded-[32px] bg-[#e2e8f0] p-2 shadow-2xl"
           style={{
             boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
             opacity: show(5) ? 1 : 0,
             transform: show(5) ? "translateX(0)" : "translateX(16px)",
             transition: "opacity 0.5s ease, transform 0.5s ease",
           }}>
        <div className="rounded-[26px] bg-white px-3.5 py-6 min-h-[400px] flex flex-col">
          {/* Header */}
          <div className="text-center mb-3.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm mx-auto mb-1">P</div>
            <div className="text-[#1C1917] font-semibold text-xs">Precepteur</div>
            <div className="text-[#64748b] text-[0.64rem]">Notification</div>
          </div>
          {/* Messages */}
          <div className="flex flex-col gap-2 flex-1">
            {show(6) && (
              <div className="max-w-[88%] px-3 py-2 rounded-[13px] rounded-bl-sm bg-[#f1f5f9] text-[#1C1917] text-[0.82rem] leading-snug self-start"
                   style={{ animation: "phoneBubbleIn 0.4s ease forwards" }}>
                Emma a fini ses 3 exercices en 11 min. Fractions bien comprises. Demain : additions de fractions.
              </div>
            )}
          </div>
        </div>
        {show(7) && (
          <div className="text-center text-[0.66rem] text-[#ea580c] font-semibold mt-1.5"
               style={{ animation: "phoneBubbleIn 0.4s ease forwards" }}>
            Fractions : 72% &rarr; 85%
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ecosysteme section                                                */
/* ------------------------------------------------------------------ */

function EcosystemeSection() {
  return (
    <section id="ecosysteme" className="relative py-24" style={{ background: "#0b1120", color: "#f1f5f9" }}>
      {/* top/bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 z-10" style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10" style={{ background: "linear-gradient(to top, #ffffff 0%, transparent 100%)" }} />

      <div className="relative z-20 mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4"
                style={{ background: "rgba(249,115,22,0.15)", color: "#FB923C" }}>
            Comment ça fonctionne
          </span>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "#f1f5f9" }}>
            3 acteurs, 1 Précepteur, tout le monde est synchro
          </h2>
        </div>

        {/* Trio grid */}
        <div className="grid gap-6 md:gap-10" style={{ gridTemplateColumns: "1fr auto 1fr" }}>

          {/* Parent */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full border-[2.5px] flex items-center justify-center text-xl font-extrabold"
                 style={{ borderColor: "#F97316", color: "#F97316", background: "rgba(255,255,255,0.04)" }}>
              P
            </div>
            <div className="text-sm font-bold" style={{ color: "#F97316" }}>Le parent</div>
            <EcosCard>
              <EcosTag>Reçoit chaque soir</EcosTag>
              Bilan factuel : notes, devoirs, absences, action concrete pour le soir
            </EcosCard>
            <EcosCard>
              <EcosTag>Peut faire</EcosTag>
              Poser des questions, demander un bilan complet, suivre la progression
            </EcosCard>
          </div>

          {/* Center hub */}
          <div className="flex items-center justify-center">
            <div className="rounded-2xl px-6 py-5 text-center"
                 style={{ background: "rgba(249,115,22,0.08)", border: "2px solid rgba(249,115,22,0.3)" }}>
              <div className="text-lg font-extrabold" style={{ color: "#f5f5f4" }}>
                precepteur<span style={{ color: "#F97316" }}>.</span>
              </div>
              <div className="text-[0.7rem] mt-1" style={{ color: "#a8a29e" }}>Connecte a Pronote</div>
              <div className="text-[0.7rem]" style={{ color: "#a8a29e" }}>Memoire long terme</div>
              <div className="text-[0.7rem]" style={{ color: "#a8a29e" }}>IA adaptative</div>
            </div>
          </div>

          {/* Eleve */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full border-[2.5px] flex items-center justify-center text-xl font-extrabold"
                 style={{ borderColor: "#0EA5E9", color: "#0EA5E9", background: "rgba(255,255,255,0.04)" }}>
              E
            </div>
            <div className="text-sm font-bold" style={{ color: "#0EA5E9" }}>L&apos;élève</div>
            <EcosCard>
              <EcosTag>Reçoit chaque soir</EcosTag>
              3 exercices adaptes, corriges en direct, parcours qui s&apos;ajuste
            </EcosCard>
            <EcosCard>
              <EcosTag>Peut faire</EcosTag>
              Poser des questions sur ses cours, demander des explications, reviser
            </EcosCard>
          </div>

        </div>

        {/* Bottom: accompagnant (full width) */}
        <div className="mt-10 max-w-sm mx-auto flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full border-[2.5px] flex items-center justify-center text-xl font-extrabold"
               style={{ borderColor: "#22C55E", color: "#22C55E", background: "rgba(255,255,255,0.04)" }}>
            A
          </div>
          <div className="text-sm font-bold" style={{ color: "#22C55E" }}>L&apos;accompagnant</div>
          <EcosCard>
            <EcosTag>Supervise entre les séances</EcosTag>
            Entre deux cours particuliers, il sait exactement où en est l&apos;élève : exercices faits, taux de réussite, lacunes détectées
          </EcosCard>
          <EcosCard>
            <EcosTag>Pilote le programme</EcosTag>
            Voit les exercices prévus avant l&apos;élève, les modifie si besoin, ajuste les objectifs. Ses séances deviennent plus efficaces.
          </EcosCard>
        </div>
      </div>
    </section>
  );
}

function EcosCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-[10px] px-4 py-3.5 text-[0.82rem] leading-snug text-[#d6d3d1] transition-all hover:bg-white/[0.08]"
         style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {children}
    </div>
  );
}

function EcosTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.68rem] font-bold uppercase tracking-widest mb-1.5 text-[#a8a29e]">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skill tree section                                                */
/* ------------------------------------------------------------------ */

function SkillTreeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    function drawConnectors() {
      const svg = svgRef.current;
      const container = containerRef.current;
      if (!svg || !container) return;

      svg.innerHTML = "";

      const connections: Array<{ from: string; to: string }> = [
        { from: "node-entiers",    to: "node-litteral" },
        { from: "node-tables",     to: "node-litteral" },
        { from: "node-tables",     to: "node-fractions" },
        { from: "node-priorites",  to: "node-fractions" },
        { from: "node-litteral",   to: "node-eq1" },
        { from: "node-fractions",  to: "node-puissances" },
        { from: "node-priorites",  to: "node-puissances" },
        { from: "node-eq1",        to: "node-eq2" },
        { from: "node-puissances", to: "node-eq2" },
        { from: "node-eq1",        to: "node-fonctions" },
        { from: "node-eq2",        to: "node-medecine" },
        { from: "node-fonctions",  to: "node-medecine" },
      ];

      const containerRect = container.getBoundingClientRect();

      connections.forEach(({ from, to }) => {
        const fromEl = document.getElementById(from);
        const toEl = document.getElementById(to);
        if (!fromEl || !toEl) return;

        const fr = fromEl.getBoundingClientRect();
        const tr = toEl.getBoundingClientRect();

        const x1 = fr.left + fr.width / 2 - containerRect.left;
        const y1 = fr.top - containerRect.top;
        const x2 = tr.left + tr.width / 2 - containerRect.left;
        const y2 = tr.top + tr.height - containerRect.top;

        const isFromMastered = fromEl.dataset.state === "mastered";
        const isToLocked = toEl.dataset.state === "locked";

        const color = isToLocked ? "#cbd5e1" : isFromMastered ? "#22C55E" : "#f59e0b";
        const opacity = isToLocked ? "0.4" : "0.6";

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "1.5");
        line.setAttribute("stroke-dasharray", "5 3");
        line.setAttribute("opacity", opacity);
        svg.appendChild(line);
      });
    }

    const timer = setTimeout(drawConnectors, 300);
    window.addEventListener("resize", drawConnectors);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", drawConnectors);
    };
  }, []);

  return (
    <section id="parcours" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 text-primary bg-primary/8">
            Chaque objectif a un chemin
          </span>
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            Emma veut faire médecine. Précepteur construit le chemin.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Du rêve à la réalité : Précepteur décompose chaque objectif en prérequis, identifie où l&apos;élève bloque, et construit le programme pour débloquer chaque étape.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] items-start">

          {/* Tree canvas */}
          <div className="relative" ref={containerRef}>
            {/* Legend */}
            <div className="flex gap-5 flex-wrap mb-8 justify-center">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] inline-block" />
                Maîtrise
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block" />
                En cours
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1] inline-block" />
                Verrouillé
              </div>
            </div>

            {/* Levels */}
            <div className="relative flex flex-col gap-10 py-5">

              {/* Level 5 — dream */}
              <div className="flex justify-center gap-4">
                <TreeNode id="node-medecine" state="locked" style={{ minWidth: 180, borderStyle: "dashed" }}>
                  <div className="text-base font-bold text-[#94a3b8]">Médecine</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#94a3b8] mt-1">
                    <Star className="w-3 h-3" />
                    Son rêve — objectif long terme
                  </div>
                </TreeNode>
              </div>

              {/* Level 4 — locked */}
              <div className="flex justify-center gap-4">
                <TreeNode id="node-eq2" state="locked">
                  <div className="text-sm font-bold text-[#94a3b8]">Equations 2nd degre</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#94a3b8] mt-1">
                    <Lock className="w-3 h-3" />
                    Prérequis non validés
                  </div>
                </TreeNode>
                <TreeNode id="node-fonctions" state="locked">
                  <div className="text-sm font-bold text-[#94a3b8]">Fonctions</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#94a3b8] mt-1">
                    <Lock className="w-3 h-3" />
                    Prérequis non validés
                  </div>
                </TreeNode>
              </div>

              {/* Level 3 — in progress */}
              <div className="flex justify-center gap-4">
                <TreeNode id="node-eq1" state="in-progress">
                  <div className="text-sm font-bold text-foreground">Equations 1er degre</div>
                  <ProgressRing pct={72} />
                  <div className="text-xs font-semibold text-[#f59e0b]">72% maîtrise</div>
                </TreeNode>
                <TreeNode id="node-puissances" state="in-progress">
                  <div className="text-sm font-bold text-foreground">Puissances</div>
                  <ProgressRing pct={45} />
                  <div className="text-xs font-semibold text-[#f59e0b]">45% maîtrise</div>
                </TreeNode>
              </div>

              {/* Level 2 — mastered */}
              <div className="flex justify-center gap-4">
                <TreeNode id="node-litteral" state="mastered">
                  <div className="text-sm font-bold text-foreground">Calcul littéral</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#22C55E] mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Valide
                  </div>
                </TreeNode>
                <TreeNode id="node-fractions" state="mastered">
                  <div className="text-sm font-bold text-foreground">Fractions</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#22C55E] mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Valide
                  </div>
                </TreeNode>
              </div>

              {/* Level 1 — mastered */}
              <div className="flex justify-center gap-4 flex-wrap">
                <TreeNode id="node-entiers" state="mastered">
                  <div className="text-sm font-bold text-foreground">Entiers naturels</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#22C55E] mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Valide
                  </div>
                </TreeNode>
                <TreeNode id="node-tables" state="mastered">
                  <div className="text-sm font-bold text-foreground">Tables de multiplication</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#22C55E] mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Valide
                  </div>
                </TreeNode>
                <TreeNode id="node-priorites" state="mastered">
                  <div className="text-sm font-bold text-foreground">Priorités des opérations</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#22C55E] mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Valide
                  </div>
                </TreeNode>
              </div>

              {/* SVG overlay for connectors */}
              <svg
                ref={svgRef}
                aria-hidden="true"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
              />
            </div>
          </div>

          {/* Annotations */}
          <div className="hidden lg:flex flex-col gap-6">
            <TreeAnnotation color="orange">
              <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-1.5">L&apos;objectif</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Emma veut faire médecine. Précepteur part de cet objectif et remonte jusqu&apos;aux fondations. Chaque compétence validée rapproche du rêve.
              </p>
            </TreeAnnotation>
            <TreeAnnotation color="amber">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d97706] mb-1.5">Niveau &quot;En cours&quot; détecté</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Précepteur détecte que Emma bloque sur les puissances (45%). Il génère des exercices ciblés chaque jour jusqu&apos;à ce que le seuil de 80% soit atteint.
              </p>
            </TreeAnnotation>
            <TreeAnnotation color="slate">
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1.5">Niveau verrouillé</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les équations du 2nd degré sont verrouillées tant que les prérequis ne sont pas validés. Précepteur ne surchargera pas Emma.
              </p>
            </TreeAnnotation>
            <TreeAnnotation color="green">
              <div className="text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-1.5">Bases solides</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les bases sont validées. Emma les a maîtrisées en 2 semaines avec le bot. Ces acquis servent de fondation pour la suite.
              </p>
            </TreeAnnotation>
          </div>

        </div>
      </div>
    </section>
  );
}

type TreeNodeState = "mastered" | "in-progress" | "locked";

function TreeNode({
  id,
  state,
  children,
  style,
}: {
  id: string;
  state: TreeNodeState;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const borderColor = state === "mastered" ? "#22C55E" : state === "in-progress" ? "#f59e0b" : "#cbd5e1";
  const bg = state === "mastered" ? "rgba(34,197,94,0.06)" : state === "in-progress" ? "rgba(245,158,11,0.06)" : "rgba(203,213,225,0.3)";

  return (
    <div
      id={id}
      data-state={state}
      className="rounded-xl px-4 py-3.5 text-center border-2 min-w-[140px] max-w-[160px] bg-white hover:-translate-y-0.5 transition-transform"
      style={{ borderColor, background: bg, ...style }}
    >
      {children}
    </div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 13;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 my-1 mx-auto">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="3" />
        <circle cx="16" cy="16" r={r} fill="none" stroke="#f59e0b" strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>
    </div>
  );
}

function TreeAnnotation({ color, children }: { color: "orange" | "amber" | "slate" | "green"; children: React.ReactNode }) {
  const borderColor = color === "orange" ? "#F97316" : color === "amber" ? "#f59e0b" : color === "slate" ? "#94a3b8" : "#22C55E";
  return (
    <div className="rounded-xl px-4 py-4 bg-secondary/60"
         style={{ borderLeft: `3px solid ${borderColor}` }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fondateur section                                                 */
/* ------------------------------------------------------------------ */

function FounderSection() {
  return (
    <section id="fondateur" className="px-4 py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-[200px_1fr] items-start">

          {/* Avatar */}
          <div className="flex justify-center md:pt-10">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-2xl font-extrabold text-white"
                 style={{ background: "linear-gradient(135deg, #F97316, #0EA5E9)", boxShadow: "0 8px 32px rgba(249,115,22,0.25)" }}>
              CM
            </div>
          </div>

          {/* Story */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 text-primary bg-primary/8">
              Le fondateur
            </span>
            <h2 className="text-2xl font-bold md:text-3xl mb-5">Chaker</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Scolarité en ZEP dans le 92, classes prépa, diplômé de l&apos;École des Mines de Nancy.
              Après mes études, j&apos;ai été accompagnateur scolaire à la mairie pendant 3 ans — des dizaines d&apos;élèves suivis chaque semaine, du CM2 à la terminale.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ce que j&apos;ai vu : des élèves capables, mais qui décrochent entre les séances. Le tuteur vient une fois par semaine.
              Entre-temps, les lacunes s&apos;accumulent sans que personne ne s&apos;en rende compte. Quand on les détecte, il est souvent trop tard.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              J&apos;ai construit Précepteur pour ça. Un suivi quotidien par IA qui travaille avec l&apos;élève chaque soir, détecte les blocages en temps réel, et informe le parent et le tuteur.
              L&apos;objectif : que chaque seance avec le tuteur soit deux fois plus efficace.
            </p>

            {/* LinkedIn */}
            <div className="mb-6">
              <a href="https://www.linkedin.com/in/chakerm/" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:text-primary transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* CTA block */}
            <div className="rounded-2xl border border-border bg-secondary/50 p-6">
              <h3 className="text-lg font-bold mb-2">Discutons du meilleur pour votre enfant</h3>
              <a href="tel:+33664624258">
                <Button className="mt-2 gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  06 64 62 42 58
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubmitted, setFooterSubmitted] = useState(false);
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
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Comment ça marche", href: "#comment-ca-marche" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Témoignages", href: "#temoignages" },
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
                Chaque soir à 19h, les notes et devoirs de votre enfant arrivent{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                  sur votre téléphone
                </span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Précepteur se connecte à Pronote et vous envoie un bilan clair
                chaque soir. Fini les soirées à déchiffrer l&apos;interface Pronote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/inscription">
                  <Button size="lg" className="text-base px-8 py-6 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Essayer gratuitement 7 jours
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#comment-ca-marche">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6"
                  >
                    Découvrir comment ça marche
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2 justify-center lg:justify-start">
                <Shield className="h-4 w-4" />
                Aucune carte bancaire requise. Données chiffrées AES-256.
              </p>
            </div>

            {/* Right: Animated two-phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <HeroPhones />
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
            Beta ouverte — places limitées
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <LinkIcon className="h-4 w-4 text-primary" />
              <span>Compatible Pronote</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" />
              <span>Données sécurisées</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flag className="h-4 w-4 text-primary" />
              <span>Made in France</span>
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
            Le suivi scolaire ne devrait pas être un casse-tête
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Pronote contient toutes les informations, mais l&apos;interface est
            pensée pour les établissements, pas pour les parents.
            Précepteur AI change la donne.
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
                  <CheckItem>Exercices personnalisés générés par IA</CheckItem>
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
            Fonctionnalités
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Tout ce dont vous avez besoin, rien de superflu
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Précepteur AI transforme les données brutes de Pronote en informations
            claires et actionnables pour les parents.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FeatureCard
              icon={Mail}
              title="Bilans quotidiens IA"
              description="Chaque soir à 19h, un message clair résume la journée scolaire de votre enfant. Notes, devoirs, absences — zéro effort de votre part."
              color="primary"
            />
            <FeatureCard
              icon={Bell}
              title="Alertes notes instantanées"
              description="Notification immédiate quand une note significativement basse tombe. Ne découvrez plus un 4/20 deux semaines après."
              color="red"
            />
            <FeatureCard
              icon={BookOpen}
              title="Rappels devoirs avec aide IA"
              description="Liste des devoirs à rendre avec dates limites. L'IA peut expliquer les consignes et aider à démarrer les exercices."
              color="orange"
            />
            <FeatureCard
              icon={Eye}
              title="Suivi absences et retards"
              description="Alerte immédiate en cas d'absence non justifiée ou de retard répété. Gardez le contrôle même à distance."
              color="yellow"
            />
            <FeatureCard
              icon={Brain}
              title="Exercices personnalisés IA"
              description="Des exercices générés selon le niveau réel de votre enfant pour progresser là où il en a le plus besoin."
              color="purple"
            />
            <FeatureCard
              icon={BarChart3}
              title="Rapports hebdomadaires"
              description="Chaque dimanche, une synthèse complète de la semaine avec tendances, évolution des moyennes et recommandations."
              color="blue"
            />
            <FeatureCard
              icon={Users}
              title="Multi-enfants"
              description="Suivez tous vos enfants au même endroit. Un bilan par enfant, des alertes individualisées, une vue d'ensemble familiale."
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
            Prêt en 2 minutes, sans rien installer
          </h2>
          <p className="mb-16 text-center text-muted-foreground max-w-2xl mx-auto">
            Trois étapes simples pour ne plus jamais rater une information
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
                  Renseignez vos identifiants Pronote. Ils sont chiffrés
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
                  Chaque soir à 19h, un message Telegram ou WhatsApp vous résume
                  les notes, devoirs et événements de la journée.
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
                  adaptés, et suivez la progression semaine après semaine.
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
      {/*  ECOSYSTEME / BRAIN                                          */}
      {/* ============================================================ */}
      <EcosystemeSection />

      {/* ============================================================ */}
      {/*  SKILL TREE                                                  */}
      {/* ============================================================ */}
      <SkillTreeSection />

      {/* ============================================================ */}
      {/*  DEMO SECTION                                                */}
      {/* ============================================================ */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Votre assistant scolaire, toujours disponible
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Posez vos questions à tout moment. Précepteur AI vous
            répond instantanément avec des données précises.
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
                Elle a progressé en maths ce trimestre ?
              </ChatBubbleUser>
              <ChatBubbleBot>
                <p>
                  Oui ! Yasmine est passée de 11.8 de moyenne au T1
                  a 13.4 au T2. C&apos;est une belle progression de{" "}
                  <strong>+1.6 points</strong>.
                </p>
                <p className="mt-2 text-primary">
                  <TrendingUp className="inline h-3.5 w-3.5 mr-1" />
                  Elle se rapproche du top 10 de la classe.
                </p>
              </ChatBubbleBot>
              <ChatBubbleUser>
                Tu peux lui générer un exercice sur les fractions ?
              </ChatBubbleUser>
              <ChatBubbleBot>
                <p className="mb-2">
                  <Brain className="inline h-3.5 w-3.5 mr-1 text-primary" />
                  Voici un exercice adapté au niveau de Yasmine :
                </p>
                <div className="bg-primary/5 rounded-lg p-2 text-xs">
                  <p className="font-medium mb-1">
                    Exercice : Fractions (niveau 4eme)
                  </p>
                  <p>1) Simplifier 24/36</p>
                  <p>2) Calculer 3/4 + 2/5</p>
                  <p>3) Résoudre : x/3 = 8/12</p>
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
            Témoignages
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Ce que disent les parents
          </h2>
          <div className="mx-auto max-w-lg text-center py-8">
            <p className="text-lg text-muted-foreground italic mb-4">
              &ldquo;Nous sommes en beta avec les premières familles. Les retours arrivent et seront publiés ici.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground">
              Vous voulez être parmi les premiers ? Inscrivez-vous et donnez-nous votre avis.
            </p>
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
                <p className="text-sm text-muted-foreground mb-6">Découvrez sans engagement</p>
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
                    par mois{billingAnnual ? ", facturé annuellement" : ""}
                  </div>
                  {billingAnnual && (
                    <p className="text-xs text-green-600 mt-1">
                      Soit 57,48 &euro;/an au lieu de 71,88 &euro;
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  <CheckItem>Tout de l&apos;essai gratuit</CheckItem>
                  <CheckItem>Exercices personnalisés par IA</CheckItem>
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
                    par mois{billingAnnual ? ", facturé annuellement" : ""}
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
            Tous les forfaits incluent 7 jours d&apos;essai gratuit. Annulation à tout moment.
            Les beta-testeurs bénéficient d&apos;un tarif préférentiel à vie.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FONDATEUR                                                   */}
      {/* ============================================================ */}
      <FounderSection />

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section id="faq" className="bg-secondary/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Badge variant="secondary" className="mx-auto mb-4 block w-fit text-sm border border-primary/20 bg-primary/5 text-primary">
            FAQ
          </Badge>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Tout ce que vous devez savoir avant de vous lancer.
          </p>
          <div className="rounded-xl border bg-card">
            <div className="px-6">
              <FAQItem
                question="C'est quoi exactement Précepteur AI ?"
                answer="Précepteur AI est un assistant scolaire intelligent qui se connecte au compte Pronote de votre enfant et vous envoie chaque soir un bilan clair sur Telegram ou WhatsApp : notes du jour, devoirs à faire, absences, et des analyses de progression. Vous pouvez aussi poser des questions et demander des exercices personnalisés."
              />
              <FAQItem
                question="Comment ça se connecte à Pronote ?"
                answer="Vous renseignez les identifiants Pronote de votre enfant lors de l'inscription. Précepteur AI se connecte de manière sécurisée à Pronote chaque jour pour récupérer les nouvelles informations. Vos identifiants sont chiffrés en AES-256 et ne sont jamais stockés en clair."
              />
              <FAQItem
                question="Mes donnees sont-elles securisees ?"
                answer="Absolument. Vos identifiants sont chiffrés avec le standard AES-256. Les données scolaires sont hébergées en France sur des serveurs sécurisés. Nous ne vendons aucune donnée et sommes conformes au RGPD. Vous pouvez supprimer votre compte et toutes vos données à tout moment."
              />
              <FAQItem
                question="Ça marche avec quel(s) établissement(s) ?"
                answer="Précepteur AI fonctionne avec tous les collèges et lycées qui utilisent Pronote en France. C'est le cas de la grande majorité des établissements publics et privés. Si votre établissement utilise un autre logiciel (comme École Directe), nous y travaillons pour les prochains mois."
              />
              <FAQItem
                question="Et si mon etablissement n'utilise pas Pronote ?"
                answer="Pour le moment, Précepteur AI est compatible uniquement avec Pronote, qui équipe plus de 80% des collèges et lycées en France. La compatibilité avec École Directe est en cours de développement et sera disponible prochainement. Inscrivez-vous à la liste d'attente et nous vous préviendrons."
              />
              <FAQItem
                question="WhatsApp ou Telegram ?"
                answer="Les deux ! Lors de l'inscription, vous choisissez votre messagerie préférée. Vous pouvez changer à tout moment. L'expérience est identique sur les deux plateformes."
              />
              <FAQItem
                question="Comment annuler mon abonnement ?"
                answer="Vous pouvez annuler à tout moment, en un clic, directement depuis le bot Telegram/WhatsApp ou par email. Aucun engagement, aucuns frais de résiliation. Vos données seront supprimées dans les 30 jours suivant l'annulation."
              />
              <FAQItem
                question="C'est gratuit combien de temps ?"
                answer="L'essai gratuit dure 7 jours, sans carte bancaire. Les beta-testeurs qui s'inscrivent maintenant bénéficieront d'un tarif préférentiel à vie lorsque le service deviendra payant."
              />
              <FAQItem
                question="Les données de mon enfant mineur sont-elles protégées ?"
                answer="Oui. Nous traitons les données de mineurs avec une attention particulière, conformément au RGPD et aux recommandations de la CNIL. Seules les données strictement nécessaires au fonctionnement du service sont collectées. Aucune donnée n'est partagée avec des tiers ou utilisée à des fins publicitaires."
              />
              <FAQItem
                question="Qui est derrière Précepteur AI ?"
                answer="Précepteur AI est développé en France par une équipe de parents et d'ingénieurs passionnés par l'éducation. Nous croyons que chaque parent devrait pouvoir suivre la scolarité de son enfant sans effort, quel que soit son niveau technique."
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
            Inscription en 2 minutes. Connectez Pronote et recevez votre premier bilan dès ce soir.
          </p>
          <Link href="/inscription">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-semibold gap-2">
              S&apos;inscrire gratuitement
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/60">
            7 jours gratuits. Aucune carte bancaire requise.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/inscription-tuteur">
              <Button variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full sm:w-auto">
                Je suis accompagnant / tuteur
              </Button>
            </Link>
            <Link href="/inscription-eleve">
              <Button variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full sm:w-auto">
                Je suis élève
              </Button>
            </Link>
          </div>
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
                à suivre la scolarité de leurs enfants sans effort.
              </p>
              {/* Footer email signup */}
              {footerSubmitted ? (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Inscription confirmée !
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
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#comment-ca-marche" className="hover:text-primary transition-colors">
                    Comment ça marche
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
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Politique de confidentialite
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Conditions générales
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
              réservés.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Flag className="h-3 w-3" />
                <span>Conçu et hébergé en France</span>
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
