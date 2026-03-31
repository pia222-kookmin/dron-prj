"use client";

import { motion } from "framer-motion";
import { RENTAL_CONTENT } from "@/constants";
import type { RentalPlan } from "@/types";

export default function RentalSection() {
  return (
    <section id="rental" className="py-24 relative overflow-hidden">
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
            {RENTAL_CONTENT.title}
          </h2>
          <p className="text-cyber-400 text-lg font-mono uppercase tracking-wider mb-4">
            {RENTAL_CONTENT.subtitle}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {RENTAL_CONTENT.description}
          </p>
        </motion.div>

        {/* 요금제 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {RENTAL_CONTENT.plans.map((plan: RentalPlan, index: number) => (
            <RentalCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RentalCard({ plan, index }: { plan: RentalPlan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`card-tech relative ${
        plan.popular
          ? "border-cyber-500 shadow-neon-blue scale-105"
          : ""
      }`}
    >
      {/* 인기 배지 */}
      {plan.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-4 py-1 bg-gradient-to-r from-cyber-500 to-neon-purple text-white text-xs font-mono uppercase tracking-wider rounded-full shadow-neon-blue">
            인기
          </span>
        </div>
      )}

      <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
        {/* 플랜명 */}
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          {plan.name}
        </h3>

        {/* 기간 */}
        <p className="text-gray-500 font-mono text-sm uppercase tracking-wider mb-6">
          {plan.duration}
        </p>

        {/* 가격 */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-cyber-400">
              ₩{parseInt(plan.price).toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">/{plan.duration}</span>
          </div>
        </div>

        {/* 기능 목록 */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-cyber-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-400 text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA 버튼 */}
        <a
          href="#contact"
          className={`block w-full text-center ${
            plan.popular ? "btn-cyber-filled" : "btn-cyber"
          }`}
        >
          대여 신청
        </a>
      </div>
    </motion.div>
  );
}
