"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT_CONTENT } from "@/constants";
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
      
      // 3초 후 상태 초기화
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
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      {/* 배경 격자 */}
      <div className="absolute inset-0 bg-tech-grid opacity-85 pointer-events-none" />

      {/* 부드러운 블루 백글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#005FAD]/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 섹션 헤더 (이전의 중앙 정렬 레이아웃) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="heading-tech text-5xl md:text-6xl mb-6 text-[#0c0c0c]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {CONTACT_CONTENT.title}
            </h2>
            <p 
              className="text-xl md:text-2xl font-bold tracking-wider mb-4 text-[#005FAD]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.subtitle}
            </p>
            <p 
              className="text-slate-500 text-base md:text-lg leading-relaxed font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.description}
            </p>
          </motion.div>

          {/* 폼 (이전의 중앙 카드형 배치) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-tech p-8 md:p-12 bg-white border border-black/[0.06] rounded-sm shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold tracking-wider text-slate-700 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {t.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#f7f7f7] border border-black/10 rounded-sm text-[#0c0c0c] text-base placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all"
                  placeholder={lang === "ko" ? "홍길동" : "John Doe"}
                />
              </div>

              {/* 이메일 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold tracking-wider text-slate-700 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {t.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#f7f7f7] border border-black/10 rounded-sm text-[#0c0c0c] text-base placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold tracking-wider text-slate-700 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {lang === "ko" ? "연락처 *" : "Phone *"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#f7f7f7] border border-black/10 rounded-sm text-[#0c0c0c] text-base placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all"
                  placeholder="010-1234-5678"
                />
              </div>

              {/* 회사명 */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold tracking-wider text-slate-700 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {t.form.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#f7f7f7] border border-black/10 rounded-sm text-[#0c0c0c] text-base placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all"
                  placeholder={lang === "ko" ? "회사명 또는 조직" : "Company or Organization"}
                />
              </div>

              {/* 메시지 */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold tracking-wider text-slate-700 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {t.form.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 bg-[#f7f7f7] border border-black/10 rounded-sm text-[#0c0c0c] text-base placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all resize-none"
                  placeholder={lang === "ko" ? "문의 내용을 자세히 작성해주세요..." : "Please write your inquiry details..."}
                />
              </div>

              {/* 전송 버튼 */}
              <motion.button
                type="submit"
                disabled={status.type === "loading" || !inquiryEnabled}
                whileHover={{
                  scale:
                    status.type === "loading" || !inquiryEnabled ? 1 : 1.01,
                }}
                whileTap={{ scale: 0.99 }}
                className="w-full btn-cyber-filled text-lg py-3.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-sm font-display font-semibold"
              >
                {!inquiryEnabled
                  ? (lang === "ko" ? "문의 기능 비활성화" : "Inquiry Disabled")
                  : status.type === "loading"
                  ? (lang === "ko" ? "전송 중..." : "Sending...")
                  : t.form.submit}
              </motion.button>

              {/* 상태 메시지 */}
              {status.type !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-sm text-center text-sm font-semibold ${
                    status.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-600"
                      : status.type === "error"
                      ? "bg-red-500/10 border border-red-500/20 text-red-600"
                      : "bg-blue-500/10 border border-blue-500/20 text-[#005FAD]"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
