import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { MenuSection } from "@/components/home/MenuSection";
import { GallerySection } from "@/components/home/GallerySection";
import { NatureSection } from "@/components/home/NatureSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
      <main className="min-h-screen">
          <HeroSection />
          <FeaturesSection />
          <GallerySection />
          <MenuSection />
          <NatureSection />
          {/* <ProcessSection /> */}
          <ContactSection />
      </main>
  );
}