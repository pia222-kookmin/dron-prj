"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/constants";

export default function HeroSection() {
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
      <div className="section-container relative z-10 text-center">
        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-display font-bold mb-6 text-glow leading-none">
            {HERO_CONTENT.title}
          </h1>
        </motion.div>

        {/* 서브타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl md:text-3xl text-cyber-300 font-mono uppercase tracking-[0.3em] mb-2">
            {HERO_CONTENT.subtitle}
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
          className="text-gray-400 text-lg max-w-6xl mx-auto mb-12 leading-relaxed px-4"
        >
          {HERO_CONTENT.description}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#products" className="btn-cyber-filled">
            {HERO_CONTENT.cta.primary}
          </a>
          <a href="#contact" className="btn-cyber">
            {HERO_CONTENT.cta.secondary}
          </a>
        </motion.div>

        {/* 스크롤 인디케이터 - 숨김 */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-cyber-400"
          >
            <span className="text-xs uppercase tracking-wider font-mono">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div> */}
      </div>

      {/* 코너 데코레이션 */}
      <div className="corner-decoration corner-decoration--tl" />
      <div className="corner-decoration corner-decoration--tr" />
      <div className="corner-decoration corner-decoration--bl" />
      <div className="corner-decoration corner-decoration--br" />
    </section>
  );
}
