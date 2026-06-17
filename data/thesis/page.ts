import { profile } from "@/data/site/profile";
import { thesisVision } from "@/data/thesis/vision";

export const thesisPage = {
  hero: {
    title: thesisVision.headline,
    tagline: thesisVision.visionLine,
    ctaLabel: "Explore system",
    ctaHref: "#demo",
  },
  demo: {
    title: "Research Prototype",
    description:
      "This interactive environment demonstrates the current state of the system.",
    features: [
      "Impact exploration",
      "Geographic mapping",
      "News-derived impact signals",
      "Regional aggregation",
    ],
    statusNote:
      "Forecasting and UI components are currently under development.",
    streamlitUrl:
      "https://drought-impact-classifier-demo-bfgevucqhgjtufbbglxydm.streamlit.app/",
    openInNewTabLabel: "Open in new tab",
    placeholderLabel: "Streamlit app will load here",
    embedScale: 0.75,
    embedHeight: "85vh",
  },
  demonstrates: {
    title: "Core Capabilities",
    items: [
      {
        title: "News Mining",
        description:
          "Extract drought-related impacts from large collections of unstructured news articles using LLMs.",
      },
      {
        title: "Spatial Intelligence",
        description:
          "Map extracted impacts to NUTS3 regions using geographic and topological aggregation methods.",
      },
      {
        title: "Risk Modeling",
        description:
          "Combine news-derived signals with climate and regional variables to estimate future impact risk.",
      },
      {
        title: "Decision Support",
        description:
          "Surface complex environmental information through interactive visual analytics.",
      },
    ],
  },
  whyNewsData: {
    title: "Why News Data?",
    intro:
      "Traditional drought monitoring relies on environmental measurements such as precipitation, groundwater, and temperature.",
    explanation:
      "This project explores whether societal impacts reported in news media can be transformed into structured signals and used alongside climate indicators to better understand emerging drought risks.",
  },
  architecture: {
    title: "System Architecture",
    intro:
      "The system is organized as a news-to-impact intelligence pipeline: 20k News Articles → LLM Impact Extraction → Spatial Aggregation (NUTS3) → Climate & Regional Data → Random Forest Prediction → Interactive Decision Support.",
  },
  currentStatus: {
    title: "Current Development Status",
    completed: [
      "News ingestion pipeline",
      "LLM-based impact extraction",
      "Geographic impact mapping",
      "Interactive exploration dashboard (UI upgrade planned)",
    ],
    inProgress: [
      "Forecasting integration",
      "Policy simulation layer",
    ],
    planned: [
      "Advanced uncertainty visualization",
    ],
  },
  footer: {
    portfolioLabel: "← Back to portfolio",
    portfolioHref: "/",
    linkedinLabel: "LinkedIn",
    linkedinHref: profile.linkedin,
  },
};
