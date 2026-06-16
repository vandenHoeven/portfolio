import { pipelineStages } from "@/data/thesis/pipeline";

export default function SystemMap() {
  return (
    <section>
      <h2 style={{ marginBottom: "20px" }}>Data flow</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <div
              style={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                minWidth: "140px",
                maxWidth: "160px",
              }}
            >
              <strong style={{ display: "block", marginBottom: "6px" }}>{stage.label}</strong>
              <span style={{ fontSize: "13px", color: "#666" }}>{stage.description}</span>
            </div>
            {index < pipelineStages.length - 1 && (
              <span style={{ alignSelf: "center", fontSize: "20px", color: "#999" }}>→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
