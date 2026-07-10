"use client";

import { FOOTER_CONTENT, SITE_CONFIG, IMAGES } from "@/constants";

interface FooterProps {
  lang?: "ko" | "en";
}

export default function Footer({ lang = "ko" }: FooterProps) {
  const t = FOOTER_CONTENT[lang] || FOOTER_CONTENT.ko;
  const description = lang === "ko" ? "고성능 드론 엔진 개발 및 대여 서비스" : "High-performance drone engine development and rental services.";
  const address = SITE_CONFIG.contact.address[lang] || SITE_CONFIG.contact.address.ko;

  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "rgba(255, 255, 255, 0.06)", backgroundColor: "#0c0c0c" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 mb-10">
          {/* Company branding */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-sm overflow-hidden bg-white p-1"
              >
                <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span
                className="font-semibold text-sm tracking-widest uppercase text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#888" }}>
              {description}
              <br />
              {lang === "ko" ? "신뢰성과 성능으로 하늘을 지배합니다." : "Dominating the skies with reliability and performance."}
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4 text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-2.5 text-xs" style={{ color: "#888" }}>
              <p>{SITE_CONFIG.contact.email}</p>
              <p>{SITE_CONFIG.contact.phone}</p>
              <p className="leading-relaxed">{address}</p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-4">
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4 text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs transition-colors duration-200 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
        >
          <p className="text-[11px] font-mono" style={{ color: "#555" }}>
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_CONTENT.social.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                className="text-[11px] uppercase transition-colors hover:text-white"
                style={{ color: "#555" }}
                aria-label={social.platform}
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
