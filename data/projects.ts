export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  flagship?: boolean;
  href?: string;
  github?: string;
  live?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "thesis",
    title: "Policy decision support system",
    description:
      "News-driven forecasting and analysis system with modular pipelines and interactive visualization.",
    category: "Thesis",
    flagship: true,
    href: "/thesis",
    image: "/projects/thesis-placeholder.svg",
  },
  {
    id: "project-1",
    title: "Project 1",
    description: "Short description of what it does.",
    category: "ML",
    github: "#",
    live: "#",
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "project-2",
    title: "Project 2",
    description: "Short description of what it does.",
    category: "Dataviz",
    github: "#",
    live: "#",
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "project-3",
    title: "Project 3",
    description: "Short description of what it does.",
    category: "Data",
    github: "#",
    image: "/projects/project-placeholder.svg",
  },
];

export const projectCategories = ["All", ...new Set(projects.map((p) => p.category))];
