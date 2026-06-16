import { thesisPage } from "@/data/thesis/page";

export default function ThesisLimitations() {
  const { limitations, futureWork } = thesisPage;

  return (
    <section className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {limitations.title}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted">
            {limitations.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted/40" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {futureWork.title}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted">
            {futureWork.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
