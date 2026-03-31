import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 사이버네틱 블루 컬러 팔레트
      colors: {
        cyber: {
          50: "#e6f7ff",
          100: "#b3e6ff",
          200: "#80d4ff",
          300: "#4dc3ff",
          400: "#1ab2ff",
          500: "#00a0e6", // 메인 블루
          600: "#0080b3",
          700: "#006080",
          800: "#00404d",
          900: "#00202a",
        },
        dark: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#bdbdbd",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#303030",
          800: "#212121", // 메인 다크 배경
          900: "#0a0a0a", // 가장 어두운 배경
          950: "#050505",
        },
        neon: {
          blue: "#00d4ff",
          cyan: "#00fff2",
          purple: "#a855f7",
        },
      },
      // 미래지향적 타이포그래피
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-orbitron)", "sans-serif"], // 테크니컬 헤딩용
      },
      // 테크니컬 애니메이션
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      // 테크니컬 그림자
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.5)",
        "neon-strong": "0 0 40px rgba(0, 212, 255, 0.8)",
        "inner-glow": "inset 0 0 20px rgba(0, 212, 255, 0.2)",
      },
      // 테크니컬 보더
      borderRadius: {
        "tech": "2px",
      },
      // 백드롭 필터
      backdropBlur: {
        xs: "2px",
      },
      // 그라디언트
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "tech-grid": `
          linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
        `,
        "hero-gradient": "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
      },
      backgroundSize: {
        "grid-pattern": "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
