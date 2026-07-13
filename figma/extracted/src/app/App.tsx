import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronRight, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const NAV_LINKS = [
  { label: "홈", href: "#home" },
  { label: "회사소개", href: "#about" },
  { label: "제품", href: "#products" },
  { label: "장비대여", href: "#rental" },
  { label: "문의", href: "#contact" },
];

const STATS = [
  { value: "20+", label: "년 기술 경험" },
  { value: "50+", label: "개 특허 보유" },
  { value: "300+", label: "개 납품 실적" },
  { value: "15+", label: "개국 수출" },
];

const PRODUCTS = [
  {
    id: "dle-30",
    name: "DLE-30cc",
    category: "가솔린 엔진",
    desc: "소형 UAV용 30cc 단기통 가솔린 엔진. 경량·고출력 설계로 장거리 비행에 최적화.",
    specs: ["출력: 3.0HP", "무게: 680g", "연료: 가솔린"],
    img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "dle-60",
    name: "DLE-60cc",
    category: "가솔린 엔진",
    desc: "중형 드론 플랫폼용 60cc 수평 대향형 2기통 엔진. 안정적인 진동 특성.",
    specs: ["출력: 6.2HP", "무게: 1.2kg", "연료: 가솔린"],
    img: "https://images.unsplash.com/photo-1514598800938-f7125ea1aa1c?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "dle-120",
    name: "DLE-120cc",
    category: "가솔린 엔진",
    desc: "대형 멀티콥터·VTOL용 120cc 4기통 가솔린 엔진. 장시간 임무 수행 설계.",
    specs: ["출력: 14HP", "무게: 2.8kg", "연료: 가솔린"],
    img: "https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "dle-222",
    name: "DLE-222cc",
    category: "가솔린 엔진",
    desc: "최대급 페이로드 탑재 대형 드론용 222cc 플랫-6 엔진. 방위·산업용.",
    specs: ["출력: 26HP", "무게: 5.6kg", "연료: 가솔린"],
    img: "https://images.unsplash.com/photo-1588495077262-e41593eb23c8?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "fuel-injector",
    name: "직접 분사식 인젝터",
    category: "연료 시스템",
    desc: "드론 엔진 전용 고압 직접 분사 인젝터. 연비 향상 및 배기가스 저감.",
    specs: ["압력: 200bar", "유량: 가변", "내구성: 고온·진동 환경"],
    img: "https://images.unsplash.com/photo-1488462104523-514bea5f99b3?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "cdi-module",
    name: "CDI 모듈",
    category: "점화 시스템",
    desc: "커패시터 방전식 점화 모듈. 고고도·저온 환경에서도 안정적인 점화 성능.",
    specs: ["전압: 6–12V", "무게: 45g", "방수: IP67"],
    img: "https://images.unsplash.com/photo-1514598800938-f7125ea1aa1c?w=600&h=400&fit=crop&auto=format",
  },
];

const RENTALS = [
  {
    name: "고속 카메라",
    category: "촬영 장비",
    desc: "최대 10,000fps 촬영 가능. 연소·분사 현상 분석에 활용.",
    img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "DJI Mavic 3",
    category: "드론 플랫폼",
    desc: "하스셀블라드 카메라 탑재 전문 촬영 드론. 비행 시간 46분.",
    img: "https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "DJI Mavic 4",
    category: "드론 플랫폼",
    desc: "최신 트리플 카메라 시스템. 탁월한 이미지 품질과 비행 안정성.",
    img: "https://images.unsplash.com/photo-1488462104523-514bea5f99b3?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "동력계 시스템",
    category: "측정 장비",
    desc: "드론 추진 시스템 성능 측정 전용 동력계. 추력·토크·RPM 실시간 측정.",
    img: "https://images.unsplash.com/photo-1514598800938-f7125ea1aa1c?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "FPV 레이싱 드론",
    category: "드론 플랫폼",
    desc: "고기동 FPV 레이싱 플랫폼. 연구·교육·경기 목적 대여.",
    img: "https://images.unsplash.com/photo-1588495077262-e41593eb23c8?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "DJI Tello",
    category: "교육용 드론",
    desc: "코딩 교육 및 실내 비행 연구용 소형 드론. 안전하고 다루기 쉬운 플랫폼.",
    img: "https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?w=600&h=400&fit=crop&auto=format",
  },
];

