import type { ModuleStatus, ThesisModule } from "@/data/thesis/modules";

const statusLabels: Record<ModuleStatus, string> = {
  active: "Active",
  in_development: "In development",
  experimental: "Experimental",
  planned: "Planned",
};

const statusClasses: Record<ModuleStatus, string> = {
  active: "bg-teal-100 text-teal-800",
  in_development: "bg-amber-100 text-amber-800",
  experimental: "bg-purple-100 text-purple-800",
  planned: "bg-slate-100 text-slate-600",
};

type ModuleCardProps = {
  module: ThesisModule;
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const content = (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <strong className="text-lg text-text-primary">{module.title}</strong>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${statusClasses[module.status]}`}
        >
          {statusLabels[module.status]}
        </span>
      </div>
      <p className="m-0 text-text-muted">{module.description}</p>
      {module.href && (
        <p className="mt-3 mb-0 text-sm text-accent">Open module →</p>
      )}
    </>
  );

  const cardClass =
    "mb-4 block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30";

  if (module.href) {
    return (
      <a href={module.href} className={`${cardClass} no-underline text-inherit`}>
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}
