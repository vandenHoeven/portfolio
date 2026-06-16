import SiteNav from "@/components/layout/SiteNav";
import SectionBand from "@/components/layout/SectionBand";
import SiteShell from "@/components/layout/SiteShell";
import ThesisArchitecture from "./components/ThesisArchitecture";
import ThesisDemoEmbed from "./components/ThesisDemoEmbed";
import ThesisDemonstrates from "./components/ThesisDemonstrates";
import ThesisDesignDecisions from "./components/ThesisDesignDecisions";
import ThesisFooter from "./components/ThesisFooter";
import ThesisHero from "./components/ThesisHero";
import ThesisLimitations from "./components/ThesisLimitations";

export default function ThesisPage() {
  return (
    <>
      <SiteNav />

      <SectionBand variant="white">
        <SiteShell>
          <ThesisHero />
        </SiteShell>
      </SectionBand>

      <ThesisDemoEmbed />

      <SectionBand variant="grey">
        <SiteShell>
          <ThesisDemonstrates />
          <ThesisDesignDecisions />
        </SiteShell>
      </SectionBand>

      <SectionBand variant="white">
        <SiteShell>
          <ThesisArchitecture />
        </SiteShell>
      </SectionBand>

      <SectionBand variant="grey">
        <SiteShell>
          <ThesisLimitations />
        </SiteShell>
      </SectionBand>

      <SectionBand variant="white">
        <SiteShell>
          <ThesisFooter />
        </SiteShell>
      </SectionBand>
    </>
  );
}
