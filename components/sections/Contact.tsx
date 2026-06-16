import { profile } from "@/data/site/profile";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading
        title="Contact"
        subtitle="Open to opportunities, collaborations, and conversations about data science and ML systems."
      />

      <p className="mb-6 text-lg font-medium text-text-primary">{profile.email}</p>

      <div className="flex flex-wrap gap-4">
        <CopyEmailButton email={profile.email} primary />
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          LinkedIn
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
