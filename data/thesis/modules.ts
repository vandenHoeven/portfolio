export type ModuleStatus = "active" | "in_development" | "experimental" | "planned";

export type ThesisModule = {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  href?: string;
};

export const thesisModules: ThesisModule[] = [
  {
    id: "ingestion",
    title: "Data ingestion",
    description: "Scraping and news database layer for collecting external sources.",
    status: "in_development",
  },
  {
    id: "processing",
    title: "Processing",
    description: "NLP and ML pipeline for transforming raw news into structured features.",
    status: "in_development",
  },
  {
    id: "prediction",
    title: "Prediction",
    description: "Forecasting layer for scenario exploration. Still experimental and not active yet.",
    status: "experimental",
  },
  {
    id: "visualization",
    title: "Visualization",
    description: "Interactive exploration layer for policy makers to inspect data and insights.",
    status: "active",
    href: "/thesis/visualization",
  },
];
