import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encryptSession } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 세션 정보 구성 (아이디와 만료 타임스탬프)
    const sessionData = JSON.stringify({
      username,
      createdAt: Date.now(),
    });

    const encryptedSession = encryptSession(sessionData);

    // HttpOnly 쿠키로 세션 저장
    cookies().set("admin_session", encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2시간 유효
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "로그인 처리 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
