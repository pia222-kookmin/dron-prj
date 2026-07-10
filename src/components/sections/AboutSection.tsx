"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";

interface AboutSectionProps {
  lang?: "ko" | "en";
}

export default function AboutSection({ lang = "ko" }: AboutSectionProps) {
  const t = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ko;

  // Find the first equipment image to use as the hero about image
  const heroImage = t.equipment[0]?.image || "/images/about/dle_120.jpeg";

  return (
    <section id="about" className="py-28" style={{ backgroundColor: "#f7f7f7" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
          >
            01 — {lang === "ko" ? "회사소개" : "ABOUT"}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Headline and Description */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                color: "#0c0c0c",
                letterSpacing: "-0.03em",
              }}
            >
              {lang === "ko" ? (
                <>
                  기술이 하늘을
                  <br />
                  <span style={{ color: "#005FAD" }}>지배합니다</span>
                </>
              ) : (
                <>
                  Technology Paves
                  <br />
                  <span style={{ color: "#005FAD" }}>The Future Sky</span>
                </>
              )}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-[#5a5a5a]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.025rem", lineHeight: "1.7" }}
            >
              <p className="font-semibold text-[#0c0c0c]">{t.subtitle}</p>
              <p className="font-light">{t.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 text-[#005FAD] hover:text-[#004f91]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {lang === "ko" ? "기술 문의하기" : "Inquire Technology"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Image & Assets Grid */}
          <div className="lg:col-span-7">
            {/* Hero About Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 overflow-hidden rounded-sm border border-black/5"
            >
              <img
                src={heroImage}
                alt="UAV Technology Lab"
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </motion.div>

            {/* Equipment Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="text-left mb-6">
                <h3
                  className="font-semibold text-sm tracking-wider text-[#0c0c0c] uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {lang === "ko" ? "실험 장비 및 자산" : "Test Equipment & Assets"}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {t.equipment.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 border border-black/10 hover:border-[#005FAD]/30 bg-white transition-all duration-200 flex flex-col group rounded-sm shadow-sm"
                  >
                    <div className="relative h-32 w-full bg-slate-50 overflow-hidden mb-3.5 border-b border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span 
                      className="text-[10px] font-semibold text-[#005FAD] block mb-1" 
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.label}
                    </span>
                    <h4 
                      className="font-bold text-sm text-[#0c0c0c] transition-colors group-hover:text-[#005FAD]" 
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.name}
                    </h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
