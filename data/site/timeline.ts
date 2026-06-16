export type TimelineEntry = {
  id: string;
  startYear: number;
  startMonth?: number;
  endYear?: number;
  endMonth?: number;
  endLabel?: string;
  offsetLeft?: number;
  type: "education" | "work";
  title: string;
  organization: string;
  summary: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "physics-minor",
    startYear: 2018,
    endYear: 2020,
    type: "education",
    title: "Physics & Geosciences Minor",
    organization: "UU",
    summary: "Foundational physics with earth systems and climate",
  },
  {
    id: "bsc-data-science",
    startYear: 2020,
    endYear: 2023,
    type: "education",
    title: "BSc Data Science",
    organization: "TU/e & UvT",
    summary: "Statistics and ML foundations",
  },
  {
    id: "dehora",
    startYear: 2023,
    endYear: 2023,
    type: "work",
    title: "Data Scientist",
    organization: "Déhora",
    summary: "Workforce scheduling optimization",
  },
  {
    id: "jads-minor",
    startYear: 2023,
    endYear: 2024,
    type: "education",
    title: "Minor Data Science in Business",
    organization: "JADS",
    summary: "Applied data science in business contexts",
  },
  {
    id: "msc-data-science",
    startYear: 2024,
    endYear: 2026,
    type: "education",
    title: "MSc Data Science & AI",
    organization: "TU/e",
    summary: "Probabilistic modelling and ML systems",
  },
  {
    id: "kuijpers",
    startYear: 2025,
    endYear: 2025,
    offsetLeft: -5,
    type: "work",
    title: "Data Scientist",
    organization: "Kuijpers",
    summary: "Predictive maintenance and feature extraction from service text",
  },
  {
    id: "deltares",
    startYear: 2026,
    startMonth: 1,
    endYear: 2026,
    endMonth: 9,
    type: "work",
    title: "Research Intern",
    organization: "Deltares",
    summary: "NLP/ML for climate risk and drought impact",
  },
];
