import SiteNav from "@/components/layout/SiteNav";
import SectionBand from "@/components/layout/SectionBand";
import SiteShell from "@/components/layout/SiteShell";
import ThesisArchitecture from "./components/ThesisArchitecture";
import ThesisDemoEmbed from "./components/ThesisDemoEmbed";
import ThesisDemonstrates from "./components/ThesisDemonstrates";
import ThesisFooter from "./components/ThesisFooter";
import ThesisHero from "./components/ThesisHero";
import ThesisLimitations from "./components/ThesisLimitations";
import ThesisWhyNewsData from "./components/ThesisWhyNewsData";

export default function ThesisPage() {
  return (
    <>
      <SiteNav />

      <SectionBand variant="white">
        <ThesisHero />
      </SectionBand>

      <ThesisDemoEmbed />

      <SectionBand variant="grey">
        <SiteShell>
          <ThesisArchitecture />
        </SiteShell>
      </SectionBand>

      <SectionBand variant="white">
        <SiteShell>
          <ThesisWhyNewsData />
          <ThesisDemonstrates />
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
