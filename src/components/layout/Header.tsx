"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";

interface HeaderProps {
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentNav = NAV_LINKS[lang] || NAV_LINKS.ko;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50"
    >
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-tech flex items-center justify-center group-hover:shadow-neon-blue transition-shadow">
              <span className="text-white font-display font-bold text-xl">
                DE
              </span>
            </div>
            <span className="font-display font-bold text-xl text-white hidden sm:block">
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* 네비게이션 & 언어 토글 */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {currentNav.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-base font-mono uppercase tracking-wider text-gray-400 hover:text-cyber-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* 언어 토글 버튼 (데스크톱) */}
            <motion.button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-3.5 py-1.5 rounded-tech text-xs font-mono font-bold tracking-widest border border-cyber-500/30 hover:border-cyber-500 text-cyber-400 hover:text-cyber-300 bg-cyber-500/5 hover:bg-cyber-500/15 focus:outline-none transition-all duration-300"
            >
              {lang === "ko" ? "EN" : "KO"}
            </motion.button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyber-400 hover:text-cyber-300 transition-colors focus:outline-none"
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
            className="md:hidden border-t border-dark-800 bg-dark-900/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-6 px-6">
              {currentNav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-mono uppercase tracking-wider text-gray-400 hover:text-cyber-400 transition-colors py-2 border-b border-dark-800/30"
                >
                  {link.label}
                </a>
              ))}
              
              {/* 모바일 언어 선택 버튼 */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-dark-800">
                <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                  {lang === "ko" ? "언어 설정" : "Language"}
                </span>
                <button
                  onClick={() => {
                    setLang(lang === "ko" ? "en" : "ko");
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-tech text-xs font-mono font-bold tracking-widest border border-cyber-500/30 text-cyber-400 bg-cyber-500/5 hover:bg-cyber-500/10 transition-all duration-300"
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
