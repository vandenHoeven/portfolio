export type PipelineStage = {
  id: string;
  label: string;
  description: string;
  details: string[];
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "news",
    label: "News Article Collection",
    description: "Large-scale drought-related news articles collected via web scraping",
    details: [
      "Articles (20k spanning 2005-2026) are collected using a web scraper targeting drought-related keywords",
      "Time metadata is preserved for temporal analysis"
    ],
  },
  {
    id: "llm-extraction",
    label: "LLM Impact Extraction",
    description: "Classify and extract impact signals from news articles using LLMs",
    details: [
      "Classify articles into multiple drought impact categories (e.g., agricultural loss, groundwater depletion, water supply issues, etc.)",
      "Extract severity signals, location mentions, and supporting evidence from text",
    ],
  },
  {
    id: "spatial",
    label: "Spatial Aggregation (NUTS3)",
    description: "Map extracted signals to geographic regions",
    details: [
      "Convert textual location mentions into geospatial representations (coordinates + administrative identifiers)",
      "Assign mentions to NUTS3 regions using gazetteer matching, name-based rules, and polygon-based validation",
    ],
  },
  {
    id: "climate-regional",
    label: "Climate & Regional Data",
    description: "Enrich impact signals with environmental covariates",
    details: [
      "Combine climate indicators (rain, evaporation, groundwater levels)",
      "Combine regional data (house pricing, population density, soil type)",
    ],
  },
  {
    id: "prediction",
    label: "Random Forest Prediction",
    description: "Predict future drought impacts by region",
    details: [
      "Predict future drought impacts by region using a Random Forest model",
    ],
  },
  {
    id: "decision-support",
    label: "Interactive Decision Support",
    description: "Provide evidence-focused exploration for policy users",
    details: [
      "Visualize extracted impact data alongside supporting evidence from source articles",
      "Support inspection of geocoded impacts, regional assignments, and temporal patterns",
      "Prediction Mode (to be added)",
    ],
  },
];
