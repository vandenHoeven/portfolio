import { thesisPage } from "@/data/thesis/page";
import { pipelineStages } from "@/data/thesis/pipeline";

export default function ThesisArchitecture() {
  const { architecture } = thesisPage;

  return (
    <section className="py-20 md:py-24">
      <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
        {architecture.title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">
        {architecture.intro}
      </p>

      <div className="mt-10 flex flex-wrap items-start gap-2">
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-2">
            <div className="min-w-[140px] max-w-[180px] rounded-lg border border-border bg-surface p-4">
              <strong className="mb-1.5 block text-sm text-text-primary">{stage.label}</strong>
              <span className="text-xs text-text-muted">{stage.description}</span>
            </div>
            {index < pipelineStages.length - 1 && (
              <span className="self-center text-xl text-text-muted/50" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {pipelineStages.map((stage) => (
          <div key={stage.id}>
            <h3 className="text-sm font-semibold text-text-primary">{stage.label}</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {stage.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="text-accent" aria-hidden>
                    ·
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
