import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/adminAuth";

// 세션 검증 헬퍼 함수
function checkAuth(): boolean {
  const sessionCookie = cookies().get("admin_session")?.value;
  if (!sessionCookie) return false;

  const decrypted = decryptSession(sessionCookie);
  if (!decrypted) return false;

  try {
    const session = JSON.parse(decrypted);
    const sessionAge = Date.now() - session.createdAt;
    
    // 세션 만료 검증 (2시간)
    if (sessionAge > 60 * 60 * 2 * 1000) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  // 브라우저 폼에 보여주기 위해 마스킹된 환경변수 반환
  return NextResponse.json({
    gmailUser: process.env.GMAIL_USER || "",
    // 보안상 비밀번호는 실제값을 보내지 않고 빈칸이나 별표 처리
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD ? "********" : "",
    receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "",
  });
}

export async function POST(req: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  // Git-backed CMS 구조에서는 .env 수정이 지원되지 않음
  return NextResponse.json(
    { error: "환경변수(SMTP 및 비밀번호) 수정은 Vercel 대시보드(Settings > Environment Variables)에서 직접 변경해야 합니다. 변경 후 Redeploy를 진행해 주세요." },
    { status: 403 }
  );
}
