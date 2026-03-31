/**
 * 프로젝트 전역 콘텐츠 관리
 * 텍스트와 이미지 경로는 이 파일에서 집중 관리합니다.
 */

export const SITE_CONFIG = {
  name: "DRONE ENGINE",
  tagline: "차세대 드론 엔진 기술",
  description: "고성능 드론 엔진 개발 및 대여 서비스",
  contact: {
    email: "contact@droneengine.co.kr",
    phone: "+82-2-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
  },
};

export const NAV_LINKS = [
  { label: "소개", href: "#about" },
  { label: "기술", href: "#technology" },
  { label: "제품", href: "#products" },
  { label: "대여", href: "#rental" },
  { label: "문의", href: "#contact" },
];

export const HERO_CONTENT = {
  title: "DRONE ENGINE",
  subtitle: "NEXT GENERATION PROPULSION",
  description:
    "최첨단 드론 엔진 기술로 하늘을 지배하다. 혁신적인 추진 시스템과 경량 설계로 비행의 한계를 넘어섭니다.",
  cta: {
    primary: "제품 살펴보기",
    secondary: "문의하기",
  },
};

export const ABOUT_CONTENT = {
  title: "ABOUT US",
  subtitle: "기술 혁신의 선두주자",
  description:
    "우리는 드론 엔진 기술의 새로운 패러다임을 창조합니다. 10년간의 연구개발과 혁신을 통해 업계 최고의 효율성과 신뢰성을 자랑하는 엔진을 개발합니다.",
  stats: [
    { value: "150+", label: "개발된 엔진 모델" },
    { value: "99.9%", label: "가동 신뢰성" },
    { value: "50+", label: "글로벌 파트너" },
    { value: "24/7", label: "기술 지원" },
  ],
};

export const TECHNOLOGY_CONTENT = {
  title: "TECHNOLOGY",
  subtitle: "첨단 기술의 집약체",
  features: [
    {
      title: "하이브리드 추진 시스템",
      description:
        "전기와 연료의 최적 조합으로 장거리 비행과 높은 출력을 동시에 제공합니다.",
      icon: "hybrid",
    },
    {
      title: "AI 기반 최적화",
      description:
        "머신러닝 알고리즘을 통해 실시간으로 엔진 성능을 최적화합니다.",
      icon: "ai",
    },
    {
      title: "경량 카본 소재",
      description:
        "항공우주급 카본 파이버 소재로 무게 대비 최고의 출력을 구현합니다.",
      icon: "carbon",
    },
    {
      title: "자가 진단 시스템",
      description:
        "내장된 센서가 실시간으로 엔진 상태를 모니터링하고 예방 정비를 알립니다.",
      icon: "diagnostic",
    },
  ],
};

export const PRODUCTS_CONTENT = {
  title: "PRODUCTS",
  subtitle: "제품 라인업",
  products: [
    {
      name: "VORTEX-100",
      category: "소형 드론용",
      specs: {
        power: "100W",
        weight: "150g",
        efficiency: "92%",
      },
      description: "취미용 및 소형 상업용 드론에 최적화된 컴팩트 엔진",
      image: "/images/products/vortex-100.png",
    },
    {
      name: "TITAN-500",
      category: "산업용",
      specs: {
        power: "500W",
        weight: "450g",
        efficiency: "95%",
      },
      description: "화물 배송 및 산업 현장 점검용 고출력 엔진",
      image: "/images/products/titan-500.png",
    },
    {
      name: "APEX-1000",
      category: "전문가용",
      specs: {
        power: "1000W",
        weight: "800g",
        efficiency: "97%",
      },
      description: "영화 촬영, 측량 등 전문 분야를 위한 프리미엄 엔진",
      image: "/images/products/apex-1000.png",
    },
  ],
};

export const RENTAL_CONTENT = {
  title: "RENTAL",
  subtitle: "유연한 대여 서비스",
  description:
    "구매 전 체험부터 단기 프로젝트까지, 다양한 대여 옵션을 제공합니다.",
  plans: [
    {
      name: "Basic",
      duration: "1일",
      price: "50,000",
      features: ["기본 엔진 1대", "기술 매뉴얼", "전화 지원"],
    },
    {
      name: "Professional",
      duration: "1주",
      price: "250,000",
      features: [
        "프리미엄 엔진 선택",
        "현장 설치 지원",
        "24시간 기술 지원",
        "교체 서비스",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      duration: "1개월",
      price: "800,000",
      features: [
        "전 제품 무제한",
        "전담 기술 매니저",
        "정기 점검 서비스",
        "우선 기술 지원",
        "맞춤 세팅",
      ],
    },
  ],
};

export const CONTACT_CONTENT = {
  title: "CONTACT",
  subtitle: "문의하기",
  description: "프로젝트에 대해 상담하고 싶으시다면 연락 주세요.",
  form: {
    name: "이름",
    email: "이메일",
    company: "회사명 (선택)",
    message: "문의 내용",
    submit: "전송하기",
  },
};

export const FOOTER_CONTENT = {
  copyright: "© 2024 Drone Engine. All rights reserved.",
  links: [
    { label: "개인정보처리방침", href: "/privacy" },
    { label: "이용약관", href: "/terms" },
  ],
  social: [
    { platform: "github", href: "#" },
    { platform: "linkedin", href: "#" },
    { platform: "twitter", href: "#" },
  ],
};

// 이미지 경로 관리
export const IMAGES = {
  logo: "/images/logo.svg",
  hero: {
    background: "/images/hero-bg.png",
    drone: "/images/hero-drone.png",
  },
  about: {
    team: "/images/about-team.png",
    facility: "/images/about-facility.png",
  },
  technology: {
    diagram: "/images/tech-diagram.svg",
  },
};
