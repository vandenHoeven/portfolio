import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const inner = (
    <>
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-bg-section">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-80"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-muted">
            Preview
          </div>
        )}
        {project.flagship && (
          <span className="absolute top-3 left-3 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
            Flagship
          </span>
        )}
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-accent">
        {project.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold text-text-primary">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.description}</p>
      {(project.github || project.live) && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.github && (
            <span className="text-accent">GitHub</span>
          )}
          {project.live && (
            <span className="text-accent">Live</span>
          )}
        </div>
      )}
    </>
  );

  const cardClass =
    "block rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-accent/40 hover:shadow-md";

  if (project.href) {
    return (
      <Link href={project.href} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
