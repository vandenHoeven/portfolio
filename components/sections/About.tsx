import Image from "next/image";
import { experience, profile } from "@/data/site/profile";

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
          <p className="mt-6 text-lg leading-relaxed text-text-muted">{profile.bio}</p>

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
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-x-auto">
        <div className="flex min-w-max gap-6">
          {experience.map((entry) => (
            <div
              key={`${entry.year}-${entry.role}`}
              className="min-w-[200px] rounded-xl border border-border bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-sm font-medium text-accent">{entry.year}</p>
              <p className="mt-1 font-semibold text-text-primary">{entry.role}</p>
              <p className="mt-1 text-sm text-text-muted">{entry.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
