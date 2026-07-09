interface EmailData {
  name: string;
  email: string;
  company: string;
  message: string;
}

// 이메일 문의 기능 활성화 상태를 클라이언트가 확인할 수 있는 헬퍼
export function isInquiryEmailEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL === "true";
}

// 백엔드 API Route(/api/contact)를 호출하여 메일 발송을 요청하는 함수
export async function sendEmail(data: EmailData): Promise<void> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errResponse = await response.json().catch(() => ({}));
      throw new Error(errResponse.error || "서버에서 오류를 반환했습니다.");
    }
  } catch (error: any) {
    console.error("sendEmail Error:", error);
    throw new Error(error.message || "이메일 전송에 실패했습니다.");
  }
}
