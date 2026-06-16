import { thesisModules } from "@/data/thesis/modules";
import ModuleCard from "./components/ModuleCard";
import Overview from "./components/Overview";
import SystemMap from "./components/SystemMap";

export default function ThesisPage() {
  return (
    <main style={{ maxWidth: "700px", margin: "80px auto", fontFamily: "sans-serif" }}>
      <a href="/">← Home</a>

      <div style={{ marginTop: "30px" }}>
        <Overview />
      </div>

      <div style={{ marginTop: "50px" }}>
        <SystemMap />
      </div>

      <section style={{ marginTop: "50px" }}>
        <h2 style={{ marginBottom: "20px" }}>Modules</h2>
        {thesisModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </section>
    </main>
  );
}
