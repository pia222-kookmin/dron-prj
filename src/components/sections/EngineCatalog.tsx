"use client";

import { motion } from "framer-motion";
import { PRODUCTS_CONTENT } from "@/constants";
import type { Product } from "@/types";

export default function EngineCatalog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

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
          <h2 className="heading-tech text-5xl md:text-6xl mb-4">
            {PRODUCTS_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-lg font-mono uppercase tracking-wider">
            {PRODUCTS_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* 제품 그리드 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS_CONTENT.products.map((product: Product, index: number) => (
            <EngineCard key={product.name} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EngineCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
          },
        },
      }}
      whileHover={{ y: -10 }}
      className="card-tech group relative"
    >
      {/* 상단 라벨 */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-cyber-600/80 backdrop-blur-sm text-xs font-mono uppercase tracking-wider rounded-tech">
          {product.category}
        </span>
      </div>

      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-10" />
        <motion.div
          className="relative z-10 text-6xl font-display text-cyber-500/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {product.name.split("-")[0]}
        </motion.div>
        
        {/* 호버 글로우 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-500/0 via-cyber-500/5 to-cyber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 콘텐츠 */}
      <div className="p-6">
        {/* 제품명 */}
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          {product.name}
        </h3>

        {/* 설명 */}
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* 스펙 */}
        <div className="space-y-3 mb-6">
          <SpecItem label="출력" value={product.specs.power} />
          <SpecItem label="중량" value={product.specs.weight} />
          <SpecItem label="효율" value={product.specs.efficiency} />
        </div>

        {/* CTA 버튼 */}
        <button className="w-full btn-cyber text-xs">
          대여 문의하기
        </button>
      </div>

      {/* 카드 코너 데코레이션 */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-500/0 group-hover:border-cyber-500 transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-500/0 group-hover:border-cyber-500 transition-colors duration-300" />
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500 font-mono uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 mx-3 border-b border-dashed border-dark-600" />
      <span className="text-cyber-400 font-mono font-semibold">{value}</span>
    </div>
  );
}
