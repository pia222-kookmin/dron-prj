"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, IMAGES } from "@/constants";

interface HeroSectionProps {
  lang?: "ko" | "en";
}

export default function HeroSection({ lang = "ko" }: HeroSectionProps) {
  const content = HERO_CONTENT[lang] || HERO_CONTENT.ko;

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background image & grid */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img
          src="/images/company_logo.png"
          alt="Company Logo Background"
          className="w-[85%] h-[85%] object-contain select-none"
          style={{ opacity: 0.05 }}
        />
        <div
          className="absolute inset-0 bg-tech-grid opacity-85"
        />
      </div>

      {/* 애니메이션 배경 요소 (라이트 테마에 맞춤) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#005FAD]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 메인 콘텐츠 (이전의 중앙 정렬 레이아웃 그대로 유지) */}
      <div className="section-container relative z-10 text-center flex flex-col items-center justify-center">
        {/* 로고 메인 정면 배치 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white border border-gray-150 rounded-sm flex items-center justify-center p-3.5 shadow-sm">
            <img src={IMAGES.logo} alt="OTTOMOBI Logo" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-none text-[#0c0c0c] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {content.title}
          </h1>
        </motion.div>

        {/* 서브타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p 
            className="text-xl md:text-3xl font-bold tracking-[0.25em] mb-3 text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {content.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ backgroundColor: "#005FAD", opacity: 0.3 }} />
            <div className="h-2 w-2 rotate-45" style={{ backgroundColor: "#005FAD" }} />
            <div className="h-px w-12" style={{ backgroundColor: "#005FAD", opacity: 0.3 }} />
          </div>
        </motion.div>

        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-500 text-lg md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed px-4 font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {content.description}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#products" className="btn-cyber-filled text-lg px-8 py-3 rounded-sm shadow-sm">
            {content.cta.primary}
          </a>
          <a href="#contact" className="btn-cyber text-lg px-8 py-3 rounded-sm">
            {content.cta.secondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
