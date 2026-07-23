import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Metrics } from "@/components/sections/Metrics";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { FoundingCohort } from "@/components/sections/FoundingCohort";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/JsonLd";
import { faqGraph } from "@/lib/jsonld";
import { HeroBackground } from "@/components/hero/HeroBackground";

export default function Home() {
  return (
    <>
      <Hero background={<HeroBackground />} />
      <ProofStrip />
      <StackMarquee />
      <Metrics />
      <CapabilitiesGrid />
      <HowItWorks />
      <Industries />
      <Pricing />
      <FoundingCohort />
      <Faq />
      <Cta />
      <JsonLd data={faqGraph()} />
    </>
  );
}
