import "./franchise/betz-mock-sections.css";
import { BrandRefreshSection } from "./franchise/components/BrandRefreshSection";
import { FranchiseFooter } from "./franchise/components/FranchiseFooter";
import { FranchiseHeader } from "./franchise/components/FranchiseHeader";
import { FranchiseHero } from "./franchise/components/FranchiseHero";
import { FranchiseJourney } from "./franchise/components/FranchiseJourney";
import { HeritageSection } from "./franchise/components/HeritageSection";
import { IdealPartners } from "./franchise/components/IdealPartners";
import { LifestyleBand } from "./franchise/components/LifestyleBand";
import { OpportunityIntro } from "./franchise/components/OpportunityIntro";
import { RetailOperatingModel } from "./franchise/components/RetailOperatingModel";
import { Since1945Badge } from "./franchise/components/Since1945Badge";
import { Territories } from "./franchise/components/Territories";
import { WaitlistForm } from "./franchise/components/WaitlistForm";
import { WhatYouGet } from "./franchise/components/WhatYouGet";

export default function Home() {
  return (
    <>
      <FranchiseHeader />
      <main>
        <FranchiseHero />
        <OpportunityIntro />
        <FranchiseJourney />
        <WhatYouGet />
        <HeritageSection />
        <BrandRefreshSection />
        <RetailOperatingModel />
        <LifestyleBand />
        <Territories />
        <IdealPartners />
        <WaitlistForm />
      </main>
      <FranchiseFooter />
      <Since1945Badge />
    </>
  );
}
