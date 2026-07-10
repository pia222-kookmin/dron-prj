import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

// 세션 검증 헬퍼
function checkAuth(): boolean {
  const sessionCookie = cookies().get("admin_session")?.value;
  if (!sessionCookie) return false;

  const decrypted = decryptSession(sessionCookie);
  if (!decrypted) return false;

  try {
    const session = JSON.parse(decrypted);
    const sessionAge = Date.now() - session.createdAt;
    
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

  try {
    const contentPath = path.join(process.cwd(), "src", "constants", "content.json");
    if (!fs.existsSync(contentPath)) {
      return NextResponse.json({ error: "content.json 파일을 찾을 수 없습니다." }, { status: 404 });
    }

    const data = fs.readFileSync(contentPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    return NextResponse.json(
      { error: "콘텐츠 설정을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  try {
    const contentData = await req.json();

    if (!contentData || typeof contentData !== "object") {
      return NextResponse.json({ error: "올바르지 않은 양식의 데이터입니다." }, { status: 400 });
    }

    const contentPath = path.join(process.cwd(), "src", "constants", "content.json");
    
    // JSON 파일 갱신
    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Save content error:", error);
    return NextResponse.json(
      { error: "콘텐츠 설정을 저장하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
