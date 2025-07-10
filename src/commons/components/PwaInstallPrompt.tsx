"use client";

import "@khmyznikov/pwa-install";
import { useEffect, useRef, useState } from "react";

// Hằng số thời gian giữa các lần hiển thị lại (ms)
const PROMPT_REPEAT_INTERVAL = 1000 * 60 * 60;

export default function PwaInstallPrompt() {
  const ref = useRef<any>(null);
  const [shouldShow, setShouldShow] = useState(false);

  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true);

  // Kiểm tra xem có hiển thị lại không
  useEffect(() => {
    if (isStandalone) return;

    const lastDismiss = localStorage.getItem("pwa-prompt-dismissed-at");
    const now = Date.now();

    if (!lastDismiss || now - parseInt(lastDismiss) > PROMPT_REPEAT_INTERVAL) {
      setShouldShow(true);
    }
  }, []);

  // Khi người dùng tắt popup → lưu thời điểm
  const handleClose = () => {
    localStorage.setItem("pwa-prompt-dismissed-at", Date.now().toString());
    setShouldShow(false);
  };

  // Lắng nghe event đóng popup
  useEffect(() => {
    if (shouldShow && ref.current) {
      ref.current.addEventListener("closed", handleClose);
    }
    return () => {
      ref.current?.removeEventListener("closed", handleClose);
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <pwa-install
      ref={ref}
      manifest-url="/manifest.json"
      icon="/icon-192x192.png"
      description="Cài ứng dụng để có trải nghiệm tốt hơn"
      display-mode="standalone"
      lang="vi"
      title="Cài đặt ứng dụng"
      install-button-text="Cài ngay"
      cancel-button-text="Để sau"
      ios-instructions="Trên iOS, nhấn nút chia sẻ Safari và chọn 'Thêm vào Màn hình chính'."
      android-instructions="Trên Android, nhấn nút menu trình duyệt và chọn 'Cài đặt ứng dụng'."
      platform="auto"
      style={{ zIndex: 9999 }}
    />
  );
}
