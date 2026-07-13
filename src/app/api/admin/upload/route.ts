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
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // 파일명 안전화 및 타임스탬프 부여
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_가-힣]/g, "_");
    const filename = `${Date.now()}-${cleanFileName}`;
    const publicUrl = `/uploads/${filename}`;

    // 1. 로컬 환경 처리: 기존처럼 로컬 파일시스템에 저장
    if (process.env.NODE_ENV !== "production") {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);
      } catch (e) {
        console.error("Local file save error:", e);
      }
    }

    // 2. GitHub 연동 처리 (Git-backed CMS)
    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (githubToken && owner && repo) {
      const filePath = `public/uploads/${filename}`;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      
      const fileBase64 = buffer.toString("base64");
      
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          message: `Admin: Upload image ${filename}`,
          content: fileBase64,
        }),
      });

      if (!putRes.ok) {
        const errorData = await putRes.json();
        console.error("GitHub API Image Upload Error:", errorData);
        throw new Error("GitHub에 이미지를 업로드하는데 실패했습니다.");
      }
    } else {
      if (process.env.NODE_ENV === "production") {
        throw new Error("운영 환경입니다. Vercel 환경변수에 GITHUB_TOKEN 등이 설정되지 않았습니다.");
      }
    }

    // 중요: GitHub로 Push되어도 Vercel에서 리빌드되기 전까지는 해당 경로에 이미지가 없습니다.
    // 하지만 일단 DB(content.json)에 경로를 저장해야 하므로 URL을 반환합니다.
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "파일 업로드 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
