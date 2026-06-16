import Image from "next/image";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import HorizontalTimeline from "@/components/ui/HorizontalTimeline";
import { profile } from "@/data/site/profile";
import { timeline } from "@/data/site/timeline";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="grid items-start gap-12 md:grid-cols-[240px_1fr]">
        <div className="relative mx-auto h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-border md:mx-0">
          <Image src={profile.image} alt={profile.fullName} fill className="object-cover" />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            Hi, I&apos;m {profile.firstName}.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-text-muted">
            {profile.introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={profile.cv}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              CV
            </a>
            <CopyEmailButton email={profile.email} compact />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-8 text-xl font-semibold text-text-primary">Background</h3>
        <HorizontalTimeline entries={timeline} />
      </div>
    </section>
  );
}
