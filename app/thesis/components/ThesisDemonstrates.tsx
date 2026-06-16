import { thesisPage } from "@/data/thesis/page";

export default function ThesisDemonstrates() {
  const { demonstrates } = thesisPage;

  return (
    <section className="py-20 md:py-24">
      <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
        {demonstrates.title}
      </h2>
      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted md:text-base">
        {demonstrates.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
