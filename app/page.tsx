import { AICoachComingSoon } from "@/components/AICoachComingSoon";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Plans } from "@/components/Plans";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { WhatItDoes } from "@/components/WhatItDoes";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatItDoes />
        <AICoachComingSoon />
        <Plans />
        <HowItWorks />
        <Testimonials />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
