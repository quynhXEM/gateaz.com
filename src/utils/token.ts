import Cookies from "js-cookie";
import { decrypt, encrypt } from "./crypto";
const COOKIE_KEY = "session";

/**
 * Lưu session vào cookie
 */
export function setSession({ access_token, refresh_token, expires_at }: any) {
  const session = {
    access_token,
    refresh_token,
    expires_at: Date.now() + 850000,
  };

  const encrypted = encrypt(JSON.stringify(session));

  Cookies.set(COOKIE_KEY, encrypted, {
    path: "/",
    expires: new Date(expires_at), // Hoặc dùng expires: 1 (số ngày)
    secure: true,
    sameSite: "Strict",
  });
}

/**
 * Đọc session từ cookie (client only)
 */
export function getSession(): any | null {
  const encrypted = Cookies.get(COOKIE_KEY);
  if (!encrypted) return null;

  try {
    const decrypted = decrypt(encrypted);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Session parse error:", err);
    return null;
  }
}

/**
 * Kiểm tra session còn hạn hay không
 */
export function isSessionValid() {
  const session = getSession();
  if (!session) return false;

  return Date.now() < session.expires_at;
}

/**
 * Xóa session khỏi cookie
 */
export function clearSession() {
  Cookies.remove(COOKIE_KEY);
}
