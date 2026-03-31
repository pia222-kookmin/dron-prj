# 🗂️ 프로젝트 구조 및 소스코드 위치 가이드

## 📁 전체 디렉토리 구조

```
c:\001_Dron_Engine_PRJ\
│
├── src/                          # 소스코드 루트
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # ✏️ 전역 레이아웃 (HTML 구조)
│   │   ├── page.tsx             # ✏️ 메인 페이지 (섹션 조합)
│   │   └── globals.css          # ✏️ 전역 스타일 (Tailwind)
│   │
│   ├── components/              # 컴포넌트 폴더
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx       # ✏️ 상단 헤더/네비게이션
│   │   │   ├── Footer.tsx       # ✏️ 하단 푸터
│   │   │   └── index.ts         # 배럴 export
│   │   │
│   │   ├── sections/            # 페이지 섹션 컴포넌트
│   │   │   ├── HeroSection.tsx         # ✏️ 히어로 섹션
│   │   │   ├── AboutSection.tsx        # ✏️ 소개 섹션
│   │   │   ├── TechnologySection.tsx   # ✏️ 기술 섹션
│   │   │   ├── EngineCatalog.tsx       # ✏️ 제품 카탈로그
│   │   │   ├── RentalSection.tsx       # ✏️ 대여 요금제
│   │   │   ├── InquiryForm.tsx         # ✏️ 문의 폼
│   │   │   └── index.ts                # 배럴 export
│   │   │
│   │   ├── ui/                  # 재사용 UI 컴포넌트 (추가 예정)
│   │   └── icons/               # 아이콘 컴포넌트 (추가 예정)
│   │
│   ├── constants/               # 상수 및 콘텐츠
│   │   ├── content.ts           # ✏️ 모든 텍스트/이미지 경로 관리
│   │   └── index.ts             # 배럴 export
│   │
│   ├── lib/                     # 유틸리티/헬퍼 함수
│   │   ├── emailjs.ts           # ✏️ EmailJS 연동 로직
│   │   └── utils.ts             # ✏️ 유틸 함수
│   │
│   ├── types/                   # TypeScript 타입 정의
│   │   └── index.ts             # ✏️ 전역 타입
│   │
│   └── hooks/                   # 커스텀 React 훅 (추가 예정)
│
├── public/                      # 정적 파일
│   ├── images/                  # 이미지 폴더
│   │   └── products/            # 제품 이미지
│   ├── robots.txt               # SEO 설정
│   └── (favicon.ico 추가 예정)
│
├── tailwind.config.ts           # ✏️ Tailwind CSS 설정
├── next.config.js               # ✏️ Next.js 설정
├── tsconfig.json                # TypeScript 설정
├── package.json                 # 의존성 관리
├── .env.local                   # 환경 변수 (생성 필요)
└── .gitignore                   # Git 제외 파일

```

---

## ✏️ 수정하는 목적별 파일 위치

### 📝 **텍스트/콘텐츠 수정**
```
src/constants/content.ts
```
- 모든 텍스트, 제목, 설명, 링크
- 제품 정보, 요금제, 통계 데이터
- 이미지 경로

**예시**:
```typescript
export const HERO_CONTENT = {
  title: "DRONE ENGINE",      // ← 타이틀 수정
  subtitle: "...",
  description: "...",          // ← 설명 수정
}
```

---

### 🎨 **디자인/스타일 수정**

#### 전역 스타일
```
src/app/globals.css
```
- 버튼 스타일 (.btn-cyber)
- 카드 스타일 (.card-tech)
- 애니메이션, 색상 효과

#### Tailwind 설정
```
tailwind.config.ts
```
- 컬러 팔레트 (cyber-*, dark-*)
- 폰트, 애니메이션 설정
- 커스텀 클래스 추가

---

### 🧩 **섹션별 컴포넌트 수정**

#### Hero 섹션 (메인 배너)
```
src/components/sections/HeroSection.tsx
```
- 타이틀 애니메이션
- 배경 효과
- CTA 버튼

