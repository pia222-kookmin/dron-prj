import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRONE ENGINE | 차세대 드론 엔진 기술",
  description: "고성능 드론 엔진 개발 및 대여 서비스. 기술 혁신 기업의 첨단 드론 추진 시스템.",
  keywords: ["드론", "드론 엔진", "항공", "기술", "혁신"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        {/* 스캔라인 효과 */}
        <div className="scanline-overlay" />
      </body>
    </html>
  );
}
