import crypto from "crypto";

const mysecret_key = process.env.SECRET_KEY || ""
const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update(mysecret_key).digest(); // 32 bytes key
const iv = crypto.randomBytes(16); // mỗi lần random để an toàn

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(data: string) {
  const [ivHex, encrypted] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
