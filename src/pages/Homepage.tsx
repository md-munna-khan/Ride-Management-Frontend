

import { CTASection } from "@/components/modules/HomePage/CTASection";
import { HeroSection } from "@/components/modules/HomePage/HeroSection";
import { HowItWorks } from "@/components/modules/HomePage/HowItWorks";
import { Services } from "@/components/modules/HomePage/services";
import { Testimonials } from "@/components/modules/HomePage/Testimonials";


export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <HowItWorks/>
     <Services/>
      <Testimonials/>
      <CTASection/>

    </div>
  );
}
