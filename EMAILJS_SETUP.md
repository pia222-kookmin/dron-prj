# EmailJS Configuration

EmailJS를 사용하여 백엔드 없이 문의 폼을 구현합니다.

## 설정 방법

1. **EmailJS 계정 생성**
   - https://www.emailjs.com/ 접속
   - 무료 계정 생성 (월 200회 무료)

2. **이메일 서비스 추가**
   - Dashboard → Email Services
   - Gmail, Outlook 등 연결
   - Service ID 복사

3. **이메일 템플릿 생성**
   - Email Templates → Create New Template
   - 템플릿 변수 설정:
     - `{{from_name}}` - 발신자 이름
     - `{{from_email}}` - 발신자 이메일
     - `{{company}}` - 회사명
     - `{{message}}` - 문의 내용
   - Template ID 복사

4. **Public Key 확인**
   - Account → General
   - Public Key 복사

5. **환경 변수 설정**
   - `.env.local.example`을 `.env.local`로 복사
   - 복사한 값들을 입력:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

6. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

## 템플릿 예시

```
새로운 문의가 도착했습니다.

발신자: {{from_name}}
이메일: {{from_email}}
회사: {{company}}

문의 내용:
{{message}}
```

## 참고
- 환경 변수가 설정되지 않으면 모의(mock) 전송 모드로 동작합니다.
- 콘솔에서 전송 데이터를 확인할 수 있습니다.
