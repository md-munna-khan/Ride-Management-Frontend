import CallToAction from "@/components/modules/HomePage/CallToAction";
import Features from "@/components/modules/HomePage/Features";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import HowItWorks from "@/components/modules/HomePage/HowItWorks";
import Testimonials from "@/components/modules/HomePage/Testimonials";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <HowItWorks/>
      <Features/>
      <Testimonials/>
      <CallToAction/>

    </div>
  );
}
