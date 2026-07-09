"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";
import Image from "next/image";

interface AboutSectionProps {
  lang?: "ko" | "en";
}

export default function AboutSection({ lang = "ko" }: AboutSectionProps) {
  const t = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ko;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-tech-grid opacity-20" />

      <div className="section-container relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-tech text-6xl md:text-7xl mb-6">
            {ABOUT_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-xl md:text-2xl font-mono uppercase tracking-wider mb-8">
            {t.subtitle}
          </p>

          {/* 단일 언어 소개글 영역 */}
          <div className="max-w-4xl mx-auto border-t border-b border-dark-700 py-12 my-8">
            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed text-center font-light px-4">
              {t.description}
            </p>
          </div>
        </motion.div>

        {/* 장비/자산 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-display font-semibold text-white tracking-widest uppercase mb-3">
              {lang === "ko" ? "실험 장비 및 자산" : "Test Equipment & Assets"}
            </h3>
            <div className="h-0.5 w-16 bg-cyber-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-tech overflow-hidden group relative"
              >
                {/* 이미지 영역 */}
                <div className="relative h-48 w-full bg-dark-800 overflow-hidden border-b border-dark-700">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 정보 영역 */}
                <div className="p-5 text-center">
                  <div className="text-sm text-cyber-400 font-mono tracking-widest uppercase mb-1.5">
                    {item.label}
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyber-300 transition-colors">
                    &lt; {item.name} &gt;
                  </h4>
                </div>
                
                {/* 글로우 라인 */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
