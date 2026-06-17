import { thesisPage } from "@/data/thesis/page";

export default function ThesisLimitations() {
  const { currentStatus } = thesisPage;

  return (
    <section className="py-20 md:py-24">
      <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
        {currentStatus.title}
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Completed
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
            {currentStatus.completed.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-accent" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            In Progress
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
            {currentStatus.inProgress.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-text-muted/70" aria-hidden>
                  ◌
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Planned
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
            {currentStatus.planned.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-text-muted/70" aria-hidden>
                  ◌
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
