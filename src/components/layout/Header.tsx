"use client";

import { motion } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";

export default function Header() {
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

          {/* 네비게이션 */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-sm font-mono uppercase tracking-wider text-gray-400 hover:text-cyber-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden p-2 text-cyber-400 hover:text-cyber-300 transition-colors">
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
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
