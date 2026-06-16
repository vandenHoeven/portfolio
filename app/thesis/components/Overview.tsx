import { thesisVision } from "@/data/thesis/vision";

export default function Overview() {
  return (
    <section>
      <span className="inline-block rounded px-2.5 py-1 text-xs font-medium bg-white/10 text-text-muted">
        {thesisVision.status}
      </span>

      <h1 className="mt-4 mb-3 text-4xl font-semibold text-text-primary md:text-5xl">
        {thesisVision.headline}
      </h1>

      <p className="text-lg text-text-muted mb-3">{thesisVision.visionLine}</p>

      <p className="text-base text-text-muted/80">{thesisVision.technicalLine}</p>
    </section>
  );
}
