import { thesisPage } from "@/data/thesis/page";
import InteractiveNetworkBackground from "@/components/background/InteractiveNetworkBackground";

export default function ThesisHero() {
  const { hero } = thesisPage;

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
      <InteractiveNetworkBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
          {hero.tagline}
        </p>
        <a
          href={hero.ctaHref}
          className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {hero.ctaLabel}
        </a>
      </div>
    </section>
  );
}
