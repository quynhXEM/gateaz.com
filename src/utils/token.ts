import { decrypt, encrypt } from "./crypto";

const SESSION_KEY = "session";

/**
 * Lưu session vào sessionStorage
 * @param {string} accessToken
 * @param {string} refreshToken
 * @param {number} expiresIn - Thời gian sống của accessToken (tính bằng giây)
 */
export function setSession({
  access_token,
  refresh_token,
  expires_at,
}: any) {
  const session = {
    access_token: access_token,
    refresh_token: refresh_token,
    expires_at: expires_at,
  };

  sessionStorage.setItem(SESSION_KEY, encrypt(JSON.stringify(session)));
}

/**
 * Đọc session từ sessionStorage
 * @returns {{access_token: string, refresh_token: string, expires_at: number} | null}
 */
export function getSession() {
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;

  try {
    const decrypted = decrypt(data);
    const parsed = JSON.parse(decrypted);
    return parsed;
  } catch (err) {
    console.error("Session parse error:", err);
    return null;
  }
}

/**
 * Kiểm tra session còn hạn hay không
 * @returns {boolean}
 */
export function isSessionValid() {
  const session = getSession();
  if (!session) return false;

  return Date.now() < session.expires_at;
}

/**
 * Xóa session khỏi sessionStorage
 */
export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
