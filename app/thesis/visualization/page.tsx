import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visualization | Thesis system",
  description: "Interactive exploration layer for the policy decision support system.",
};

export default function VisualizationPage() {
  return (
    <main style={{ maxWidth: "700px", margin: "80px auto", fontFamily: "sans-serif" }}>
      <a href="/thesis">← Thesis system</a>

      <section style={{ marginTop: "30px" }}>
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 10px",
              fontSize: "13px",
              borderRadius: "4px",
              backgroundColor: "#e6f4ea",
              color: "#1e7e34",
            }}
          >
            Active module
          </span>
        </div>

        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Interactive exploration layer</h1>

        <p style={{ fontSize: "18px", color: "#444" }}>
          The visualization tool for exploring news-driven insights. More features coming soon.
        </p>
      </section>

      <section style={{ marginTop: "40px" }}>
        <div
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "60px 20px",
            textAlign: "center",
            color: "#888",
            backgroundColor: "#fafafa",
          }}
        >
          Visualization tool will be embedded here
        </div>
      </section>
    </main>
  );
}
