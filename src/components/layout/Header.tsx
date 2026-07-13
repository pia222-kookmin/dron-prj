"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG, IMAGES } from "@/constants";

interface HeaderProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentNav = NAV_LINKS[lang] || NAV_LINKS.ko;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav className="section-container py-1.5">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center group-hover:opacity-80 transition-opacity">
              <img
                src={IMAGES.logo}
                alt="Logo"
                className="object-contain"
                style={{
                  width: 64,
                  height: 64,
                  mixBlendMode: "multiply",
                  filter: "contrast(1.3)",
                }}
              />
            </div>
            <span className="font-display font-bold text-2xl text-[#0c0c0c] hidden sm:block">
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* 네비게이션 & 언어 토글 */}
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10">
              {currentNav.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg font-display font-semibold text-slate-700 hover:text-[#005FAD] transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#005FAD] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* 언어 토글 버튼 (데스크톱) */}
            <motion.button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 py-2 border border-black/10 hover:border-black/30 text-sm font-bold text-[#4a4a4a] hover:text-[#0c0c0c] transition-all duration-200 font-display"
            >
              {lang === "ko" ? "EN" : "KO"}
            </motion.button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-150 bg-white overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-6 px-6">
              {currentNav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-[#005FAD] transition-colors py-2 border-b border-gray-50"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
              
              {/* 모바일 언어 선택 버튼 */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {lang === "ko" ? "언어 설정" : "Language"}
                </span>
                <button
                  onClick={() => {
                    setLang(lang === "ko" ? "en" : "ko");
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 border border-black/10 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all duration-300"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {lang === "ko" ? "ENGLISH" : "한국어"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
