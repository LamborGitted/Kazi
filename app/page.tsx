import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      {/* <SocialPreview /> */}
    </div>
  );
}
