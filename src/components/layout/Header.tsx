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
  const [activeSection, setActiveSection] = useState("home");
  const currentNav = NAV_LINKS[lang] || NAV_LINKS.ko;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ["home", "about", "technology", "products", "rental", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded overflow-hidden flex items-center justify-center bg-white border border-gray-100 p-1 group-hover:shadow-sm transition-shadow">
              <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span 
              className="font-semibold text-sm tracking-widest uppercase text-[#0c0c0c] hidden sm:block"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* 네비게이션 & 언어 토글 */}
          <div className="flex items-center gap-8">
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center gap-8">
              {currentNav.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId || (sectionId === "technology" && activeSection === "about");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-200 relative py-1 font-display tracking-wide"
                    style={{
                      color: isActive ? "#005FAD" : "#4a4a4a",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ backgroundColor: "#005FAD" }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* 언어 & CTA 버튼 (데스크톱) */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "ko" ? "en" : "ko")}
                className="px-3 py-1.5 border border-black/10 hover:border-black/30 text-xs font-semibold text-[#4a4a4a] hover:text-[#0c0c0c] transition-all duration-200"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {lang === "ko" ? "EN" : "KO"}
              </button>
              <a
                href="#contact"
                className="text-sm px-4 py-2 font-semibold text-white bg-[#005FAD] transition-all duration-200 hover:bg-[#004f91]"
                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}
              >
                {lang === "ko" ? "문의하기" : "Inquire"}
              </a>
            </div>
          </div>

          {/* 모바일 메뉴 토글 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
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
