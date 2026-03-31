# 배포 준비 가이드

## 📋 배포 전 체크리스트

### 1. 환경 변수 설정 (EmailJS)
- [ ] 문의 기능 활성화 여부 결정
- [ ] `.env.local` 파일에 설정 입력
  ```
   NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=false
  NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
  ```
- [ ] 배포 플랫폼에 환경 변수 등록

기본 권장값(현재 배포):
- `NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=false` (문의 전송 비활성화)

나중에 문의 기능을 다시 켜려면:
- `NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=true`로 변경
- EmailJS Gmail 권한 연결 완료 후 재배포

### 2. 빌드 테스트
- [ ] 로컬 빌드 성공 확인
  ```bash
  npm run build
  npm start
  ```
- [ ] 에러 없는지 확인
- [ ] 모든 페이지 동작 확인

### 3. 이미지 및 파비콘
- [ ] 파비콘 추가 (`public/favicon.ico`)
- [ ] OG 이미지 추가 (`public/og-image.png`)
- [ ] 제품 이미지 준비 (선택사항)

### 4. SEO 및 메타데이터
- [ ] 사이트 제목/설명 확인
- [ ] robots.txt 생성 (선택사항)
- [ ] sitemap.xml 생성 (선택사항)

### 5. 배포 플랫폼 선택

---

## 🚀 배포 옵션

### Option 1: Vercel (추천 ⭐ - 가장 쉬움)
**장점**: Next.js 제작사, 무료, 자동 배포, 도메인 제공
**무료 플랜**: 무제한 트래픽

**단계**:
1. https://vercel.com 가입
2. GitHub 연동 또는 CLI 사용
3. 프로젝트 Import
4. 환경 변수 입력
5. Deploy 버튼 클릭
6. 완료! (약 2분 소요)

**CLI 배포**:
```bash
npm install -g vercel
vercel login
vercel
```

---

### Option 2: Netlify
**장점**: 무료, 사용 쉬움, 자동 배포
**무료 플랜**: 100GB 대역폭/월

**단계**:
1. https://netlify.com 가입
2. "Add new site" → "Import from Git"
3. Build 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. 환경 변수 입력
5. Deploy

---

### Option 3: GitHub Pages (정적 호스팅)
**장점**: 무료, GitHub 통합
**제한**: 정적 사이트만 (서버 기능 제한)

**설정**:
1. `next.config.js` 수정:
```javascript
module.exports = {
  output: 'export',
  images: { unoptimized: true }
}
```
2. Build:
```bash
npm run build
```
3. `out/` 폴더를 GitHub Pages로 배포

---

### Option 4: AWS Amplify
**장점**: AWS 통합, 자동 배포
**무료 플랜**: 12개월 무료 (제한적)

---

### Option 5: 자체 서버 (VPS)
**장점**: 완전한 제어
**필요**: Node.js 서버, PM2 등 프로세스 관리자

**단계**:
```bash
npm run build
npm start
# 또는 PM2 사용
pm2 start npm --name "drone-engine" -- start
```

---

## 📝 배포 플랫폼별 환경 변수 설정

### Vercel
1. Project Settings → Environment Variables
2. 환경 변수 추가 (Production, Preview, Development)

### Netlify
1. Site settings → Build & deploy → Environment
2. 환경 변수 추가

### AWS Amplify
1. App settings → Environment variables
2. 환경 변수 추가

---

## 🎯 추천 배포 플로우

### 초보자 / 빠른 배포
→ **Vercel** (5분 완료)

### GitHub 통합 선호
→ **Vercel** 또는 **Netlify**

### 비용 최소화
→ **Vercel 무료 플랜** (상업적 사용도 가능)

### 완전한 제어 필요
→ **자체 VPS**

---

## 📂 배포 전 파일 추가 (선택사항)

이미 생성된 파일:
- ✅ `.env.local.example` (환경 변수 템플릿)
- ✅ `EMAILJS_SETUP.md` (EmailJS 설정 가이드)

추가하면 좋은 파일:
- `public/favicon.ico` (파비콘)
- `public/robots.txt` (SEO)
- `.gitignore` (환경 변수 보호)

---

## ⚠️ 주의사항

1. **환경 변수 절대 커밋 금지**
   - `.env.local`은 `.gitignore`에 추가
   - 배포 플랫폼에서만 설정

2. **빌드 에러 확인**
   ```bash
   npm run build
   ```
   에러 있으면 배포 실패

3. **이미지 최적화**
   - Next.js Image 사용 중
   - 외부 이미지는 `next.config.js`에 도메인 추가 필요

4. **문의 기능 토글 확인**
   - 현재 문의 기능을 막고 배포하려면 `NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=false` 유지
   - 문의 기능 재활성화 시 `true`로 변경 후 배포

---

## 🔗 다음 단계

1. 배포 플랫폼 선택
2. Git 저장소 생성 (GitHub, GitLab 등)
3. 환경 변수 준비
4. 배포 실행
5. 도메인 연결 (선택사항)

**추천**: Vercel로 1차 배포 후 커스텀 도메인 연결
