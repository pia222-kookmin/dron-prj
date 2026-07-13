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

    // 1. 로컬 개발 환경일 경우 로컬 파일 시스템에 저장
    if (process.env.NODE_ENV !== "production") {
      try {
        const contentPath = path.join(process.cwd(), "src", "constants", "content.json");
        fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), "utf-8");
      } catch (e) {
        console.error("Local file write failed", e);
      }
    }

    // 2. GitHub API 연동 (Git-backed CMS)
    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (githubToken && owner && repo) {
      const filePath = "src/constants/content.json";
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      
      // 기존 파일의 SHA 값을 먼저 가져옴
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store"
      });
      
      let sha = undefined;
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // 파일 업데이트(Commit) 요청
      const contentBase64 = Buffer.from(JSON.stringify(contentData, null, 2), "utf-8").toString("base64");
      
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          message: "Admin: Update content.json from CMS",
          content: contentBase64,
          sha: sha,
        }),
      });

      if (!putRes.ok) {
        const errorData = await putRes.json();
        console.error("GitHub API Error:", errorData);
        throw new Error("GitHub 연동에 실패했습니다.");
      }
    } else {
      if (process.env.NODE_ENV === "production") {
        throw new Error("운영 환경입니다. Vercel 환경변수에 GITHUB_TOKEN 등이 설정되지 않았습니다.");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Save content error:", error);
    return NextResponse.json(
      { error: error.message || "콘텐츠 설정을 저장하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
