import { thesisPage } from "@/data/thesis/page";

export default function ThesisFooter() {
  const { footer } = thesisPage;

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="flex flex-wrap items-center gap-6">
        <a
          href={footer.portfolioHref}
          className="text-sm text-text-muted transition-colors hover:text-accent"
        >
          {footer.portfolioLabel}
        </a>
        <a
          href={footer.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-5 py-2.5 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          {footer.githubLabel}
        </a>
      </div>
    </footer>
  );
}
