import Image from "next/image";
import InteractiveNetworkBackground from "@/components/background/InteractiveNetworkBackground";
import { profile } from "@/data/site/profile";

export default function Hero() {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-border-strong bg-bg-hero pt-20 pb-16"
    >
      <InteractiveNetworkBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {profile.role}
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-text-primary md:text-7xl">
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
              {profile.tagline}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-border ring-4 ring-accent/10 md:h-72 md:w-72">
              <Image
                src={profile.image}
                alt={profile.fullName}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mt-16 flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="text-xl">﹀</span>
        </a>
      </div>
    </section>
  );
}
