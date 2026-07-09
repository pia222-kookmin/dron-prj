# 🛸 국민대학교 차세대 드론 엔진 기술 (Drone Engine Tech)

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.dot.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-green?style=for-the-badge)](https://nodemailer.com/)

국민대학교 차세대 드론 엔진 기술 연구소 및 스타트업을 위한 고성능 드론 엔진 제품 카탈로그, 장비 대여(Rental), 그리고 실시간 메일 문의(Contact) 기능을 탑재한 **프리미엄 테크니컬 랜딩 페이지**입니다.

이 프로젝트는 미래지향적인 사이버 테크 비주얼과 다국어 기능, 그리고 고도의 반응형 웹 인터페이스를 제공하도록 설계되었습니다.

---

## 🌟 주요 기능 (Key Features)

### 1. 프리미엄 사이버 테크 비주얼 (Rich Cyber Aesthetic)
- 미래형 드론 엔진 기술을 강조하기 위해 세련된 **다크 테마(Dark Mode)**와 생동감 있는 **일렉트릭 블루/사이버 네온 컬러**를 활용하여 시각적 몰입감을 확보했습니다.
- 배경 그리드 라인 효과 및 미세 글로우(Glow) 효과를 레이어링하여 정밀한 기계/엔진 공학적 분위기를 묘사했습니다.

### 2. 동적 인터랙티브 인터페이스 (Interactive Animations)
- **Framer Motion**을 적용하여 스크롤 위치에 맞춰 텍스트와 이미지 카드가 자연스럽게 등장하도록 생동감 있는 마이크로 인터랙션을 연동했습니다.
- 마우스 호버 효과 및 클릭 시 유연하게 반응하는 버튼 모션을 통합했습니다.

### 3. 실시간 다국어 지원 (KO / EN Localization)
- 한글/영어 동시 노출로 인해 발생하는 텍스트 피로도를 해결하기 위해, 헤더의 토글 버튼을 통해 **실시간 클라이언트 사이드 다국어 번역 기능**을 제공합니다.
- 다국어 번역 시 최적의 그리드 정렬을 유지하기 위해 1.5배 스케일링된 가독성 높은 폰트 세팅을 구축했습니다.

### 4. 반응형 모바일 메뉴 드롭다운 (Responsive Drawer)
- 데스크톱 뿐만 아니라 모바일 환경(태블릿/스마트폰 해상도)에서 상단 햄버거 메뉴를 클릭하면 부드럽게 슬라이드되는 전용 메뉴 창을 제공합니다.
- 모바일 메뉴 내에서도 각 앵커 이동 및 모바일용 언어 스위칭이 연동됩니다.

### 5. Gmail SMTP + Nodemailer API 연동 (Secure Email Inquiry)
- 백엔드 서버 없이도 사용자가 웹사이트의 폼을 통해 보낸 문의를 관리자 Gmail로 즉시 전송해주는 **Next.js App Router API Route**를 탑재했습니다.
- API 키 및 비밀번호는 서버 환경변수로만 동작하여 클라이언트에 전혀 노출되지 않는 뛰어난 보안성을 가집니다.
- 연동 키가 정의되지 않은 개발/로컬 환경에서는 터미널 로그로 문의 내용을 시뮬레이션하는 **Mock 전송 기능**이 내장되어 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
|------|-----------|
| **Core Framework** | Next.js 14.2.35 (App Router), React 18.2.0 |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.4.0, Autoprefixer, PostCSS |
| **Animation** | Framer Motion 11.0.0 |
| **Backend Integration** | Nodemailer (Gmail SMTP Direct Connection) |

---

## 📂 디렉토리 구조 (Directory Structure)

```
c:\dron_kookmin_web
 ├─ src/
 │   ├─ app/                 # Next.js App Router 페이지 및 API 라우트
 │   │   ├─ api/
 │   │   │   └─ contact/     # 이메일 전송 백엔드 API (route.ts)
 │   │   ├─ globals.css      # 전역 테마 스타일 정의
 │   │   ├─ layout.tsx       # 공통 레이아웃
 │   │   └─ page.tsx         # 랜딩 페이지 메인 진입점
 │   ├─ components/          # 재사용 가능한 UI 및 섹션 컴포넌트
 │   │   ├─ layout/          # 헤더, 푸터 등 레이아웃 컴포넌트
 │   │   └─ sections/        # Hero, About, Technology, EngineCatalog, Rental, InquiryForm
 │   ├─ constants/           # 다국어 텍스트 데이터 팩 (content.ts)
 │   ├─ hooks/               # 클라이언트 커스텀 훅
 │   ├─ lib/                 # Nodemailer 연동 등 유틸리티 라이브러리 (email.ts)
 │   └─ types/               # TypeScript 공통 인터페이스 선언
 ├─ public/                  # 이미지, 폰트, 정적 자산
 ├─ .env.local.example       # 환경 변수 설정 템플릿
 ├─ GMAIL_SMTP_SETUP.md      # 실제 Gmail 연동 가이드 문서
 └─ package.json             # 프로젝트 메타데이터 및 스크립트 정의
```

---

## 🚀 빠른 시작 (Getting Started)

### 1. 패키지 설치
프로젝트 루트 폴더로 이동한 후 아래 명령을 통해 필요한 모든 종속 패키지를 설치합니다.
```bash
npm install
```

### 2. 로컬 개발 서버 실행
설치가 끝난 후 개발 서버를 띄워 실시간 수정 사항을 브라우저에서 바로 테스트합니다.
```bash
npm run dev
```
개발 서버가 시작되면 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 페이지를 확인하실 수 있습니다.

### 3. 프로젝트 빌드 및 배포 테스트
프로덕션 릴리즈를 위한 번들링 및 컴파일 체크를 수행합니다.
```bash
npm run build
```

---

## 🔐 환경 변수 세팅 (`.env.local`)

이메일 전송을 활성화하고 실제 발송 테스트를 진행하려면 프로젝트 루트에 `.env.local` 파일을 생성하고 아래 형식을 채워넣어야 합니다.

```env
# 이메일 기능 전체 활성화 플래그 (true/false)
NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=true

# 발송용 Gmail 계정
GMAIL_USER=company-account@gmail.com

# 구글 보안 설정에서 생성한 16자리 앱 비밀번호 (공백 제거)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# 최종 메일을 받아볼 관리자 수신 이메일 주소
CONTACT_RECEIVER_EMAIL=admin-inbox@gmail.com
```

> 💡 **실제 연동 가이드**: 구글 계정 보안 설정 및 앱 비밀번호 생성에 관한 세부 스텝은 [GMAIL_SMTP_SETUP.md](file:///c:/dron_kookmin_web/GMAIL_SMTP_SETUP.md) 문서를 참고해 주시기 바랍니다.