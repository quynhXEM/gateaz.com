"use client";

import {
  Home,
  History,
  QrCode,
  User,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Bell,
  BookOpen,
  Heart,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const addMenuItems = [
  { icon: ArrowUpRight, label: "Chuyển tiền", color: "bg-blue-500" },
  { icon: ArrowDownLeft, label: "Nhận tiền", color: "bg-green-500" },
  { icon: CreditCard, label: "Nạp tiền", color: "bg-orange-500" },
  { icon: QrCode, label: "Quét mã", color: "bg-red-500" },
  { icon: User, label: "Tài khoản", color: "bg-purple-500" },
  { icon: ArrowUpRight, label: "Chuyển tiền", color: "bg-blue-500" },
  { icon: ArrowDownLeft, label: "Nhận tiền", color: "bg-green-500" },
  { icon: CreditCard, label: "Nạp tiền", color: "bg-orange-500" },
];

interface BottomNavigationProps {
  showFloatingMenu: boolean;
  setShowFloatingMenu: (show: boolean) => void;
}

export function BottomNav({
  showFloatingMenu,
  setShowFloatingMenu,
}: BottomNavigationProps) {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // Jackpot text effect
  const jackpotTexts = ["Thêm", "Nhà phân phối", "Người dùng", "Quét mã QR"];
  const [jackpotIndex, setJackpotIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const itemCount = 8; // hoặc addMenuItems.length nếu muốn động
  const snapAngle = 360 / itemCount;

  // Tính index của item trên cùng khi menu mở
  const getActiveMenuIndex = () => {
    // Đưa rotation về [0, 360)
    let deg = ((rotation % 360) + 360) % 360;
    // Tính index, đảo chiều nếu cần
    let idx = Math.round(-deg / snapAngle) % itemCount;
    if (idx < 0) idx += itemCount;
    return idx;
  };
  const activeMenuIndex = getActiveMenuIndex();

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setJackpotIndex((prev) => (prev + 1) % jackpotTexts.length);
        setFlip(false);
      }, 350); // thời gian lật nửa vòng
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - startX.current;
    setRotation(startRotation.current + deltaX);
  };

  const handlePointerUp = () => {
    dragging.current = false;
    // Snap về góc gần nhất
    setRotation((prev) => {
      const snapped = Math.round(prev / snapAngle) * snapAngle;
      return snapped;
    });
  };

  return (
    <>
      <div
        className={`fixed bottom-[-50px] left-0 right-0 duration-500 transform z-0 ${
          !showFloatingMenu && "pointer-events-none"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className={`relative w-[200px] h-[200px] left-1/2 -translate-x-1/2 rounded-full`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: dragging.current
              ? "none"
              : "transform 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        >
          {addMenuItems.map((item, index) => {
            const angle = (360 / 8) * index;
            const radius = showFloatingMenu ? 100 : 0;
            const x = Math.cos((angle * Math.PI) / 180) * radius + 100;
            const y = Math.sin((angle * Math.PI) / 180) * radius + 100;

            return (
              <Button
                key={index}
                className={cn(
                  "absolute w-14 h-14 rounded-full transition-all ease-out transform -translate-x-1/2 -translate-y-1/2",
                  "hover:scale-110"
                )}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                // onClick={() => setShowFloatingMenu(!showFloatingMenu)}
              >
                <item.icon
                  className="h-5 w-5 text-unprimary"
                  style={{ transform: `rotate(${-rotation}deg)` }}
                />
              </Button>
            );
          })}
        </div>
      </div>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card max-h-20 border-t">
        <div className="flex items-center justify-between">
          {/* Home */}
          <Link
            href="/home"
            className="flex flex-[0.7] flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors ",
                pathname === "/home"
                  ? "bg-primary text-unprimary"
                  : "text-muted-foreground"
              )}
            >
              <Home className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-xs transition-colors text-primary text-center text-nowrap",
                pathname === "/home" ? "" : "text-muted-foreground"
              )}
            >
              {t("home")}
            </span>
          </Link>

          {/* Wallet */}
          <Link
            href="/wallet"
            className="flex flex-1 flex-col items-center  justify-start space-y-1 px-3 py-2 rounded-lg transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors ",
                pathname === "/wallet"
                  ? "bg-primary text-unprimary"
                  : "text-muted-foreground"
              )}
            >
              <Wallet className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-xs transition-colors text-primary text-center",
                pathname === "/wallet" ? "" : "text-muted-foreground"
              )}
            >
              {t("wallet")}
            </span>
          </Link>

          {/* Add Button */}
          <div className="flex-1">
            <div
              onClick={() => setShowFloatingMenu(!showFloatingMenu)}
              className="relative flex flex-col items-center group"
            >
              {/* Nút chính */}
              <div
                className={cn(
                  "left-1/2 -translate-x-1/2 absolute bottom-1 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out bg-primary text-white",
                  showFloatingMenu
                    ? "scale-110 rotate-[135deg] ring-4 ring-blue-300"
                    : "hover:scale-105 hover:shadow-xl"
                )}
              >
                <Plus
                  className={cn(
                    "h-6 w-6 transition-transform duration-300 text-unprimary",
                    showFloatingMenu ? "rotate-45" : "rotate-0"
                  )}
                />
              </div>

              {/* Text phía trên */}
              <div
                className={cn(
                  "absolute text-nowrap text-xs text-center transition-all duration-500 transform-gpu rounded-md px-2",
                  showFloatingMenu ? "top-2 scale-100" : "top-0 scale-90"
                )}
              >
                <span className="inline-block px-3 py-1 rounded-md shadow bg-blue-200 text-blue-800 font-medium transition-transform duration-300">
                  {showFloatingMenu
                    ? addMenuItems[activeMenuIndex]?.label
                    : jackpotTexts[jackpotIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* Notification */}
          <Link
            href="/notification"
            className="flex flex-1 flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                pathname === "/notification"
                  ? "bg-primary text-unprimary"
                  : "text-muted-foreground"
              )}
            >
              <Bell className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-xs transition-colors text-primary text-center",
                pathname === "/notification" ? "" : "text-muted-foreground"
              )}
            >
              {t("notification")}
            </span>
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex flex-[0.7] flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                pathname === "/profile"
                  ? "bg-primary text-unprimary"
                  : "text-muted-foreground"
              )}
            >
              <User className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-xs transition-colors text-primary text-center",
                pathname === "/profile" ? "" : "text-muted-foreground"
              )}
            >
              {t("profile")}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
