export type PipelineStage = {
  id: string;
  label: string;
  description: string;
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "ingest",
    label: "Data ingestion",
    description: "News and external sources enter here",
  },
  {
    id: "process",
    label: "Processing",
    description: "NLP and feature extraction",
  },
  {
    id: "predict",
    label: "Prediction",
    description: "Forecasting layer (experimental)",
  },
  {
    id: "viz",
    label: "Visualization",
    description: "Interactive exploration for users",
  },
];
