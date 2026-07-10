"use client";

import { motion } from "framer-motion";
import { RENTAL_CONTENT } from "@/constants";
import type { RentalItem } from "@/types";

interface RentalSectionProps {
  lang?: "ko" | "en";
}

export default function RentalSection({ lang = "ko" }: RentalSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const t = RENTAL_CONTENT[lang] || RENTAL_CONTENT.ko;

  return (
    <section id="rental" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#f7f7f7" }}>
      {/* 배경 격자 */}
      <div className="absolute inset-0 bg-tech-grid opacity-85 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* 섹션 헤더 (이전의 중앙 정렬 레이아웃) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="heading-tech text-5xl md:text-6xl mb-6 text-[#0c0c0c]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {RENTAL_CONTENT.title}
          </h2>
          <p 
            className="text-xl md:text-2xl font-bold tracking-wider mb-6 text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>
          <p 
            className="text-slate-500 max-w-4xl mx-auto text-base md:text-lg leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.description}
          </p>
        </motion.div>

        {/* 장비 그리드 (이전의 4열 그리드 배치 그대로 유지) */}
        <motion.div
          key={lang}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t.items.map((item: RentalItem, index: number) => (
            <RentalCard key={item.name} item={item} index={index} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RentalCard({ item, index, lang }: { item: RentalItem; index: number; lang: "ko" | "en" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.05,
          },
        },
      }}
      whileHover={{ y: -8 }}
      className="card-tech relative flex flex-col justify-between h-full group bg-white border border-black/[0.06] hover:border-[#005FAD]/25 rounded-sm shadow-sm"
    >
      <div>
        {/* 이미지 영역 */}
        <div className="relative h-56 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // 이미지 없는 경우 플레이스홀더 (화이트 테마)
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-4">
              <svg
                className="w-12 h-12 text-[#005FAD]/20 mb-2 group-hover:text-[#005FAD]/40 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Specialized Hardware
              </span>
            </div>
          )}
        </div>

        {/* 바디 영역 */}
        <div className="p-6">
          {/* 카테고리 배지 */}
          <span 
            className="inline-block px-3 py-1 bg-[#e8f1fb] text-[#005FAD] border border-[#005FAD]/15 text-xs font-semibold uppercase tracking-widest rounded mb-3.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.category}
          </span>
          
          {/* 장비명 */}
          <h3 
            className="text-lg font-bold text-[#0c0c0c] mb-2.5 group-hover:text-[#005FAD] transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.name}
          </h3>

          {/* 설명 */}
          <p className="text-slate-500 text-sm leading-relaxed min-h-[50px] font-light">
            {item.description}
          </p>
        </div>
      </div>

      {/* CTA 영역 */}
      <div className="p-6 pt-0">
        <a
          href="#contact"
          className="block w-full text-center btn-cyber text-sm py-2.5 font-bold rounded-sm"
        >
          {lang === "ko" ? "대여 신청 및 문의" : "Inquire Rental"}
        </a>
      </div>
    </motion.div>
  );
}
