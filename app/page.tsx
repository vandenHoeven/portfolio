import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main style={{ maxWidth: "700px", margin: "80px auto", fontFamily: "sans-serif" }}>
      <section>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Diego Javier van den Hoeven
        </h1>

        <p style={{ fontSize: "18px", color: "#444" }}>
          Data Science & AI student focused on machine learning systems and data-driven applications.
        </p>
      </section>

      <section style={{ marginTop: "30px" }}>
        <a href="/projects" style={{ marginRight: "15px" }}>
          Projects
        </a>
        <a href="https://github.com/" style={{ marginRight: "15px" }}>
          GitHub
        </a>
        <a href="/cv.pdf">CV</a>
      </section>

      <section style={{ marginTop: "60px" }}>
        <h2>Selected Work</h2>

        <div style={{ marginTop: "20px" }}>
          {projects.map((project) => (
            <p key={project.title}>
              <strong>{project.title}</strong> – {project.description}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
