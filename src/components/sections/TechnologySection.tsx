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
    icon: string;
  }[];
  tags: string[];
}

interface TechnologySectionProps {
  lang?: "ko" | "en";
}

export default function TechnologySection({ lang = "ko" }: TechnologySectionProps) {
  const t = TECHNOLOGY_CONTENT[lang] || TECHNOLOGY_CONTENT.ko;

  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-dark-950">
      {/* 배경 그리드 및 그라디언트 */}
      <div className="absolute inset-0 bg-tech-grid opacity-15" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />

      <div className="section-container relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="heading-tech text-6xl md:text-7xl mb-6">
            {TECHNOLOGY_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-2xl font-mono uppercase tracking-wider">
            {t.subtitle}
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-cyber-500 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* 3개 파트 레이아웃 */}
        <div className="space-y-36">
          {t.parts.map((part: TechPart, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={part.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* 이미지 영역 (홀수/짝수 인덱스에 따라 배치 교차) */}
                <div
                  className={`col-span-1 lg:col-span-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative group w-full max-w-[450px] mx-auto h-[280px] md:h-[350px]"
                  >
                    {/* 첫 번째 이미지 (뒤쪽 배치) */}
                    <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-tech overflow-hidden border border-dark-750 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 z-0">
                      <img
                        src={part.images[0]}
                        alt={`${part.title} Image 1`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* 두 번째 이미지 (앞쪽 배치, 테두리에 사이버 네온 효과) */}
                    <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-tech overflow-hidden border-2 border-cyber-500/40 shadow-neon-blue transition-all duration-500 group-hover:translate-y-2 group-hover:-translate-x-2 z-10">
                      <img
                        src={part.images[1]}
                        alt={`${part.title} Image 2`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent" />
                    </div>

                    {/* 배경 백글로우 효과 */}
                    <div className="absolute -inset-4 bg-cyber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </motion.div>
                </div>

                {/* 기술 소개 텍스트 영역 */}
                <div
                  className={`col-span-1 lg:col-span-7 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                    {/* 파트 제목 */}
                    <div>
                      <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                        {part.title}
                      </h3>
                    </div>

                    {/* 파트 내 2개 기능 리스트 */}
                    <div className="space-y-8">
                      {part.features.map((feature) => (
                        <div
                          key={feature.title}
                          className="flex gap-5 p-6 rounded-tech border border-dark-800 bg-dark-900/40 backdrop-blur-sm hover:bg-dark-900/70 hover:border-dark-700 transition-all duration-300 group/item"
                        >
                          {/* 아이콘 */}
                          <div className="w-14 h-14 bg-gradient-to-br from-cyber-600 to-neon-purple rounded-tech flex items-center justify-center flex-shrink-0 group-hover/item:shadow-neon-blue transition-all">
                            <TechIcon icon={feature.icon} />
                          </div>

                          {/* 텍스트 정보 */}
                          <div className="space-y-3">
                            <h4 className="text-2xl font-display font-bold text-white group-hover/item:text-cyber-300 transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 기술 키워드 태그 */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {part.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 text-sm font-mono tracking-wider border border-cyber-500/20 bg-cyber-500/5 text-cyber-400 rounded-tech"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function TechIcon({ icon }: { icon: string }) {
  const iconClass = "w-6 h-6 text-white";

  switch (icon) {
    case "efi":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "test":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "dynamo":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "visual":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    case "drone":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "education":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}
