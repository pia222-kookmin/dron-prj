# Drone Engine Project

차세대 드론 엔진 기술 웹사이트 - 기술 혁신 기업 느낌의 테크니컬 디자인

## 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   └── globals.css          # 전역 스타일
├── components/              # 컴포넌트 (원자 단위)
│   ├── ui/                  # 기본 UI 컴포넌트
│   ├── layout/              # 레이아웃 컴포넌트
│   ├── sections/            # 섹션 컴포넌트
│   └── icons/               # 아이콘 컴포넌트
├── constants/               # 상수 및 콘텐츠
│   └── content.ts           # 텍스트/이미지 경로 집중 관리
├── hooks/                   # 커스텀 훅
├── lib/                     # 유틸리티
└── types/                   # 타입 정의
```

## 디자인 시스템

### 컬러 팔레트
- **다크 테마**: `dark-800`, `dark-900` (메인 배경)
- **사이버네틱 블루**: `cyber-400` ~ `cyber-600` (포인트 컬러)
- **네온 효과**: `neon-blue`, `neon-cyan` (강조)

### 타이포그래피
- **Display**: Orbitron (테크니컬 헤딩)
- **Mono**: JetBrains Mono (코드/데이터)
- **Sans**: Inter (본문)

### 컴포넌트 클래스
- `.btn-cyber`: 네온 글로우 버튼
- `.btn-cyber-filled`: 채워진 사이버 버튼
- `.card-tech`: 테크니컬 카드
- `.heading-tech`: 그라디언트 헤딩
- `.text-glow`: 네온 글로우 텍스트

## 개발 시작

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 다음 단계
1. 컴포넌트 개발 (Header, Footer, Sections)
2. Framer Motion 애니메이션 추가
3. EmailJS 문의 폼 구현
