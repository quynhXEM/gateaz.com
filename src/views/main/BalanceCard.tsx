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
    icon: <ArrowUpRight className="w-5 h-5" />,
    label: "Nạp/Rút",
    color: "text-primary",
  },
  {
    icon: <ArrowDownLeft className="w-5 h-5" />,
    label: "Nhận tiền",
    color: "text-primary",
  },
  {
    icon: <QrCode className="w-5 h-5" />,
    label: "QR Thanh toán",
    color: "text-primary",
  },
  {
    icon: <ScanLine className="w-5 h-5" />,
    label: "Quét mã",
    color: "text-primary",
  },
];

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const { theme } = useTheme();
  return (
    <Card className="w-full flex flex-col shadow-none border-none p-0 gap-3 bg-gradient-to-b from-white/70 to-60% to-sky-500">
      <div className="flex items-center justify-between px-4">
        <p className="text-md font-bold text-gray-900 px-4 pt-2 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-black text-xl xs:text-4xl" />
          Số dư
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="mt-2 text-black cursor-pointer"
        >
          {showBalance ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </Button>
      </div>
      <div className="w-full text-center px-3">
        <span className=" font-bold text-gray-900 text-2xl xs:text-4xl ">
          {showBalance
            ? Number(12345678).toLocaleString("vi-VN")
            : "••••••••••"}
          đ
        </span>
      </div>

      {/* Dãy nút chức năng */}
      <div className="flex w-full justify-around pb-4 mb-2 gap-1">
        {actionButtons.map((btn, idx) => (
          <div key={idx} className="flex flex-1 flex-col items-center cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-unprimary flex items-center justify-center shadow-sm mb-1 w-full max-w-20">
              {btn.icon}
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
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
