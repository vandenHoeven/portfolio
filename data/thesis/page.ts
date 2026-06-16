import { profile } from "@/data/site/profile";
import { projects } from "@/data/projects";
import { thesisVision } from "@/data/thesis/vision";

const flagship = projects.find((p) => p.flagship);

export const thesisPage = {
  hero: {
    title: thesisVision.headline,
    tagline: thesisVision.visionLine,
    ctaLabel: "Explore Interactive Demo",
    ctaHref: "#demo",
  },
  demo: {
    title: "Interactive Simulation",
    description:
      "This system lets you explore news-driven policy dynamics over time. Adjust parameters, inspect predictions, and observe how different inputs affect outcomes.",
    streamlitUrl:
      "https://drought-impact-classifier-demo-bfgevucqhgjtufbbglxydm.streamlit.app/",
    openInNewTabLabel: "Open in new tab",
    placeholderLabel: "Streamlit app will load here",
    embedScale: 0.75,
    embedHeight: "85vh",
  },
  demonstrates: {
    title: "What this demonstrates",
    items: [
      "Time-series modeling for news and environmental signals",
      "Structured feature engineering from heterogeneous data sources",
      "Classification system design for real-world uncertainty",
      "Interactive exploration of model outputs over time",
      "System thinking across data, model, and interface layers",
    ],
  },
  designDecisions: {
    title: "Design decisions",
    items: [
      "Streamlit chosen for rapid interactive prototyping",
      "Modular pipeline to separate experimentation from interface",
      "Visualization layer decoupled from model training for flexibility",
      "Designed for extensibility into real-time policy simulation",
    ],
  },
  architecture: {
    title: "System Architecture",
    intro:
      "The system is built as a modular pipeline: Data ingestion → Processing → Prediction → Visualization",
  },
  limitations: {
    title: "Limitations",
    items: [
      "Forecasting layer is experimental",
      "Data sources are not fully real-time integrated",
      "Model uncertainty visualization is still basic",
    ],
  },
  futureWork: {
    title: "Future work",
    items: [
      "Real-time ingestion pipeline",
      "Scenario-based policy simulation layer",
      "Improved uncertainty quantification",
    ],
  },
  footer: {
    portfolioLabel: "← Back to portfolio",
    portfolioHref: "/",
    githubLabel: "GitHub",
    githubHref: flagship?.github ?? profile.github,
  },
};
