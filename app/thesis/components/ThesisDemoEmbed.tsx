import { thesisPage } from "@/data/thesis/page";

export default function ThesisDemoEmbed() {
  const { demo } = thesisPage;
  const hasStreamlitUrl = demo.streamlitUrl.length > 0;
  const embedUrl = hasStreamlitUrl
    ? `${demo.streamlitUrl.replace(/\/$/, "")}?embed=true`
    : "";
  const scale = demo.embedScale ?? 1;
  const visibleHeight = demo.embedHeight ?? "85vh";

  return (
    <section id="demo" className="scroll-mt-24 border-t border-border-strong bg-bg-section">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-10 md:px-10 md:py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          {demo.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
          {demo.description}
        </p>
        <p className="mt-5 text-sm font-medium text-text-primary">Features include:</p>
        <ul className="mt-2 space-y-2 text-sm text-text-muted">
          {demo.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-accent" aria-hidden>
                •
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">
          {demo.statusNote}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-6 pb-10 md:px-10 md:pb-12">
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-md">
          {hasStreamlitUrl ? (
            <div
              className="relative w-full overflow-hidden"
              style={{ height: visibleHeight }}
            >
              <iframe
                src={embedUrl}
                title={demo.title}
                allow="fullscreen"
                className="absolute left-0 top-0 origin-top-left border-0"
                style={{
                  width: `${100 / scale}%`,
                  height: `calc(${visibleHeight} / ${scale})`,
                  transform: `scale(${scale})`,
                }}
              />
            </div>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center border-2 border-dashed border-border bg-surface/50 px-6 text-center text-text-muted">
              {demo.placeholderLabel}
            </div>
          )}
        </div>

        {hasStreamlitUrl && (
          <div className="mt-4">
            <p className="mb-2 text-xs text-text-muted">
              For full-size controls, open in new tab.
            </p>
            <a
              href={demo.streamlitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent transition-colors hover:opacity-80"
            >
              {demo.openInNewTabLabel} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
