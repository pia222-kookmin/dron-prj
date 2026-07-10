"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/constants";

interface HeroSectionProps {
  lang?: "ko" | "en";
}

export default function HeroSection({ lang = "ko" }: HeroSectionProps) {
  const content = HERO_CONTENT[lang] || HERO_CONTENT.ko;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-800" />
      
      {/* 그리드 배경 */}
      <div className="absolute inset-0 bg-tech-grid opacity-30" />

      {/* 애니메이션 배경 요소 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
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

      {/* 메인 콘텐츠 */}
      <div className="section-container relative z-10 text-center flex flex-col items-center justify-center">
        {/* 로고 메인 정면 배치 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img src="/images/logo.png" alt="OTTOMOBI Logo" className="h-28 md:h-36 object-contain" />
        </motion.div>

        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-glow leading-none">
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
          <p className="text-2xl md:text-4xl text-cyber-300 font-mono uppercase tracking-[0.3em] mb-2">
            {content.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyber-500" />
            <div className="h-2 w-2 bg-cyber-500 rotate-45" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyber-500" />
          </div>
        </motion.div>

        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-xl md:text-2xl max-w-6xl mx-auto mb-12 leading-relaxed px-4"
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
          <a href="#products" className="btn-cyber-filled text-lg px-8 py-3">
            {content.cta.primary}
          </a>
          <a href="#contact" className="btn-cyber text-lg px-8 py-3">
            {content.cta.secondary}
          </a>
        </motion.div>
      </div>

      {/* 코너 데코레이션 */}
      <div className="corner-decoration corner-decoration--tl" />
      <div className="corner-decoration corner-decoration--tr" />
      <div className="corner-decoration corner-decoration--bl" />
      <div className="corner-decoration corner-decoration--br" />
    </section>
  );
}
