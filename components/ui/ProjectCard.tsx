import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const inner = (
    <>
      <div
        className={`relative mb-4 overflow-hidden rounded-lg bg-white ${
          project.flagship ? "flex items-center justify-center p-4" : "aspect-video"
        }`}
      >
        {project.image ? (
          project.flagship ? (
            <Image
              src={project.image}
              alt={project.title}
              width={project.imageWidth ?? 507}
              height={project.imageHeight ?? 514}
              sizes={`${project.imageCardMaxWidth ?? project.imageMaxWidth ?? 200}px`}
              className="h-auto w-full"
              style={{ maxWidth: project.imageCardMaxWidth ?? project.imageMaxWidth ?? 200 }}
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover ${project.comingSoon ? "opacity-60" : "opacity-80"}`}
            />
          )
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
        {project.comingSoon && (
          <span className="absolute top-3 left-3 rounded-full bg-border px-3 py-1 text-xs font-medium text-text-muted">
            Coming soon
          </span>
        )}
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-accent">
        {project.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold text-text-primary">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.description}</p>
      {project.live && !project.comingSoon && (
        <div className="mt-4 flex gap-4 text-sm">
          <span className="text-accent">Live</span>
        </div>
      )}
    </>
  );

  const cardClass = project.comingSoon
    ? "block cursor-default rounded-xl border border-border bg-white p-5 opacity-90 shadow-sm"
    : "block rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-accent/40 hover:shadow-md";

  if (project.href && !project.comingSoon) {
    return (
      <Link href={project.href} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
