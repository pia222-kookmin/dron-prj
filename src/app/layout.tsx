import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://automobi.kookmin.ac.kr"),
  title: "OTTOMOBI | 차세대 드론 엔진 기술",
  description: "고성능 드론 엔진 개발 및 대여 서비스. 기술 혁신 기업의 첨단 드론 추진 시스템.",
  keywords: ["드론", "드론 엔진", "항공", "기술", "혁신", "국민대", "OTTOMOBI"],
  openGraph: {
    title: "OTTOMOBI | 차세대 드론 엔진 기술",
    description: "고성능 드론 엔진 개발 및 대여 서비스. 기술 혁신 기업의 첨단 드론 추진 시스템.",
    url: "https://automobi.kookmin.ac.kr",
    siteName: "OTTOMOBI",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "6ey5J5SAwWtYqQNwBPKyDfiIrRfOyhRFpHtm7DIKXxQ",
    other: {
      "naver-site-verification": "f6f683a0a8a78db21d1615bb110a465594dcb81a",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://automobi.kookmin.ac.kr/#website",
        "url": "https://automobi.kookmin.ac.kr",
        "name": "OTTOMOBI",
        "description": "고성능 드론 엔진 개발 및 대여 서비스. 기술 혁신 기업의 첨단 드론 추진 시스템."
      },
      {
        "@type": "SiteNavigationElement",
        "name": ["소개", "기술", "제품", "대여", "문의"],
        "url": [
          "https://automobi.kookmin.ac.kr/#about",
          "https://automobi.kookmin.ac.kr/#technology",
          "https://automobi.kookmin.ac.kr/#products",
          "https://automobi.kookmin.ac.kr/#rental",
          "https://automobi.kookmin.ac.kr/#contact"
        ]
      }
    ]
  };

  return (
    <html lang="ko" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
