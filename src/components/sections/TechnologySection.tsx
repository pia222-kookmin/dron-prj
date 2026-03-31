"use client";

import { motion } from "framer-motion";
import { TECHNOLOGY_CONTENT } from "@/constants";
import type { Feature } from "@/types";

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24 relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-tech-grid opacity-20" />

      {/* 글로우 효과 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-tech text-5xl md:text-6xl mb-4">
            {TECHNOLOGY_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-lg font-mono uppercase tracking-wider">
            {TECHNOLOGY_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* 기술 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECHNOLOGY_CONTENT.features.map((feature: Feature, index: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-tech p-8 group"
            >
              {/* 아이콘 */}
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-cyber-600 to-neon-purple rounded-tech flex items-center justify-center group-hover:shadow-neon-blue transition-shadow">
                <TechIcon icon={feature.icon} />
              </div>

              {/* 제목 */}
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* 하단 라인 */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-cyber-500 to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechIcon({ icon }: { icon: string }) {
  const iconClass = "w-8 h-8 text-white";

  switch (icon) {
    case "hybrid":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "ai":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "carbon":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case "diagnostic":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}
