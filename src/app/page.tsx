import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ResultsMarquee } from "@/components/ResultsMarquee";
import { WhyUs } from "@/components/WhyUs";
import { BusinessFlow } from "@/components/BusinessFlow";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        <Hero />
        <ResultsMarquee />
        <WhyUs />
        <BusinessFlow />
        <Work />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
