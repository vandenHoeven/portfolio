export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  flagship?: boolean;
  comingSoon?: boolean;
  href?: string;
  live?: string;
  image?: string;
};

export const projectCategories = [
  "All",
  "ML Systems",
  "Decision Systems (RL & Optimization)",
  "Statistical & Mathematical Modeling",
  "Exploratory / Theory",
];

export const projects: Project[] = [
  {
    id: "research-internship",
    title: "Research internship",
    description:
      "News-driven ML system for drought impact prediction and decision support.",
    category: "ML Systems",
    flagship: true,
    href: "/thesis",
    image: "/projects/drought-impact-demo.png",
  },
  {
    id: "llm-model-project",
    title: "LLM from Scratch",
    description:
      "Built a language model from scratch — architecture, tokenizer, training pipeline, and inference.",
    category: "ML Systems",
    comingSoon: true,
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "maintenance-scheduling",
    title: "Maintenance Scheduling Prediction System",
    description:
      "Constraint-based optimization model for predictive scheduling and resource allocation.",
    category: "Decision Systems (RL & Optimization)",
    comingSoon: true,
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "sudoku-mcts",
    title: "Multi-Agent Sudoku Solver using Monte Carlo Tree Search",
    description:
      "Designed a multi-agent system for solving Sudoku through parallel state-space exploration. Implemented Monte Carlo Tree Search to coordinate agent rollouts and efficiently navigate the solution space under shared constraints.",
    category: "Decision Systems (RL & Optimization)",
    comingSoon: true,
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "bias-variance-regression",
    title: "Bias–Variance & Regression Analysis",
    description:
      "Investigation of model assumptions, variance decomposition, and generalization behavior in linear models.",
    category: "Statistical & Mathematical Modeling",
    comingSoon: true,
    image: "/projects/project-placeholder.svg",
  },
  {
    id: "kidney-exchange",
    title: "Kidney Exchange Problem (NP-hard)",
    description:
      "Graph-based matching problem analysis and algorithmic study of optimal donor–recipient matching.",
    category: "Exploratory / Theory",
    comingSoon: true,
    image: "/projects/project-placeholder.svg",
  },
];
