import { thesisVision } from "@/data/thesis/vision";

export default function Overview() {
  return (
    <section>
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            fontSize: "13px",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
            color: "#555",
          }}
        >
          {thesisVision.status}
        </span>
      </div>

      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>{thesisVision.headline}</h1>

      <p style={{ fontSize: "18px", color: "#444", marginBottom: "12px" }}>
        {thesisVision.visionLine}
      </p>

      <p style={{ fontSize: "16px", color: "#666" }}>{thesisVision.technicalLine}</p>
    </section>
  );
}
