import { thesisPage } from "@/data/thesis/page";

export default function ThesisDemoEmbed() {
  const { demo } = thesisPage;
  const hasStreamlitUrl = demo.streamlitUrl.length > 0;

  return (
    <section id="demo" className="scroll-mt-24 border-t border-border-strong bg-bg-hero">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          {demo.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
          {demo.description}
        </p>
      </div>

      <div className="border-y border-border-strong bg-white">
        {hasStreamlitUrl ? (
          <iframe
            src={demo.streamlitUrl}
            title={demo.title}
            className="h-[min(80vh,720px)] w-full border-0"
          />
        ) : (
          <div className="flex min-h-[520px] items-center justify-center border-2 border-dashed border-border bg-surface/50 px-6 text-center text-text-muted">
            {demo.placeholderLabel}
          </div>
        )}
      </div>

      {hasStreamlitUrl && (
        <div className="mx-auto w-full max-w-[1100px] px-6 py-4 md:px-10">
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
    </section>
  );
}
