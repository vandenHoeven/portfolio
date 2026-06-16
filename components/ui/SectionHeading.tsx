type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-text-muted">{subtitle}</p>}
      <hr className="mt-8 border-border" />
    </div>
  );
}
