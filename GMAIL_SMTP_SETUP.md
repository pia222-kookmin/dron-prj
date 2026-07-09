# Gmail SMTP 연동 설정 가이드

Nodemailer를 사용하여 홈페이지의 이메일 문의를 실제 Gmail 계정으로 수신하기 위한 설정 방법입니다.

---

## 1단계: 구글 계정 보안 설정 (앱 비밀번호 발급)

구글은 보안 강화를 위해 일반 계정 비밀번호로의 직접 SMTP 접근을 차단합니다. 따라서 **'앱 비밀번호(App Password)'**를 생성하여 사용해야 합니다.

1. **구글 계정 관리** 페이지로 이동합니다.
   - [https://myaccount.google.com/](https://myaccount.google.com/) 접속 및 로그인
2. 좌측 메뉴에서 **보안(Security)** 탭을 선택합니다.
3. **'Google에 로그인하는 방법'** 섹션에서 **'2단계 인증(2-Step Verification)'**이 설정되어 있는지 확인합니다.
   - 2단계 인증이 설정되어 있지 않다면 먼저 활성화해야 합니다.
4. **2단계 인증** 상세 페이지로 들어간 뒤, 가장 아래쪽으로 스크롤하여 **'앱 비밀번호(App Passwords)'** 항목을 클릭합니다.
5. **앱 이름 입력**: 
   - 앱 이름을 자유롭게 적어줍니다 (예: `Drone Engine Web`).
   - **'만들기(Create)'** 버튼을 클릭합니다.
6. **앱 비밀번호 복사**:
   - 노란색 박스 안에 표시되는 **16자리 비밀번호** (예: `abcd efgh ijkl mnop`)를 마우스로 복사하여 안전한 곳에 메모합니다.
   - *주의: 이 창을 닫으면 비밀번호를 다시 확인할 수 없으므로 반드시 복사하셔야 합니다.*

---

## 2단계: 프로젝트 환경 변수 (`.env.local`) 설정

프로젝트 루트 폴더에 있는 `.env.local` 파일을 편집기(VS Code 등)로 열고 발급받은 값을 채워넣습니다.

```env
# 이메일 문의 활성화 (실서비스 적용 시 true)
NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL=true

# 발신자 Gmail 계정 (1단계에서 로그인한 구글 계정)
GMAIL_USER=your-company-email@gmail.com

# 1단계에서 발급받은 16자리 앱 비밀번호 (공백 없이 연속해서 입력)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# 실제 문의 메일을 받아볼 관리자 메일 주소
# (비워두면 GMAIL_USER와 동일한 주소로 메일이 발송됩니다)
CONTACT_RECEIVER_EMAIL=admin-receiver-email@gmail.com
```

---

## 3단계: 로컬 개발 서버 재시작

새로운 환경 변수가 메모리에 정상적으로 로드될 수 있도록 기존 터미널 프로세스를 종료하고 재실행합니다.

```bash
# 실행 중인 터미널에서 Ctrl + C를 눌러 종료한 뒤 아래 명령 실행
npm run dev
```

---

## 💡 자주 묻는 질문 (FAQ)

### Q. 'Nodemailer SMTP Error: Invalid login' 오류가 발생합니다.
- `GMAIL_USER` 계정의 2단계 인증이 실제로 활성화되어 있는지 확인해 주세요.
- `GMAIL_APP_PASSWORD`에 공백(띄어쓰기)이 포함되어 있다면 공백을 전부 지우고 16자리 영문만 입력해 주세요.

### Q. 메일이 여전히 수신되지 않습니다.
- Gmail 스팸함을 확인해 주세요.
- `GMAIL_USER` 계정 자체에 구글측 임시 차단(비정상 로그인 시도 감지) 메일이 와 있는지 확인하고 허용해 주시기 바랍니다.
