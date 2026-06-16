import SiteNav from "@/components/layout/SiteNav";
import SectionBand from "@/components/layout/SectionBand";
import SiteShell from "@/components/layout/SiteShell";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FlagshipSpotlight from "@/components/sections/FlagshipSpotlight";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />

      <SectionBand variant="grey">
        <SiteShell>
          <About />
          <FlagshipSpotlight />
        </SiteShell>
      </SectionBand>

      <SectionBand variant="white">
        <SiteShell>
          <ProjectsSection />
          <Contact />
        </SiteShell>
      </SectionBand>
    </>
  );
}
