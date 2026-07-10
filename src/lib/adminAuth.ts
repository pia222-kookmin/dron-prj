import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET = process.env.ADMIN_SESSION_SECRET || "dron_kookmin_web_admin_secret_key_32_chars_long!!";

// SHA-256 해시를 이용해 항상 32바이트(256비트) 키 보장
const KEY = crypto.createHash("sha256").update(SECRET).digest();
const IV_LENGTH = 16;

/**
 * 관리자 세션 데이터를 암호화합니다.
 */
export function encryptSession(data: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

/**
 * 암호화된 관리자 세션 데이터를 복호화합니다.
 */
export function decryptSession(text: string): string | null {
  try {
    const textParts = text.split(":");
    const ivHex = textParts.shift();
    const encryptedHex = textParts.join(":");
    if (!ivHex || !encryptedHex) return null;

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    return null;
  }
}
