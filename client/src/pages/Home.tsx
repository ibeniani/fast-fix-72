/* ============================================================
   FAST FIX 72 — Home Page
   Style: Néon Urbain / Tech Sombre
   Sections: Hero → Services → Process → Pricing → About → Reviews → Contact → Footer
   ============================================================ */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0D1117" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
