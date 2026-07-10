"use client";

import { motion } from "framer-motion";
import { TECHNOLOGY_CONTENT } from "@/constants";

interface TechPart {
  id: string;
  title: string;
  images: string[];
  features: {
    title: string;
    description: string;
  }[];
  tags: string[];
}

interface TechnologySectionProps {
  lang?: "ko" | "en";
}

export default function TechnologySection({ lang = "ko" }: TechnologySectionProps) {
  const t = TECHNOLOGY_CONTENT[lang] || TECHNOLOGY_CONTENT.ko;

  const emojis = ["⚙️", "📊", "🔬", "🛡️"];

  return (
    <section id="technology" className="py-28" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
          >
            02 — {lang === "ko" ? "핵심기술" : "TECHNOLOGY"}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#0c0c0c",
                letterSpacing: "-0.03em",
              }}
            >
              {lang === "ko" ? (
                <>
                  정밀 설계와
                  <br />
                  <span style={{ color: "#005FAD" }}>고속 성능 검증</span>
                </>
              ) : (
                <>
                  Precision Design &
                  <br />
                  <span style={{ color: "#005FAD" }}>High-Speed Verification</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm leading-relaxed text-slate-500 mb-8 max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.subtitle}
              <br /><br />
              {lang === "ko"
                ? "CFD 가상 연소 시뮬레이션부터 실시간 동력계 시험, 초고속 분무 거동 가시화에 이르기까지 무인 추진체 분야의 세계 일류 표준을 추구합니다."
                : "From CFD simulation to real-time dynamometer tests and ultra-high-speed spray visualization, we pursue global standards in UAV propulsion systems."}
            </motion.p>
          </div>

          {/* Right Column: Capabilities 2x2 Grid */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {t.parts.map((part: TechPart, idx: number) => (
                <div
                  key={part.id}
                  className="p-6 border border-black/10 hover:border-[#005FAD]/30 bg-white transition-all duration-200 flex flex-col rounded-sm shadow-sm group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{emojis[idx % emojis.length]}</span>
                    <h3
                      className="font-bold text-base text-[#0c0c0c] transition-colors group-hover:text-[#005FAD]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {part.title}
                    </h3>
                  </div>

                  {/* Tech Part First Image */}
                  {part.images && part.images[0] && (
                    <div className="h-32 w-full overflow-hidden mb-4 rounded-sm border border-gray-100 bg-slate-50">
                      <img
                        src={part.images[0]}
                        alt={part.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-4 flex-1">
                    {part.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs">
                        <span className="font-semibold text-slate-800 block mb-0.5">{feat.title}</span>
                        <p className="text-slate-500 font-light leading-relaxed">{feat.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-gray-100">
                    {part.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
