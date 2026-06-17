import { thesisPage } from "@/data/thesis/page";

export default function ThesisWhyNewsData() {
  const { whyNewsData } = thesisPage;

  return (
    <section className="border-t border-border/60 pb-20 pt-12 md:pb-24 md:pt-16">
      <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
        {whyNewsData.title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">
        {whyNewsData.intro}
      </p>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-muted">
        {whyNewsData.explanation}
      </p>
    </section>
  );
}
