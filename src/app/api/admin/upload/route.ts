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
    
    // 2시간 유효성 확인
    if (sessionAge > 60 * 60 * 2 * 1000) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

export async function POST(req: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "권한이 없습니다. 먼저 로그인해 주세요." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "업로드된 파일이 없습니다." }, { status: 400 });
    }

    // 파일 데이터를 Buffer로 변환
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 파일명 인코딩 안전화 및 타임스탬프 부여
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_가-힣]/g, "_");
    const filename = `${Date.now()}-${cleanFileName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // uploads 폴더가 없으면 자동 생성
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "파일 업로드 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
