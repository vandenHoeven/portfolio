import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { thesisVision } from "@/data/thesis/vision";

export default function FlagshipSpotlight() {
  const flagship = projects.find((p) => p.flagship);

  return (
    <section className="py-24">
      <div className="grid items-center gap-10 rounded-2xl border border-border bg-white p-8 shadow-md md:grid-cols-2 md:p-12">
        <div className="flex justify-center overflow-hidden rounded-xl border border-border bg-white p-6 md:p-8">
          {flagship?.image && (
            <Image
              src={flagship.image}
              alt={flagship.title}
              width={flagship.imageWidth ?? 507}
              height={flagship.imageHeight ?? 514}
              sizes={`${flagship.imageMaxWidth ?? 280}px`}
              className="h-auto w-full"
              style={{ maxWidth: flagship.imageMaxWidth ?? 280 }}
              priority
            />
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {thesisVision.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-text-primary md:text-4xl">
            {thesisVision.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">{thesisVision.visionLine}</p>
          <p className="mt-4 text-sm font-medium text-text-primary">{thesisVision.pipelineIntro}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-muted">
            {thesisVision.pipelineSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <Link
            href="/thesis#demo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Explore system →
          </Link>
        </div>
      </div>
    </section>
  );
}
