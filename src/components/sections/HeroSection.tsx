"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { HERO_CONTENT } from "@/constants";
import WhiteBgRemovedImage from "@/components/ui/WhiteBgRemovedImage";

interface HeroSectionProps {
  lang?: "ko" | "en";
}

export default function HeroSection({ lang = "ko" }: HeroSectionProps) {
  const content = HERO_CONTENT[lang] || HERO_CONTENT.ko;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 파티클 캔버스 효과
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        decay: Math.random() * 0.003 + 0.001,
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.3) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,160,255,${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);


  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#050a12" }}
    >
      {/* ── 파티클 캔버스 ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* ── 방사형 글로우 배경 ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,95,173,0.18) 0%, rgba(0,30,70,0.10) 50%, transparent 80%)",
        }}
      />

      {/* ── 테크 그리드 ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,95,173,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,95,173,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── 대형 로고 배경 워터마크 ── */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative flex items-center justify-center w-full h-full"
        >
          {/* 로고 뒤 글로우 링 */}
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "min(90vw, 860px)",
              height: "min(90vw, 860px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,95,173,0.22) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* 로고 이미지 — Canvas로 흰 배경 제거 + 애니메이션 */}
          <motion.div
            animate={{ rotate: [0, 0.8, -0.8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{
              width: "min(95vw, 900px)",
              filter:
                "drop-shadow(0 0 80px rgba(60,140,255,0.45)) drop-shadow(0 0 35px rgba(60,140,255,0.3))",
              opacity: 0.18,
            }}
          >
            <WhiteBgRemovedImage
              src="/images/company_logo.png"
              alt="OTTOMOBI Logo Background"
              threshold={200}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "invert(1) brightness(0.85) sepia(0.3) hue-rotate(190deg) saturate(2)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="flex flex-col items-center text-center">



          {/* 로고 포그라운드 (중형) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="mb-5"
          >
            <WhiteBgRemovedImage
              src="/images/company_logo.png"
              alt="OTTOMOBI"
              threshold={210}
              style={{
                width: "min(88vw, 720px)",
                maxHeight: "55vh",
                height: "auto",
                display: "block",
                objectFit: "contain",
                filter:
                  "invert(1) brightness(1.0) sepia(0.4) hue-rotate(185deg) saturate(1.8) drop-shadow(0 0 50px rgba(100,180,255,0.8)) drop-shadow(0 4px 30px rgba(0,95,173,0.6))",
              }}
            />
          </motion.div>



          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#products"
              className="group relative px-8 py-3.5 font-semibold text-sm transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.04em",
                background: "linear-gradient(135deg, #005FAD 0%, #0077d8 100%)",
                color: "#fff",
                border: "1px solid rgba(0,150,255,0.4)",
                boxShadow:
                  "0 0 20px rgba(0,95,173,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              <span className="relative z-10">{content.cta.primary}</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 font-semibold text-sm transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(126,184,247,0.4)";
                (e.currentTarget as HTMLElement).style.color = "#7eb8f7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
            >
              {content.cta.secondary}
            </a>
          </motion.div>


        </div>
      </div>

      {/* ── 하단 스크롤 인디케이터 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Outfit', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 32,
            background:
              "linear-gradient(to bottom, rgba(126,184,247,0.7), transparent)",
          }}
        />
      </motion.div>

      {/* ── 하단 경계선 ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,95,173,0.4), transparent)",
        }}
      />
    </section>
  );
}
