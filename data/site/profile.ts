export type ExperienceEntry = {
  year: string;
  role: string;
  organization: string;
};

export const profile = {
  firstName: "Diego",
  lastName: "van den Hoeven",
  fullName: "Diego Javier van den Hoeven",
  role: "Data Science & AI student",
  tagline: "Building machine learning systems and data-driven applications.",
  bio: "I'm a Data Science & AI student focused on machine learning systems, data pipelines, and interactive visualization. I enjoy turning complex datasets into tools that help people explore and understand information — from research prototypes to production-ready applications.",
  email: "you@email.com",
  github: "https://github.com/",
  cv: "/cv.pdf",
  image: "/profile.png",
};

export const experience: ExperienceEntry[] = [
  { year: "2024", role: "Data Science student", organization: "University" },
  { year: "2025", role: "ML systems project", organization: "Thesis research" },
  { year: "2026", role: "Policy decision support", organization: "Thesis system" },
];
