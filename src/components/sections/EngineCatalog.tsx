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
    <section id="products" className="py-24 relative overflow-hidden">
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
            {PRODUCTS_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-2xl font-mono uppercase tracking-wider">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 제품 그리드 */}
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
          return { power: "Power", weight: "Weight", efficiency: "Displ." };
        case "Fuel Injector":
          return { power: "Control", weight: "Design", efficiency: "Core Feature" };
        case "Ignition System":
          return { power: "Voltage", weight: "Feature", efficiency: "Startup" };
        case "Fuel System Parts":
          return { power: "Mixture", weight: "Compat.", efficiency: "Method" };
        default:
          return { power: "Power", weight: "Weight", efficiency: "Feature" };
      }
    } else {
      switch (category) {
        case "엔진":
          return { power: "출력", weight: "중량", efficiency: "배기량" };
        case "연료분사부품":
          return { power: "제어 방식", weight: "디자인", efficiency: "핵심 기능" };
        case "점화시스템":
          return { power: "입력 전압", weight: "특징", efficiency: "시동 성능" };
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
      className="card-tech group relative flex flex-col justify-between h-full"
    >
      <div>
        {/* 상단 라벨 */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3.5 py-1 bg-cyber-600/80 backdrop-blur-sm text-sm font-mono uppercase tracking-wider rounded-tech border border-cyber-500/30">
            {product.category}
          </span>
        </div>

        {/* 이미지 영역 */}
        <div className="relative h-56 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center overflow-hidden border-b border-dark-700">
          <div className="absolute inset-0 bg-tech-grid opacity-10" />
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <motion.div
              className="relative z-10 text-4xl font-display text-cyber-500/20"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.div>
          )}
          
          {/* 호버 글로우 효과 */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-500/0 via-cyber-500/5 to-cyber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* 콘텐츠 */}
        <div className="p-6">
          {/* 제품명 */}
          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-cyber-300 transition-colors">
            {product.name}
          </h3>

          {/* 설명 */}
          <p className="text-gray-400 text-sm mb-5 leading-relaxed min-h-[50px]">
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
        <a href="#contact" className="block w-full text-center btn-cyber text-sm py-2.5 font-bold">
          {lang === "ko" ? "제품 문의하기" : "Inquire Product"}
        </a>
      </div>

      {/* 카드 코너 데코레이션 */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyber-500/0 group-hover:border-cyber-500 transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyber-500/0 group-hover:border-cyber-500 transition-colors duration-300" />
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500 font-mono tracking-wider">
        {label}
      </span>
      <div className="flex-1 mx-2 border-b border-dashed border-dark-600" />
      <span className="text-cyber-400 font-mono font-semibold">{value}</span>
    </div>
  );
}
