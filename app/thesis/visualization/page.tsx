import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Visualization | Thesis system",
  description: "Interactive exploration layer for the policy decision support system.",
};

export default function VisualizationPage() {
  return (
    <SiteShell>
      <main className="py-24 md:py-32">
        <Link
          href="/thesis"
          className="text-sm text-text-muted transition-colors hover:text-accent"
        >
          ← Thesis system
        </Link>

        <section className="mt-8">
          <span className="inline-block rounded px-2.5 py-1 text-xs font-medium bg-accent/20 text-accent">
            Active module
          </span>

          <h1 className="mt-4 mb-3 text-4xl font-semibold text-text-primary md:text-5xl">
            Interactive exploration layer
          </h1>

          <p className="text-lg text-text-muted">
            The visualization tool for exploring news-driven insights. More features coming soon.
          </p>
        </section>

        <section className="mt-10">
          <div className="rounded-xl border-2 border-dashed border-border bg-surface px-5 py-16 text-center text-text-muted">
            Visualization tool will be embedded here
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
