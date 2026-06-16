import { thesisPage } from "@/data/thesis/page";

export default function ThesisDesignDecisions() {
  const { designDecisions } = thesisPage;

  return (
    <section className="border-t border-border/60 pb-20 pt-12 md:pb-24 md:pt-16">
      <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
        {designDecisions.title}
      </h2>
      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted md:text-base">
        {designDecisions.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
