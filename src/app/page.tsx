import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  TechnologySection,
  EngineCatalog,
  RentalSection,
  InquiryForm,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <TechnologySection />
        <EngineCatalog />
        <RentalSection />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