const ABOUT_ITEMS = [
  {
    icon: "⚙️",
    title: "정밀 연소 설계",
    desc: "수치 유체역학(CFD) 기반 연소실 최적화로 열효율을 극대화합니다.",
  },
  {
    icon: "📊",
    title: "동력계 성능 검증",
    desc: "자체 개발 동력계로 추력·토크·연료 소비율을 정밀 측정·검증합니다.",
  },
  {
    icon: "🔬",
    title: "고속 가시화 분석",
    desc: "고속 카메라 기반 연료 분무 및 연소 현상 가시화 연구를 수행합니다.",
  },
  {
    icon: "🛡️",
    title: "신뢰성 보증",
    desc: "MIL-SPEC 수준의 환경 시험을 통해 극한 조건에서의 신뢰성을 보증합니다.",
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const sections = ["home", "about", "products", "rental", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const activeSection = useScrollSpy();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ── NAV ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold"
              style={{
                backgroundColor: "#005FAD",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              DE
            </div>
            <span
              className="font-semibold text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#0c0c0c" }}
            >
              Drone Engine
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-medium transition-colors duration-200 relative py-1"
                  style={{
                    color: isActive ? "#005FAD" : "#4a4a4a",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {l.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: "#005FAD" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="text-sm px-4 py-2 font-medium transition-all duration-200"
              style={{
                backgroundColor: "#005FAD",
                color: "#ffffff",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              문의하기
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{ backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.08)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => { scrollTo(l.href); setMobileOpen(false); }}
                  className="text-sm font-medium text-left py-1"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#0c0c0c" }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { scrollTo("#contact"); setMobileOpen(false); }}
                className="text-sm px-4 py-2 font-medium text-center mt-2"
                style={{ backgroundColor: "#005FAD", color: "#fff", fontFamily: "'Outfit', sans-serif" }}
              >
                문의하기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?w=1600&h=900&fit=crop&auto=format"
            alt="드론 비행"
            className="w-full h-full object-cover"
            style={{ opacity: 0.07 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,95,173,0.04) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Accent grid lines */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,95,173,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,95,173,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xs font-medium tracking-widest uppercase px-3 py-1.5"
                  style={{
                    backgroundColor: "#e8f1fb",
                    color: "#005FAD",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  차세대 드론 추진 기술
                </span>
              </div>

              <h1
                className="font-bold leading-none tracking-tight mb-6"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  color: "#0c0c0c",
                  letterSpacing: "-0.03em",
                }}
              >
                Drone
                <br />
                <span style={{ color: "#005FAD" }}>Engine</span>
                <br />
                Technology
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: "#5a5a5a", fontFamily: "'Inter', sans-serif" }}
              >
                고성능 드론 엔진 개발부터 연료 시스템, 점화 모듈까지.
                극한 환경에서 검증된 신뢰성으로 산업·방위·연구 분야를 지원합니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("#products")}
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: "#005FAD",
                    color: "#ffffff",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  제품 보기
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border transition-all duration-200"
                  style={{
                    borderColor: "rgba(0,0,0,0.15)",
                    color: "#0c0c0c",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  기술 상담
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Stats column */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="p-8 flex flex-col gap-1"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        color: "#005FAD",
                        fontFamily: "'Outfit', sans-serif",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "#6b6b6b", fontFamily: "'Inter', sans-serif" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
        />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
            >
              01 — 회사소개
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#0c0c0c",
                  letterSpacing: "-0.03em",
                }}
              >
                기술이 하늘을
                <br />
                <span style={{ color: "#005FAD" }}>지배합니다</span>
              </h2>
              <p
                className="leading-relaxed mb-6"
                style={{ color: "#5a5a5a", fontSize: "1.0625rem" }}
              >
                드론엔진은 무인기 추진 시스템의 핵심 기술을 연구·개발하는 전문 기업입니다.
                자체 설계한 가솔린 엔진과 연료 시스템을 기반으로 산업·방위·농업·물류 분야에
                최적화된 솔루션을 공급합니다.
              </p>
              <p
                className="leading-relaxed mb-10"
                style={{ color: "#5a5a5a", fontSize: "1.0625rem" }}
              >
                CFD 기반 열유체 해석, 고속 가시화 실험, 동력계 성능 측정을 포함한
                첨단 연구 인프라를 통해 세계 수준의 기술력을 보유하고 있습니다.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
              >
                기술 문의하기 <ArrowRight size={16} />
              </button>
            </div>

            <div className="lg:col-span-7">
              {/* Hero about image */}
              <div className="mb-8 overflow-hidden" style={{ backgroundColor: "#e8f1fb" }}>
                <img
                  src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=900&h=500&fit=crop&auto=format"
                  alt="드론 엔진 연구 시설"
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Capabilities grid */}
              <div className="grid grid-cols-2 gap-4">
                {ABOUT_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 border transition-all duration-200 hover:border-blue-200"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "rgba(0,0,0,0.06)",
                    }}
                  >
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h3
                      className="font-semibold text-sm mb-2"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "#0c0c0c" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
            >
              02 — 제품
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "#0c0c0c",
                  letterSpacing: "-0.03em",
                }}
              >
                검증된
                <br />
                추진 솔루션
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#6b6b6b" }}>
                30cc부터 222cc까지, 다양한 플랫폼 요구 사항에 맞춘
                가솔린 엔진 라인업과 핵심 구성 부품을 제공합니다.
              </p>

              {/* Product list selector */}
              <div className="flex flex-col gap-1">
                {PRODUCTS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(i)}
                    className="flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: activeProduct === i ? "#005FAD" : "transparent",
                      color: activeProduct === i ? "#fff" : "#4a4a4a",
                      borderLeft: activeProduct === i ? "3px solid #005FAD" : "3px solid transparent",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <span>{p.name}</span>
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{
                        backgroundColor: activeProduct === i ? "rgba(255,255,255,0.2)" : "#f0f0f0",
                        color: activeProduct === i ? "#fff" : "#888",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product detail */}
            <div className="lg:col-span-8">
              {PRODUCTS[activeProduct] && (
                <div className="flex flex-col gap-0">
                  <div
                    className="overflow-hidden"
                    style={{ backgroundColor: "#f4f4f4" }}
                  >
                    <img
                      key={PRODUCTS[activeProduct].id}
                      src={PRODUCTS[activeProduct].img}
                      alt={PRODUCTS[activeProduct].name}
                      className="w-full h-72 object-cover"
                      style={{ transition: "opacity 0.3s" }}
                    />
                  </div>
                  <div
                    className="p-8 border-l border-r border-b"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span
                          className="text-xs font-medium tracking-widest uppercase mb-2 block"
                          style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
                        >
                          {PRODUCTS[activeProduct].category}
                        </span>
                        <h3
                          className="font-bold"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "1.75rem",
                            color: "#0c0c0c",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {PRODUCTS[activeProduct].name}
                        </h3>
                      </div>
                      <button
                        onClick={() => scrollTo("#contact")}
                        className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 transition-all hover:opacity-80"
                        style={{
                          backgroundColor: "#005FAD",
                          color: "#fff",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        견적 문의 <ExternalLink size={12} />
                      </button>
                    </div>
                    <p className="leading-relaxed mb-6" style={{ color: "#5a5a5a", fontSize: "0.9375rem" }}>
                      {PRODUCTS[activeProduct].desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCTS[activeProduct].specs.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-3 py-1.5"
                          style={{
                            backgroundColor: "#f0f0f0",
                            color: "#4a4a4a",
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RENTAL ── */}
      <section id="rental" className="py-28" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
            >
              03 — 장비대여
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <h2
                className="font-bold leading-tight"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "#0c0c0c",
                  letterSpacing: "-0.03em",
                }}
              >
                연구·촬영·교육을 위한
                <br />
                <span style={{ color: "#005FAD" }}>장비 대여 서비스</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="leading-relaxed text-sm" style={{ color: "#6b6b6b" }}>
                드론 플랫폼부터 측정 장비, 고속 카메라까지.
                연구 목적에 맞는 최적의 장비를 합리적인 비용으로 대여해 드립니다.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
            {RENTALS.map((r) => (
              <div
                key={r.name}
                className="group overflow-hidden flex flex-col"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="overflow-hidden" style={{ backgroundColor: "#e8f1fb" }}>
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
                  >
                    {r.category}
                  </span>
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#0c0c0c" }}
                  >
                    {r.name}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b6b6b" }}>
                    {r.desc}
                  </p>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="mt-4 text-xs font-medium flex items-center gap-1 transition-all duration-200"
                    style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
                  >
                    대여 문의 <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#005FAD" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span
                className="text-xs font-medium tracking-widest uppercase mb-4 block"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Mono', monospace" }}
              >
                파트너십 및 납품
              </span>
              <h2
                className="font-bold leading-tight text-white"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                프로젝트의 추진력이
                <br />
                필요하신가요?
              </h2>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#005FAD",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                지금 상담 신청
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#005FAD", fontFamily: "'DM Mono', monospace" }}
            >
              04 — 문의
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "#0c0c0c",
                  letterSpacing: "-0.03em",
                }}
              >
                기술 문의 및
                <br />
                <span style={{ color: "#005FAD" }}>견적 요청</span>
              </h2>
              <p className="leading-relaxed mb-10 text-sm" style={{ color: "#6b6b6b" }}>
                엔진 사양 상담, 대여 예약, 기술 협력 등 모든 문의를 환영합니다.
                담당자가 1영업일 이내 회신드립니다.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: <Mail size={16} />, label: "이메일", value: "contact@droneengine.kr" },
                  { icon: <Phone size={16} />, label: "전화", value: "02-1234-5678" },
                  { icon: <MapPin size={16} />, label: "주소", value: "서울특별시 강남구 테헤란로 123" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8f1fb", color: "#005FAD" }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <span className="text-xs block mb-0.5" style={{ color: "#999", fontFamily: "'DM Mono', monospace" }}>
                        {c.label}
                      </span>
                      <span className="text-sm font-medium" style={{ color: "#0c0c0c" }}>
                        {c.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <form
                ref={formRef}
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.");
                  formRef.current?.reset();
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "성함", placeholder: "홍길동" },
                    { name: "company", label: "소속 / 기관명", placeholder: "(주)드론테크" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        className="text-xs font-medium block mb-2"
                        style={{ color: "#4a4a4a", fontFamily: "'Outfit', sans-serif" }}
                      >
                        {f.label}
                      </label>
                      <input
                        name={f.name}
                        placeholder={f.placeholder}
                        required
                        className="w-full px-4 py-3 text-sm border outline-none transition-all duration-200 focus:border-blue-400"
                        style={{
                          borderColor: "rgba(0,0,0,0.1)",
                          backgroundColor: "#f7f7f7",
                          color: "#0c0c0c",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      />
                    </div>
                  ))}
                </div>
                {[
                  { name: "email", label: "이메일", placeholder: "hello@example.com", type: "email" },
                  { name: "phone", label: "연락처", placeholder: "010-1234-5678", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      className="text-xs font-medium block mb-2"
                      style={{ color: "#4a4a4a", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="w-full px-4 py-3 text-sm border outline-none transition-all duration-200 focus:border-blue-400"
                      style={{
                        borderColor: "rgba(0,0,0,0.1)",
                        backgroundColor: "#f7f7f7",
                        color: "#0c0c0c",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="text-xs font-medium block mb-2"
                    style={{ color: "#4a4a4a", fontFamily: "'Outfit', sans-serif" }}
                  >
                    문의 내용
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="문의하실 내용을 상세히 기재해 주세요."
                    required
                    className="w-full px-4 py-3 text-sm border outline-none transition-all duration-200 focus:border-blue-400 resize-none"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      backgroundColor: "#f7f7f7",
                      color: "#0c0c0c",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#005FAD",
                    color: "#ffffff",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  문의 접수하기
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-12"
        style={{ borderColor: "rgba(0,0,0,0.06)", backgroundColor: "#0c0c0c" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 mb-10">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
                >
                  DE
                </div>
                <span
                  className="font-semibold text-sm tracking-widest uppercase text-white"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Drone Engine
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                차세대 드론 추진 기술의 선두주자.
                <br />
                신뢰성과 성능으로 하늘을 지배합니다.
              </p>
            </div>

            {[
              {
                title: "제품",
                links: ["DLE 엔진 라인업", "연료 분사 시스템", "CDI 점화 모듈", "카브레터"],
              },
              {
                title: "서비스",
                links: ["장비 대여", "기술 상담", "맞춤 개발", "A/S 지원"],
              },
              {
                title: "회사",
                links: ["회사소개", "연구 시설", "파트너사", "채용"],
              },
            ].map((col) => (
              <div key={col.title} className="md:col-span-2">
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-4 text-white"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <button
                        className="text-xs transition-colors duration-200 hover:text-white text-left"
                        style={{ color: "#666" }}
                      >
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs" style={{ color: "#555" }}>
              © 2025 Drone Engine Technology. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["개인정보처리방침", "이용약관", "사이트맵"].map((l) => (
                <button key={l} className="text-xs transition-colors hover:text-white" style={{ color: "#555" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
