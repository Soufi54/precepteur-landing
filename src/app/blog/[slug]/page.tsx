import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllArticles,
  getArticleBySlug,
  formatDate,
} from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Precepteur AI`,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      locale: "fr_FR",
      publishedTime: article.date,
      siteName: "Precepteur AI",
      url: `https://precepteur-ai.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
    alternates: {
      canonical: `https://precepteur-ai.com/blog/${slug}`,
    },
  };
}

function renderMarkdown(content: string) {
  // Split into blocks by double newline
  const blocks = content.split(/\n\n+/);
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let orderedListBuffer: string[] = [];
  let tableBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="my-4 ml-6 list-disc space-y-2 text-muted-foreground"
        >
          {listBuffer.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  }

  function flushOrderedList() {
    if (orderedListBuffer.length > 0) {
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground"
        >
          {orderedListBuffer.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ol>
      );
      orderedListBuffer = [];
    }
  }

  function flushTable() {
    if (tableBuffer.length < 2) {
      tableBuffer = [];
      return;
    }
    const rows = tableBuffer
      .filter((row) => !row.match(/^\|[\s-|]+\|$/))
      .map((row) =>
        row
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim())
      );
    const header = rows[0];
    const body = rows.slice(1);
    elements.push(
      <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              {header.map((cell, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left font-semibold text-foreground"
                  dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
  }

  function formatInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  for (const block of blocks) {
    const lines = block.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();

      // Table row
      if (trimmed.startsWith("|")) {
        flushList();
        flushOrderedList();
        tableBuffer.push(trimmed);
        continue;
      } else {
        flushTable();
      }

      // Heading
      if (trimmed.startsWith("### ")) {
        flushList();
        flushOrderedList();
        elements.push(
          <h3
            key={`h3-${elements.length}`}
            className="mt-8 mb-3 text-xl font-semibold text-foreground"
          >
            {trimmed.slice(4)}
          </h3>
        );
        continue;
      }
      if (trimmed.startsWith("## ")) {
        flushList();
        flushOrderedList();
        elements.push(
          <h2
            key={`h2-${elements.length}`}
            className="mt-10 mb-4 text-2xl font-bold text-foreground"
          >
            {trimmed.slice(3)}
          </h2>
        );
        continue;
      }

      // Unordered list
      if (trimmed.startsWith("- ")) {
        flushOrderedList();
        listBuffer.push(trimmed.slice(2));
        continue;
      }

      // Ordered list
      const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (olMatch) {
        flushList();
        orderedListBuffer.push(olMatch[1]);
        continue;
      }

      // Empty line — flush
      if (trimmed === "") {
        flushList();
        flushOrderedList();
        continue;
      }

      // Regular paragraph
      flushList();
      flushOrderedList();
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="my-4 leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    }
  }

  flushList();
  flushOrderedList();
  flushTable();

  return elements;
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level: match[1].length });
    }
  }
  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  // JSON-LD for article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Precepteur AI",
    },
    publisher: {
      "@type": "Organization",
      name: "Precepteur AI",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://precepteur-ai.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            &larr; Retour au blog
          </Link>

          <div className="flex gap-10">
            {/* Main content */}
            <article className="flex-1 max-w-prose">
              {/* Article header */}
              <header className="mb-10">
                <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <span>&middot;</span>
                  <span>{article.readingTime} de lecture</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl leading-tight">
                  {article.title}
                </h1>
              </header>

              {/* Article body */}
              <div>{renderMarkdown(article.content)}</div>

              {/* CTA */}
              <Card className="mt-12 border-primary/20 bg-secondary/50">
                <CardContent className="py-8 text-center">
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    Essayez Precepteur AI gratuitement
                  </h3>
                  <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                    Recevez chaque soir un bilan clair de la journee scolaire de
                    votre enfant. 7 jours gratuits, sans carte bancaire.
                  </p>
                  <Link href="/#inscription">
                    <Button size="lg" className="text-lg px-8 py-6">
                      Essayer gratuitement
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Articles associes
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.map((related) => (
                      <Link key={related.slug} href={`/blog/${related.slug}`}>
                        <Card className="h-full transition-shadow hover:shadow-md">
                          <CardContent className="pt-5">
                            <p className="text-xs text-muted-foreground mb-2">
                              {formatDate(related.date)}
                            </p>
                            <h4 className="text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors">
                              {related.title}
                            </h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Table of contents sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <h4 className="mb-4 text-sm font-semibold text-foreground">
                    Sommaire
                  </h4>
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                          heading.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
