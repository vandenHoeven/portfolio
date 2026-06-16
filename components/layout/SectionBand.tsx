type SectionBandProps = {
  variant: "white" | "grey";
  children: React.ReactNode;
};

export default function SectionBand({ variant, children }: SectionBandProps) {
  if (variant === "grey") {
    return (
      <div className="border-y border-border-strong bg-bg-section">
        {children}
      </div>
    );
  }

  return (
    <div className="border-t border-border-strong bg-bg-hero">
      {children}
    </div>
  );
}
