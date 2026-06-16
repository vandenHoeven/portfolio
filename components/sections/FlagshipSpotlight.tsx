import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { thesisVision } from "@/data/thesis/vision";

export default function FlagshipSpotlight() {
  const flagship = projects.find((p) => p.flagship);

  return (
    <section className="py-24">
      <div className="grid items-center gap-10 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-mid">
          {flagship?.image && (
            <Image
              src={flagship.image}
              alt={flagship.title}
              fill
              className="object-cover opacity-90"
            />
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Flagship project</p>
          <h2 className="mt-3 text-3xl font-semibold text-text-primary md:text-4xl">
            {thesisVision.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">{thesisVision.visionLine}</p>
          <p className="mt-3 text-sm text-text-muted">{thesisVision.technicalLine}</p>
          <Link
            href="/thesis"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg-deep transition-opacity hover:opacity-90"
          >
            Explore system →
          </Link>
        </div>
      </div>
    </section>
  );
}
