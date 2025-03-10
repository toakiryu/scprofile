import React from "react";
import SectionsHero from "@/components/sections/hero";
import SectionsFeature from "@/components/sections/feature";
import SectionsPricing from "@/components/sections/pricing";
import SectionTeam from "@/components/sections/team";
import SectionsFaq from "@/components/sections/faq";

async function PagesHome() {
  return (
    <div>
      <SectionsHero />
      <SectionsFeature />
      <SectionsPricing />
      <SectionTeam />
      <SectionsFaq />
    </div>
  );
}

export default PagesHome;
