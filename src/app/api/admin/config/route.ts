import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

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

// .env.local 파일 및 process.env 업데이트 함수
function updateEnvFile(updates: Record<string, string>) {
  const envPath = path.join(process.cwd(), ".env.local");
  let content = "";
  
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, "utf-8");
  }

  const lines = content.split(/\r?\n/);
  const updatedLines = [...lines];

  for (const [key, val] of Object.entries(updates)) {
    // 메모리(process.env) 즉시 업데이트
    process.env[key] = val;

    let keyFound = false;
    for (let i = 0; i < updatedLines.length; i++) {
      const line = updatedLines[i].trim();
      if (line.startsWith("#") || !line) continue;
      
      const parts = line.split("=");
      if (parts[0] === key) {
        updatedLines[i] = `${key}=${val}`;
        keyFound = true;
        break;
      }
    }
    
    if (!keyFound) {
      updatedLines.push(`${key}=${val}`);
    }
  }

  fs.writeFileSync(envPath, updatedLines.join("\n"), "utf-8");
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  return NextResponse.json({
    gmailUser: process.env.GMAIL_USER || "",
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD || "",
    receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "",
  });
}

export async function POST(req: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  try {
    const { gmailUser, gmailAppPassword, receiverEmail } = await req.json();

    if (!gmailUser || !gmailAppPassword || !receiverEmail) {
      return NextResponse.json(
        { error: "모든 필드(발신 Gmail, 앱 비밀번호, 수신 이메일)를 올바르게 채워주세요." },
        { status: 400 }
      );
    }

    updateEnvFile({
      GMAIL_USER: gmailUser.trim(),
      GMAIL_APP_PASSWORD: gmailAppPassword.trim(),
      CONTACT_RECEIVER_EMAIL: receiverEmail.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "환경변수 설정값 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
