"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, IMAGES } from "@/constants";

interface HeroSectionProps {
  lang?: "ko" | "en";
}

export default function HeroSection({ lang = "ko" }: HeroSectionProps) {
  const content = HERO_CONTENT[lang] || HERO_CONTENT.ko;

  const stats = lang === "ko" ? [
    { value: "20+", label: "년 기술 경험" },
    { value: "50+", label: "개 특허 보유" },
    { value: "300+", label: "개 납품 실적" },
    { value: "15+", label: "개국 수출" },
  ] : [
    { value: "20+", label: "Years Tech Experience" },
    { value: "50+", label: "Patents Held" },
    { value: "300+", label: "Engines Delivered" },
    { value: "15+", label: "Countries Exported" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?w=1600&h=900&fit=crop&auto=format"
          alt="UAV Flight Background"
          className="w-full h-full object-cover"
          style={{ opacity: 0.06 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,95,173,0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Accent tech grid lines */}
      <div className="absolute inset-0 z-0 bg-tech-grid opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand, Title, Description, buttons */}
          <div className="lg:col-span-7">
            {/* Logo and Subtitle eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3.5 mb-8"
            >
              {/* 로고 메인 정면 배치 */}
              <div className="w-10 h-10 bg-white border border-gray-200/80 rounded-sm flex items-center justify-center p-1.5 shadow-sm">
                <img src={IMAGES.logo} alt="OTTOMOBI Logo" className="w-full h-full object-contain" />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5"
                style={{
                  backgroundColor: "#e8f1fb",
                  color: "#005FAD",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {content.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold leading-none tracking-tight mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                color: "#0c0c0c",
                letterSpacing: "-0.03em",
              }}
            >
              {content.title}
              <br />
              <span style={{ color: "#005FAD" }}>Technology</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed mb-10 max-w-xl text-slate-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {content.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#products"
                className="btn-cyber-filled px-6 py-3.5"
                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}
              >
                {content.cta.primary}
              </a>
              <a
                href="#contact"
                className="btn-cyber px-6 py-3.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {content.cta.secondary}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-px"
              style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
            >
              {stats.map((s, idx) => (
                <div
                  key={s.label}
                  className="p-8 flex flex-col gap-1.5 transition-transform duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <span
                    className="font-bold"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      color: "#005FAD",
                      fontFamily: "'Outfit', sans-serif",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-sm font-medium text-slate-500"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom border rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
      />
    </section>
  );
}
