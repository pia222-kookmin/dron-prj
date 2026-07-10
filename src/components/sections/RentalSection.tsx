"use client";

import { motion } from "framer-motion";
import { RENTAL_CONTENT } from "@/constants";
import type { RentalItem } from "@/types";

interface RentalSectionProps {
  lang?: "ko" | "en";
}

export default function RentalSection({ lang = "ko" }: RentalSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const t = RENTAL_CONTENT[lang] || RENTAL_CONTENT.ko;

  return (
    <section id="rental" className="py-28" style={{ backgroundColor: "#f7f7f7" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
          >
            04 — {lang === "ko" ? "장비대여" : "RENTAL"}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Section Header (2 columns style) */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#0c0c0c",
                letterSpacing: "-0.03em",
              }}
            >
              {lang === "ko" ? (
                <>
                  연구·촬영·교육을 위한
                  <br />
                  <span style={{ color: "#005FAD" }}>장비 대여 서비스</span>
                </>
              ) : (
                <>
                  Equipment Rental for
                  <br />
                  <span style={{ color: "#005FAD" }}>Research, Shooting & Ed.</span>
                </>
              )}
            </motion.h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="leading-relaxed text-sm text-slate-500 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.description}
            </motion.p>
          </div>
        </div>

        {/* Equipment Grid (3 columns) */}
        <motion.div
          key={lang}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
        >
          {t.items.map((item: RentalItem, index: number) => (
            <RentalCard key={item.name} item={item} index={index} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RentalCard({ item, index, lang }: { item: RentalItem; index: number; lang: "ko" | "en" }) {
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
      className="group overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div>
        {/* Image container */}
        <div className="overflow-hidden bg-[#e8f1fb]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-44 flex flex-col items-center justify-center p-4 bg-slate-100">
              <svg className="w-12 h-12 text-[#005FAD]/20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Hardware</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-1">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase mb-2 block text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.category}
          </span>
          <h3
            className="font-bold text-base mb-2 text-[#0c0c0c] transition-colors group-hover:text-[#005FAD]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.name}
          </h3>
          <p className="text-xs leading-relaxed text-slate-500 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
            {item.description}
          </p>
        </div>
      </div>

      {/* Link to Contact */}
      <div className="px-6 pb-6">
        <a
          href="#contact"
          className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 text-[#005FAD] hover:text-[#004f91]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {lang === "ko" ? "대여 문의" : "Inquire Rental"}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
