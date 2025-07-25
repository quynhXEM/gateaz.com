import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  ScanLine,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";

const actionButtons = [
  {
    icon: ArrowUpRight,
    label: "Nạp/Rút",
    color: "text-primary",
  },
  {
    icon: ArrowDownLeft,
    label: "Nhận tiền",
    color: "text-primary",
  },
  {
    icon: QrCode,
    label: "QR Thanh toán",
    color: "text-primary",
  },
  {
    icon: ScanLine,
    label: "Quét mã",
    color: "text-primary",
  },
];

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const { theme } = useTheme();
  return (
    <Card className="w-full flex flex-col shadow-none border-none p-0 gap-3 bg-gradient-to-b from-transparent to-60% to-sky-500">
      <div className="flex items-center justify-between px-4">
        <p className="text-md font-bold text-gray-900 px-4 pt-2 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-white text-xl" />
          <span className=" font-bold text-white text-xl">
            {showBalance
              ? Number(12345678).toLocaleString("vi-VN")
              : "••••••••••"}
            đ
          </span>
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="mt-2 text-white cursor-pointer"
        >
          {showBalance ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Dãy nút chức năng */}
      <div className="flex w-full justify-around pb-4 mb-2 gap-1">
        {actionButtons.map((btn, idx) => (
          <div key={idx} className="flex flex-col items-center cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-1 max-w-20">
              <btn.icon className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-medium text-white text-center">
              {btn.label}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg
          viewBox="0 0 1000 90"
          preserveAspectRatio="none"
          className="w-full h-full border-0"
        >
          <path
            d="M0,50 C800,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill={theme === "dark" ? "black" : "white"}
          />
        </svg>
      </div>
    </Card>
  );
}
