import { pipelineStages } from "@/data/thesis/pipeline";

export default function SystemMap() {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold text-text-primary">Data flow</h2>

      <div className="flex flex-wrap items-start gap-2">
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-2">
            <div className="min-w-[140px] max-w-[160px] rounded-lg border border-border bg-surface p-4">
              <strong className="mb-1.5 block text-text-primary">{stage.label}</strong>
              <span className="text-xs text-text-muted">{stage.description}</span>
            </div>
            {index < pipelineStages.length - 1 && (
              <span className="self-center text-xl text-text-muted/50">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
