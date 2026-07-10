import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // 필수 입력 필드 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 문의 내용은 필수 입력 항목입니다." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || "";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || "";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

    // 만약 구글 계정 정보가 없다면 개발자/테스트용 Mock 모드로 동작
    if (!gmailUser || !gmailAppPassword) {
      console.warn(
        "[Mock SMTP] GMAIL_USER 또는 GMAIL_APP_PASSWORD 환경 변수가 설정되지 않았습니다. 메일 발송 시뮬레이션을 수행합니다."
      );
      console.log("[Mock SMTP] 발송 데이터:", {
        name,
        email,
        company: company || "미입력",
        message,
      });

      // 개발 및 테스트 목적이므로 1초 딜레이를 주어 실제 로딩감을 부여
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json({
        success: true,
        message: "모의 전송이 성공적으로 완료되었습니다.",
      });
    }

    // SMTP 전송기(Transporter) 구성
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // 보낸사람 표시 이름 구성 (회사명이 있으면 회사명, 없으면 이메일 표시)
    const senderName = company && company.trim() ? `${name} (${company.trim()})` : `${name} (${email})`;

    // 메일 옵션 설정
    const mailOptions = {
      from: `"${senderName}" <${gmailUser}>`, // Gmail SMTP는 발신 주소를 인증된 계정으로 고정하므로 표시 이름만 활용
      to: receiverEmail,
      replyTo: email, // 관리자가 메일함에서 바로 고객에게 회신 가능하도록 회신 주소 설정
      subject: `[차세대 드론 엔진] 홈페이지 문의 - ${name}님`,
      text: `
새로운 문의가 접수되었습니다.

이름: ${name}
이메일: ${email}
회사/조직: ${company || "미입력"}

문의 내용:
${message}
      `,
      html: `
        <div style="font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <h1 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 15px; margin-top: 0;">📬 새로운 문의가 도착했습니다</h1>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 1.2em;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #64748b;">이름</td>
              <td style="padding: 8px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">이메일</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">회사/조직</td>
              <td style="padding: 8px 0; color: #0f172a;">${company || "미입력"}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #0ea5e9; border-radius: 6px; font-size: 1.2em;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #475569;">문의 내용</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #334155;">${message}</p>
          </div>

          <div style="margin-top: 35px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            본 메일은 홈페이지의 문의 접수 기능을 통해 자동 생성되어 발송되었습니다.
          </div>
        </div>
      `,
    };

    // 메일 발송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer SMTP Error:", error);
    
    const errorMsg = (error.message || "").toLowerCase();
    if (
      errorMsg.includes("limit exceeded") || 
      errorMsg.includes("quota") || 
      errorMsg.includes("too many messages") ||
      errorMsg.includes("sending limit")
    ) {
      return NextResponse.json(
        { error: "QUOTA_EXCEEDED" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "이메일 전송 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
