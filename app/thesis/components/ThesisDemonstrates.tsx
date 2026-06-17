import { thesisPage } from "@/data/thesis/page";

export default function ThesisDemonstrates() {
  const { demonstrates } = thesisPage;

  return (
    <section className="py-20 md:py-24">
      <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
        {demonstrates.title}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {demonstrates.items.map((item) => (
          <article key={item.title} className="rounded-lg border border-border bg-white p-4">
            <h3 className="text-sm font-semibold text-text-primary md:text-base">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
