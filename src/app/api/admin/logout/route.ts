import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().delete("admin_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "로그아웃 처리 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
