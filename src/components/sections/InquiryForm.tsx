"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT_CONTENT, SITE_CONFIG } from "@/constants";
import { isInquiryEmailEnabled, sendEmail } from "@/lib/email";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

interface InquiryFormProps {
  lang?: "ko" | "en";
}

export default function InquiryForm({ lang = "ko" }: InquiryFormProps) {
  const inquiryEnabled = isInquiryEmailEnabled();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const t = CONTACT_CONTENT[lang] || CONTACT_CONTENT.ko;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inquiryEnabled) {
      setStatus({
        type: "error",
        message: lang === "ko" ? "현재 문의 기능이 비활성화되어 있습니다." : "The inquiry feature is currently disabled.",
      });
      return;
    }

    setStatus({ type: "loading", message: lang === "ko" ? "전송 중..." : "Sending..." });

    try {
      await sendEmail(formData);
      setStatus({
        type: "success",
        message: lang === "ko" ? "문의가 성공적으로 전송되었습니다!" : "Inquiry has been sent successfully!",
      });
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 3000);
    } catch (error: any) {
      let errorMessage = lang === "ko" 
        ? "전송 실패. 다시 시도해주세요." 
        : "Sending failed. Please try again.";
      
      if (error && error.message === "QUOTA_EXCEEDED") {
        errorMessage = lang === "ko"
          ? "일일 메일 전송 한도를 초과했습니다. 잠시 후 다시 시도해 주시거나 페이지 하단의 연락처/이메일로 직접 문의해 주시기 바랍니다."
          : "Daily mail transmission limit exceeded. Please try again later or contact us directly via the contact/email at the bottom of the page.";
      } else if (error && error.message) {
        errorMessage = error.message;
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* ── CTA BANNER ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#005FAD" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-tech-grid"
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-4 block text-white/60 font-mono"
              >
                {lang === "ko" ? "파트너십 및 납품" : "PARTNERSHIP & DELIVERY"}
              </span>
              <h2
                className="font-bold leading-tight text-white"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {lang === "ko" ? (
                  <>
                    프로젝트의 추진력이
                    <br />
                    필요하신가요?
                  </>
                ) : (
                  <>
                    Need propulsion for
                    <br />
                    your project?
                  </>
                )}
              </h2>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 bg-white text-[#005FAD] hover:bg-white/90 shadow-md rounded-sm"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {lang === "ko" ? "지금 상담 신청" : "Apply for Consultation"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#005FAD", fontFamily: "'Outfit', sans-serif" }}
            >
              05 — {lang === "ko" ? "문의" : "CONTACT"}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left side details */}
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
                {lang === "ko" ? (
                  <>
                    기술 문의 및
                    <br />
                    <span style={{ color: "#005FAD" }}>견적 요청</span>
                  </>
                ) : (
                  <>
                    Technical Inquiry &
                    <br />
                    <span style={{ color: "#005FAD" }}>Quote Request</span>
                  </>
                )}
              </h2>
              <p className="leading-relaxed mb-10 text-sm text-slate-500 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t.description}
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: <MailIcon />, label: lang === "ko" ? "이메일" : "Email", value: SITE_CONFIG.contact.email },
                  { icon: <PhoneIcon />, label: lang === "ko" ? "전화" : "Phone", value: SITE_CONFIG.contact.phone },
                  { icon: <MapPinIcon />, label: lang === "ko" ? "주소" : "Address", value: SITE_CONFIG.contact.address[lang] || SITE_CONFIG.contact.address.ko },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-[#005FAD] rounded-sm"
                      style={{ backgroundColor: "#e8f1fb" }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <span className="text-[10px] block mb-0.5 text-slate-400 font-mono tracking-wider">
                        {c.label}
                      </span>
                      <span className="text-sm font-semibold text-[#0c0c0c]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {c.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-2 text-slate-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.form.name} *
                    </label>
                    <input
                      name="name"
                      placeholder={lang === "ko" ? "홍길동" : "John Doe"}
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-black/10 outline-none transition-all duration-200 focus:border-blue-400 rounded-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        color: "#0c0c0c",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-2 text-slate-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.form.company}
                    </label>
                    <input
                      name="company"
                      placeholder={lang === "ko" ? "(주)드론테크" : "Company Inc."}
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-black/10 outline-none transition-all duration-200 focus:border-blue-400 rounded-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        color: "#0c0c0c",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-2 text-slate-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.form.email} *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-black/10 outline-none transition-all duration-200 focus:border-blue-400 rounded-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        color: "#0c0c0c",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-2 text-slate-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {lang === "ko" ? "연락처" : "Phone"} *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-black/10 outline-none transition-all duration-200 focus:border-blue-400 rounded-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        color: "#0c0c0c",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-2 text-slate-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.form.message} *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={lang === "ko" ? "문의하실 내용을 상세히 기재해 주세요." : "Please write your inquiry details..."}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-black/10 outline-none transition-all duration-200 focus:border-blue-400 resize-none rounded-sm"
                    style={{
                      backgroundColor: "#f7f7f7",
                      color: "#0c0c0c",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.type === "loading" || !inquiryEnabled}
                  className="w-full py-4 text-sm font-semibold transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 text-white bg-[#005FAD] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-sm font-display"
                  style={{
                    letterSpacing: "0.02em",
                  }}
                >
                  {!inquiryEnabled
                    ? (lang === "ko" ? "문의 기능 비활성화됨" : "Inquiry Disabled")
                    : status.type === "loading"
                    ? (lang === "ko" ? "전송 중..." : "Sending...")
                    : (lang === "ko" ? "문의 접수하기" : "Submit Inquiry")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Status messages */}
                {status.type !== "idle" && (
                  <div
                    className={`p-4 rounded-sm text-center text-sm font-semibold ${
                      status.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-600"
                        : status.type === "error"
                        ? "bg-red-500/10 border border-red-500/20 text-red-600"
                        : "bg-blue-500/10 border border-blue-500/20 text-blue-600"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
