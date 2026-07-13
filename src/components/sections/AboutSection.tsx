"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";

interface AboutSectionProps {
  lang?: "ko" | "en";
}

export default function AboutSection({ lang = "ko" }: AboutSectionProps) {
  const t = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ko;

  return (
    <section id="about" className="py-10 relative overflow-hidden" style={{ backgroundColor: "#f7f7f7" }}>
      {/* 배경 격자 */}
      <div className="absolute inset-0 bg-tech-grid opacity-85 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* 섹션 헤더 (이전의 중앙 정렬 레이아웃) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 
            className="heading-tech text-4xl md:text-5xl mb-3 text-[#0c0c0c]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {ABOUT_CONTENT.title}
          </h2>
          <p 
            className="text-lg md:text-xl font-bold tracking-wider mb-4 text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>

          {/* 단일 언어 소개글 영역 */}
          <div className="max-w-4xl mx-auto border-t border-b border-black/10 py-4 my-3">
            <p 
              className="text-slate-600 text-base md:text-lg leading-relaxed text-center font-light px-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.description}
            </p>
          </div>
        </motion.div>

        {/* 장비/자산 그리드 (4열 레이아웃 그대로 유지) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-4">
            <h3 
              className="text-2xl font-bold text-[#0c0c0c] tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {lang === "ko" ? "실험 장비 및 자산" : "Test Equipment & Assets"}
            </h3>
            <div className="h-0.5 w-16 bg-[#005FAD] mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-tech overflow-hidden group relative flex flex-col justify-between rounded-sm shadow-sm"
              >
                {/* 이미지 영역 */}
                <div className="relative h-32 w-full bg-slate-50 overflow-hidden border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#005FAD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 정보 영역 */}
                <div className="p-5 text-center bg-white flex-1 flex flex-col justify-center">
                  <div 
                    className="text-xs font-semibold tracking-wider uppercase mb-1.5 text-[#005FAD]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.label}
                  </div>
                  <h4 
                    className="text-base font-bold text-[#0c0c0c] group-hover:text-[#005FAD] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    &lt; {item.name} &gt;
                  </h4>
                </div>
                
                {/* 하단 블루 글로우 라인 */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#005FAD]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
