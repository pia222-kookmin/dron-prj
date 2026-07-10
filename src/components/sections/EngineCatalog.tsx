"use client";

import { motion } from "framer-motion";
import { PRODUCTS_CONTENT } from "@/constants";
import type { Product } from "@/types";

interface EngineCatalogProps {
  lang?: "ko" | "en";
}

export default function EngineCatalog({ lang = "ko" }: EngineCatalogProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const t = PRODUCTS_CONTENT[lang] || PRODUCTS_CONTENT.ko;

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-white">
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
            {PRODUCTS_CONTENT.title}
          </h2>
          <p 
            className="text-xl md:text-2xl font-bold tracking-wider text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* 제품 그리드 (이전의 4열 그리드 배치 그대로 유지) */}
        <motion.div
          key={lang}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t.products.map((product: Product, index: number) => (
            <EngineCard key={product.name} product={product} index={index} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EngineCard({ product, index, lang }: { product: Product; index: number; lang: "ko" | "en" }) {
  // 카테고리별 스펙 라벨 동적 매핑
  const getSpecLabels = (category: string) => {
    if (lang === "en") {
      switch (category) {
        case "Engine":
        case "엔진":
          return { power: "Power", weight: "Weight", efficiency: "Displ." };
        case "Fuel Injector":
        case "연료분사부품":
          return { power: "Control", weight: "Design", efficiency: "Core Feature" };
        case "Ignition System":
        case "점화시스템":
          return { power: "Voltage", weight: "Feature", efficiency: "Startup" };
        case "Fuel System Parts":
        case "연료공급부품":
          return { power: "Mixture", weight: "Compat.", efficiency: "Method" };
        default:
          return { power: "Power", weight: "Weight", efficiency: "Feature" };
      }
    } else {
      switch (category) {
        case "Engine":
        case "엔진":
          return { power: "출력", weight: "중량", efficiency: "배기량" };
        case "Fuel Injector":
        case "연료분사부품":
          return { power: "제어 방식", weight: "디자인", efficiency: "핵심 기능" };
        case "Ignition System":
        case "점화시스템":
          return { power: "입력 전압", weight: "특징", efficiency: "시동 성능" };
        case "Fuel System Parts":
        case "연료공급부품":
          return { power: "혼합 제어", weight: "호환성", efficiency: "공급 방식" };
        default:
          return { power: "출력/전압", weight: "중량/형식", efficiency: "효율/기능" };
      }
    }
  };

  const labels = getSpecLabels(product.category);

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
      whileHover={{ y: -10 }}
      className="card-tech group relative flex flex-col justify-between h-full bg-white border border-black/[0.06] hover:border-[#005FAD]/25 rounded-sm shadow-sm"
    >
      <div>
        {/* 상단 라벨 */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            className="px-3.5 py-1 bg-[#e8f1fb] text-[#005FAD] border border-[#005FAD]/15 text-xs font-semibold uppercase tracking-wider rounded-sm"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {product.category}
          </span>
        </div>

        {/* 이미지 영역 */}
        <div className="relative h-56 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <motion.div
              className="relative z-10 text-4xl font-display font-bold text-slate-200"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.div>
          )}
        </div>

        {/* 콘텐츠 */}
        <div className="p-6">
          {/* 제품명 */}
          <h3 
            className="text-2xl font-bold text-[#0c0c0c] mb-3 group-hover:text-[#005FAD] transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {product.name}
          </h3>

          {/* 설명 */}
          <p className="text-slate-500 text-sm mb-5 leading-relaxed min-h-[50px] font-light">
            {product.description}
          </p>

          {/* 스펙 */}
          <div className="space-y-3 mb-2">
            <SpecItem label={labels.power} value={product.specs.power} />
            <SpecItem label={labels.weight} value={product.specs.weight} />
            <SpecItem label={labels.efficiency} value={product.specs.efficiency} />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        {/* CTA 버튼 */}
        <a href="#contact" className="block w-full text-center btn-cyber text-sm py-2.5 font-bold rounded-sm">
          {lang === "ko" ? "제품 문의하기" : "Inquire Product"}
        </a>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400 font-mono tracking-wider">
        {label}
      </span>
      <div className="flex-1 mx-2 border-b border-dashed border-gray-200" />
      <span className="text-[#005FAD] font-mono font-semibold">{value}</span>
    </div>
  );
}
