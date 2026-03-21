import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Precepteur AI</span>
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </div>
          <Link href="/#inscription">
            <Button size="sm">Essai gratuit</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-8">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">Precepteur AI</p>
          <p>L&apos;assistant scolaire intelligent pour les parents.</p>
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span>&middot;</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Confidentialite
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              CGU
            </Link>
            <span>&middot;</span>
            <Link href="/legal" className="hover:text-foreground transition-colors">
              Mentions legales
            </Link>
          </div>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} Precepteur AI. Tous droits
            reserves.
          </p>
        </div>
      </footer>
    </div>
  );
}
