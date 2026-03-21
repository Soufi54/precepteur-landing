import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllArticles, formatDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog - Precepteur AI | Conseils pour le suivi scolaire",
  description:
    "Articles et guides pour les parents : suivi scolaire, Pronote, accompagnement des enfants, intelligence artificielle et education.",
  keywords: [
    "blog suivi scolaire",
    "conseils parents college",
    "Pronote astuces",
    "suivi notes enfant",
    "education IA",
  ],
  openGraph: {
    title: "Blog - Precepteur AI | Conseils pour le suivi scolaire",
    description:
      "Articles et guides pour les parents : suivi scolaire, Pronote, accompagnement des enfants.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Page header */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4 text-sm">
            Ressources pour les parents
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Le blog Precepteur AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guides pratiques, conseils et astuces pour simplifier le suivi
            scolaire de vos enfants.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md hover:ring-primary/30">
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    <span>&middot;</span>
                    <span>{article.readingTime} de lecture</span>
                  </div>
                  <h2 className="mb-3 text-xl font-semibold text-foreground leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-medium text-primary">
                    Lire l&apos;article &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
