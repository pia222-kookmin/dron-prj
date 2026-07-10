"use client";

import { useState } from "react";
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
  const [lang, setLang] = useState<"ko" | "en">("ko");

  return (
    <div className="theme-light bg-white min-h-screen text-slate-900">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <HeroSection lang={lang} />
        <AboutSection lang={lang} />
        <TechnologySection lang={lang} />
        <EngineCatalog lang={lang} />
        <RentalSection lang={lang} />
        <InquiryForm lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
