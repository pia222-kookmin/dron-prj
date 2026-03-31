import emailjs from "@emailjs/browser";

// EmailJS 설정 (환경 변수 사용)
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const INQUIRY_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_INQUIRY_EMAIL === "true";

interface EmailData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function isInquiryEmailEnabled(): boolean {
  return INQUIRY_ENABLED;
}

export async function sendEmail(data: EmailData): Promise<void> {
  if (!INQUIRY_ENABLED) {
    throw new Error("INQUIRY_DISABLED");
  }

  // EmailJS가 설정되지 않았을 경우 모의 전송
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured. Simulating email send...");
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mock email sent:", data);
        resolve();
      }, 1000);
    });
  }

  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      company: data.company || "미입력",
      message: data.message,
      to_name: "Drone Engine Team",
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error("이메일 전송에 실패했습니다.");
  }
}
