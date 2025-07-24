"use client"

import {
  Home,
  History,
  QrCode,
  User,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  Zap,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { cn } from "@/libs/utils"

const navItems = [
  { icon: Home, label: "Trang chủ", active: true },
  { icon: History, label: "Lịch sử", active: false },
  { icon: QrCode, label: "Quét mã", active: false },
  { icon: User, label: "Tài khoản", active: false },
]

const addMenuItems = [
  { icon: ArrowUpRight, label: "Chuyển tiền", color: "bg-blue-500" },
  { icon: ArrowDownLeft, label: "Nhận tiền", color: "bg-green-500" },
  { icon: CreditCard, label: "Nạp tiền", color: "bg-orange-500" },
  { icon: Smartphone, label: "Mua thẻ", color: "bg-purple-500" },
  { icon: Zap, label: "Thanh toán", color: "bg-yellow-500" },
  { icon: Gift, label: "Ưu đãi", color: "bg-pink-500" },
]

interface BottomNavigationProps {
  showFloatingMenu: boolean
  setShowFloatingMenu: (show: boolean) => void
}

export function BottomNav({ showFloatingMenu, setShowFloatingMenu }: BottomNavigationProps) {
  const [rotation, setRotation] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startRotation = useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startRotation.current = rotation
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const deltaX = e.clientX - startX.current
    setRotation(startRotation.current + deltaX)
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  return (
    <>
      {/* Add Menu Items */}
      {showFloatingMenu && (
        <div
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-0"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="relative w-0 h-0">
            {addMenuItems.map((item, index) => {
              const anglePerItem = 360 / addMenuItems.length
              const angle = index * anglePerItem + rotation
              const radius = 85
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <Button
                  key={index}
                  className={cn(
                    "absolute w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 z-0",
                    item.color,
                    "hover:scale-110"
                  )}
                  style={{
                    left: `${x}px`,
                    bottom: `${-y}px`,
                  }}
                  onClick={() => setShowFloatingMenu(!showFloatingMenu)}
                >
                  <item.icon
                    className="h-5 w-5 text-white"
                    style={{
                      transform: `rotate(${-rotation}deg)`, // giữ icon không bị quay theo vòng
                    }}
                  />
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t z-10">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.slice(0, 2).map((item, index) => (
            <Button key={index} variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3">
              <item.icon className={cn("h-6 w-6", item.active ? "text-primary-main" : "text-muted-foreground")} />
              <span className={cn("text-xs", item.active ? "text-primary-main font-medium" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Button>
          ))}

          {/* Add Button */}
          <Button
            onClick={() => setShowFloatingMenu(!showFloatingMenu)}
            className={cn(
              "w-14 h-14 rounded-full bg-gradient-to-r from-primary-main to-primary-dark shadow-lg transition-all duration-300 z-10",
              showFloatingMenu && "rotate-45 scale-110"
            )}
          >
            <Plus className="h-8 w-8 text-white" />
          </Button>

          {navItems.slice(2).map((item, index) => (
            <Button key={index + 2} variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 px-3">
              <item.icon className={cn("h-6 w-6", item.active ? "text-primary-main" : "text-muted-foreground")} />
              <span className={cn("text-xs", item.active ? "text-primary-main font-medium" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
