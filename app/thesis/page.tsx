import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { thesisModules } from "@/data/thesis/modules";
import ModuleCard from "./components/ModuleCard";
import Overview from "./components/Overview";
import SystemMap from "./components/SystemMap";

export default function ThesisPage() {
  return (
    <SiteShell>
      <main className="py-24 md:py-32">
        <Link
          href="/"
          className="text-sm text-text-muted transition-colors hover:text-accent"
        >
          ← Home
        </Link>

        <div className="mt-8">
          <Overview />
        </div>

        <div className="mt-14">
          <SystemMap />
        </div>

        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-semibold text-text-primary">Modules</h2>
          {thesisModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
