export type PipelineStage = {
  id: string;
  label: string;
  description: string;
  details: string[];
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "ingest",
    label: "Data ingestion",
    description: "News and external sources enter here",
    details: [
      "News and external datasets collected from public sources",
      "Structured storage for downstream processing",
    ],
  },
  {
    id: "process",
    label: "Processing",
    description: "NLP and feature extraction",
    details: [
      "NLP and feature extraction from unstructured text",
      "Normalization and transformation into model-ready signals",
    ],
  },
  {
    id: "predict",
    label: "Prediction",
    description: "Forecasting layer (experimental)",
    details: [
      "Forecasting and classification layer for scenario exploration",
      "Experimental simulation of policy-relevant outcomes",
    ],
  },
  {
    id: "viz",
    label: "Visualization",
    description: "Interactive exploration for users",
    details: [
      "Streamlit-based interactive exploration layer",
      "Decoupled from training for rapid iteration",
    ],
  },
];
