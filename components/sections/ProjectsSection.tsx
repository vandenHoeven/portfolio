"use client";

import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter(
    (p) =>
      !p.flagship && (activeCategory === "All" || p.category === activeCategory),
  );

  return (
    <section id="projects" className="py-24">
      <SectionHeading
        title="Projects"
        subtitle="A glimpse of the work I've been building — from thesis research to side projects."
      />

      <div className="mb-10 flex flex-wrap gap-3">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeCategory === category
                ? "bg-accent font-medium text-white"
                : "border border-border text-text-muted hover:border-accent/50 hover:text-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
