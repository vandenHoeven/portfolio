import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main style={{ maxWidth: "700px", margin: "80px auto", fontFamily: "sans-serif" }}>
      <a href="/">← Home</a>

      <section style={{ marginTop: "30px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Projects</h1>
        <p style={{ fontSize: "18px", color: "#444" }}>
          A selection of machine learning and data systems work.
        </p>
      </section>

      <section style={{ marginTop: "40px" }}>
        {projects.map((project) => (
          <div key={project.title} style={{ marginBottom: "30px" }}>
            <p>
              <strong>{project.title}</strong> – {project.description}
            </p>
            <div style={{ marginTop: "8px" }}>
              <a href="#" style={{ marginRight: "15px" }}>
                GitHub
              </a>
              <a href="#">Live</a>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "40px" }}>
        <a href="https://github.com/">View on GitHub</a>
      </section>
    </main>
  );
}
