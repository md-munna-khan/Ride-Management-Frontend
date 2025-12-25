


import { HeroSection } from "@/components/modules/HomePage/HeroSection";
import { HowItWorks } from "@/components/modules/HomePage/HowItWorks";
import { Services } from "@/components/modules/HomePage/services";
import { Testimonials } from "@/components/modules/HomePage/Testimonials";
import { FeaturesHighlights } from "@/components/modules/HomePage/FeaturesHighlights";
import { SafetyAndSecurity } from "@/components/modules/HomePage/SafetyAndSecurity";

import { CTASection } from "@/components/modules/HomePage/CTASection";
import Categories from "@/components/modules/HomePage/Categories";

export default function Homepage() {
  return (
    <div className="">
      <HeroSection />
      <FeaturesHighlights />
      <HowItWorks />
      <Services />
      <Categories/>
      <SafetyAndSecurity />
      <Testimonials />
     
      <CTASection />
    </div>
  );
}
