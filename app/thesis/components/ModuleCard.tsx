import type { ModuleStatus, ThesisModule } from "@/data/thesis/modules";

const statusLabels: Record<ModuleStatus, string> = {
  active: "Active",
  in_development: "In development",
  experimental: "Experimental",
  planned: "Planned",
};

const statusStyles: Record<ModuleStatus, { backgroundColor: string; color: string }> = {
  active: { backgroundColor: "#e6f4ea", color: "#1e7e34" },
  in_development: { backgroundColor: "#fff3cd", color: "#856404" },
  experimental: { backgroundColor: "#e8eaf6", color: "#3949ab" },
  planned: { backgroundColor: "#f0f0f0", color: "#555" },
};

type ModuleCardProps = {
  module: ThesisModule;
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const badgeStyle = statusStyles[module.status];

  const content = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <strong style={{ fontSize: "18px" }}>{module.title}</strong>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            fontSize: "12px",
            borderRadius: "4px",
            ...badgeStyle,
          }}
        >
          {statusLabels[module.status]}
        </span>
      </div>
      <p style={{ margin: 0, color: "#444" }}>{module.description}</p>
      {module.href && (
        <p style={{ marginTop: "10px", marginBottom: 0, fontSize: "14px", color: "#0066cc" }}>
          Open module →
        </p>
      )}
    </>
  );

  const cardStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "16px",
  };

  if (module.href) {
    return (
      <a
        href={module.href}
        style={{
          ...cardStyle,
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {content}
      </a>
    );
  }

  return <div style={cardStyle}>{content}</div>;
}
