"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS_CONTENT } from "@/constants";
import type { Product } from "@/types";

interface EngineCatalogProps {
  lang?: "ko" | "en";
}

export default function EngineCatalog({ lang = "ko" }: EngineCatalogProps) {
  const t = PRODUCTS_CONTENT[lang] || PRODUCTS_CONTENT.ko;
  const [activeProduct, setActiveProduct] = useState(0);
  const products = t.products || [];

  // Helper to determine spec labels based on product category & language
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

  const currentProduct = products[activeProduct];
  const labels = currentProduct ? getSpecLabels(currentProduct.category) : { power: "Power", weight: "Weight", efficiency: "Efficiency" };

  return (
    <section id="products" className="py-28" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
          >
            03 — {lang === "ko" ? "제품" : "PRODUCTS"}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Heading, description, selector */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold leading-tight mb-4"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#0c0c0c",
                letterSpacing: "-0.03em",
              }}
            >
              {lang === "ko" ? (
                <>
                  검증된
                  <br />
                  <span style={{ color: "#005FAD" }}>추진 솔루션</span>
                </>
              ) : (
                <>
                  Proven
                  <br />
                  <span style={{ color: "#005FAD" }}>Propulsion Solutions</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm leading-relaxed text-slate-500 mb-8 max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.subtitle}
            </motion.p>

            {/* Vertical list selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-1 border-t border-gray-100 pt-4"
            >
              {products.map((product: Product, i: number) => (
                <button
                  key={product.name}
                  onClick={() => setActiveProduct(i)}
                  className="flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 border-l-4 rounded-sm"
                  style={{
                    backgroundColor: activeProduct === i ? "#005FAD" : "transparent",
                    color: activeProduct === i ? "#ffffff" : "#4a4a4a",
                    borderLeftColor: activeProduct === i ? "#005FAD" : "transparent",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  <span>{product.name}</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-sm font-mono tracking-wider"
                    style={{
                      backgroundColor: activeProduct === i ? "rgba(255,255,255,0.2)" : "#f0f0f0",
                      color: activeProduct === i ? "#ffffff" : "#666",
                    }}
                  >
                    {product.category}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Dynamic Detail Cards */}
          <div className="lg:col-span-8">
            {currentProduct && (
              <motion.div
                key={currentProduct.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-0 border border-black/10 rounded-sm overflow-hidden shadow-sm bg-white"
              >
                {/* Image Section */}
                <div className="overflow-hidden bg-slate-50 relative h-80 flex items-center justify-center border-b border-black/5">
                  {currentProduct.image ? (
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-300 font-display text-2xl font-bold">{currentProduct.name}</span>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <span
                        className="text-xs font-semibold tracking-widest uppercase mb-1 block text-[#005FAD]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {currentProduct.category}
                      </span>
                      <h3
                        className="font-bold text-2xl md:text-3xl text-[#0c0c0c] tracking-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {currentProduct.name}
                      </h3>
                    </div>
                    
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 bg-[#005FAD] text-white hover:bg-[#004f91] transition-all rounded-sm shadow-sm"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {lang === "ko" ? "견적 문의" : "Quote Request"}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  <p 
                    className="leading-relaxed mb-8 text-slate-600 text-sm font-light"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {currentProduct.description}
                  </p>

                  {/* Specs horizontal grid */}
                  <div className="flex flex-wrap gap-2.5 pt-4 border-t border-gray-50">
                    <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 font-mono">
                      {labels.power}: {currentProduct.specs.power}
                    </span>
                    <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 font-mono">
                      {labels.weight}: {currentProduct.specs.weight}
                    </span>
                    <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 font-mono">
                      {labels.efficiency}: {currentProduct.specs.efficiency}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
