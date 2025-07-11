"use client";

import "@khmyznikov/pwa-install";
import { useEffect, useRef, useState } from "react";

// Hằng số thời gian giữa các lần hiển thị lại (ms)
const PROMPT_REPEAT_INTERVAL = 1000 * 60 * 60;

export default function PwaInstallPrompt() {
  const ref = useRef<any>(null);

  useEffect(() => {
    const install = sessionStorage.getItem("pwa-hide-install");
    if (install) {
      const time = sessionStorage.getItem("pwa-hide-time") || 0;
      if (Number(time) < Date.now() || !time) {
        sessionStorage.removeItem("pwa-hide-install");
        sessionStorage.removeItem("pwa-hide-time");
        window.location.reload();
      }
    } else {
      sessionStorage.setItem(
        "pwa-hide-time",
        (Date.now() + PROMPT_REPEAT_INTERVAL).toString()
      );
    }
  }, []);
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
