import { profile } from "@/data/site/profile";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading
        title="Contact"
        subtitle="Open to opportunities, collaborations, and conversations about data science and ML systems."
      />

      <div className="flex flex-wrap gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg-deep transition-opacity hover:opacity-90"
        >
          Email me
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={profile.cv}
          className="rounded-lg border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          Download CV
        </a>
      </div>

      <p className="mt-16 text-sm text-text-muted">
        © {new Date().getFullYear()} {profile.fullName}
      </p>
    </section>
  );
}
