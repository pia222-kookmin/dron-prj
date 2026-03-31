"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
            {ABOUT_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-lg font-mono uppercase tracking-wider mb-4">
            {ABOUT_CONTENT.subtitle}
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {ABOUT_CONTENT.description}
          </p>
        </motion.div>

        {/* 통계 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {ABOUT_CONTENT.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-tech p-6 text-center group"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-cyber-400 mb-2 group-hover:text-glow transition-all">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