#### 소개 섹션
```
src/components/sections/AboutSection.tsx
```
- 회사 소개 내용
- 통계 카드 (150+ 엔진, 99.9% 신뢰성 등)

#### 기술 섹션
```
src/components/sections/TechnologySection.tsx
```
- 기술 특징 카드 4개
- 아이콘 변경

#### 제품 카탈로그
```
src/components/sections/EngineCatalog.tsx
```
- 제품 카드 레이아웃
- 호버 효과
- 스펙 표시 방식

#### 대여 요금제
```
src/components/sections/RentalSection.tsx
```
- 요금제 카드
- "인기" 배지 위치/스타일
- 가격 표시

#### 문의 폼
```
src/components/sections/InquiryForm.tsx
```
- 폼 필드 추가/제거
- 유효성 검사
- 전송 로직

---

### 🔝 **헤더/푸터 수정**

#### 헤더 (네비게이션)
```
src/components/layout/Header.tsx
```
- 로고
- 메뉴 항목
- 모바일 메뉴

#### 푸터
```
src/components/layout/Footer.tsx
```
- 회사 정보
- 연락처
- 소셜 링크

---

### 🏠 **메인 페이지 구성**
```
src/app/page.tsx
```
- 섹션 순서 변경
- 섹션 추가/제거

**현재 순서**:
```typescript
<HeroSection />
<AboutSection />
<TechnologySection />
<EngineCatalog />
<RentalSection />
<InquiryForm />
```

---

### ⚙️ **기능/로직 수정**

#### EmailJS 연동
```
src/lib/emailjs.ts
```
- 이메일 전송 로직
- 에러 처리

#### 유틸 함수
```
src/lib/utils.ts
```
- 가격 포맷팅
- 클래스 이름 조합

#### 타입 정의
```
src/types/index.ts
```
- TypeScript 인터페이스
- 타입 추가/수정

---

## 🎯 **자주 수정하는 항목별 빠른 가이드**

### 1. 텍스트 변경
→ `src/constants/content.ts`

### 2. 색상 변경
→ `tailwind.config.ts` (컬러 팔레트)

### 3. 버튼 스타일
→ `src/app/globals.css` (.btn-cyber)

### 4. 섹션 레이아웃
→ `src/components/sections/*.tsx`

### 5. 헤더/푸터
→ `src/components/layout/*.tsx`

### 6. 제품/요금제 데이터
→ `src/constants/content.ts` (PRODUCTS_CONTENT, RENTAL_CONTENT)

### 7. 애니메이션 속도/효과
→ 해당 섹션 컴포넌트의 `motion.*` 속성

---

## 💡 **수정 팁**

### ✅ **권장 작업 순서**
1. `src/constants/content.ts` - 콘텐츠 먼저 수정
2. `src/components/sections/*.tsx` - 레이아웃 조정
3. `src/app/globals.css` - 스타일 미세 조정

### ⚠️ **주의사항**
- `src/app/layout.tsx` - 웬만하면 수정 안 함 (전역 레이아웃)
- `tailwind.config.ts` - 색상 변경만 권장
- `.env.local` - Git에 커밋하지 말 것

### 🔍 **빠른 검색**
VS Code에서 `Ctrl + P` 로 파일명 검색:
- `content.ts` - 콘텐츠
- `HeroSection` - 히어로 섹션
- `globals.css` - 전역 스타일

---

## 📚 **추가 도움말**

각 파일 상단에 주석으로 설명이 있으며,
수정하기 쉽게 구조화되어 있습니다.

**질문 예시**:
- "제품 카드 색상 바꾸고 싶어" → `EngineCatalog.tsx` + `globals.css`
- "히어로 제목 바꾸고 싶어" → `content.ts`의 `HERO_CONTENT.title`
- "요금제 추가하고 싶어" → `content.ts`의 `RENTAL_CONTENT.plans`

**구체적으로 어떤 부분을 수정하시겠습니까?** 🚀
