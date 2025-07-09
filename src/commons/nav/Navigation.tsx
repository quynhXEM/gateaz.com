"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  Settings,
  Menu,
  Phone,
  Plane,
  Building,
  Receipt,
  ArrowRightLeft,
  Bus,
  Film,
  ShoppingCart,
  Gift,
  User,
  Zap,
  PenTool,
  Languages,
  Globe,
  Mic,
  Plus,
  Heart,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navItems = [
  {
    section: "Menu chính",
    items: [
      { href: "/", label: "Trang chủ", icon: Home },
      { href: "/wallet", label: "Ví của tôi", icon: Wallet },
      { href: "/add", label: "Thêm mới", icon: Plus },
    ],
  },
  {
    section: "Dịch vụ",
    items: [
      { href: "/topup", label: "Nạp thẻ điện thoại", icon: Phone },
      { href: "/flight", label: "Đặt vé máy bay", icon: Plane },
      { href: "/hotel", label: "Đặt phòng khách sạn", icon: Building },
      { href: "/bills", label: "Thanh toán hóa đơn", icon: Receipt },
      { href: "/transfer", label: "Chuyển tiền", icon: ArrowRightLeft },
      { href: "/transport", label: "Mua vé xe", icon: Bus },
      { href: "/movie", label: "Đặt vé xem phim", icon: Film },
      { href: "/shopping", label: "Mua sắm online", icon: ShoppingCart },
    ],
  },
  {
    section: "Công cụ AI",
    items: [
      { href: "/tools/social-boost", label: "Đẩy Mạng Xã Hội", icon: Zap },
      { href: "/tools/ai-writer", label: "AI Viết Bài", icon: PenTool },
      { href: "/tools/translator", label: "Dịch Văn Bản", icon: Languages },
      { href: "/tools/domain", label: "Công Cụ Tên Miền", icon: Globe },
      { href: "/tools/voice-box", label: "Voice Box", icon: Mic },
    ],
  },
  {
    section: "Khác",
    items: [
      { href: "/promotions", label: "Khuyến mãi", icon: Gift },
      { href: "/favorite", label: "Yêu thích", icon: Heart },
      { href: "/course", label: "Khóa học", icon: BookOpen },
      { href: "/account", label: "Tài khoản", icon: User },
      { href: "/settings", label: "Cài đặt", icon: Settings },
    ],
  },
];

export function Navigation({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="space-y-6">
      {navItems.map((section) => (
        <div key={section.section}>
          {!collapsed && (
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
              {section.section}
            </h3>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg transition-colors text-sm px-3",
                    collapsed
                      ? "justify-center p-3 mx-1"
                      : "space-x-3 px-3 py-2",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 mx-3",
                      collapsed ? "flex-shrink-0" : ""
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Global Header với nút toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card p-4 flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 lg:hidden">
            <div className="py-6 h-full overflow-y-auto scrollbar-hide">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        {/* Desktop toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-3 hidden lg:flex"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Wallet App</h1>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <div
          className={cn(
            "border-r bg-card fixed h-full transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          {/* Header với logo */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                VĐ
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold">Ví Điện Tử</h1>
                  <p className="text-xs text-muted-foreground">
                    Thanh toán thông minh
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Content */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-120px)] scrollbar-hide">
            <NavContent collapsed={sidebarCollapsed} />
          </div>
        </div>

        <div
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          <main className="p-6">{children}</main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden overflow-x-hidden">
        {/* Mobile Content */}
        <main className="p-4 pb-20 overflow-x-hidden">{children}</main>

        {/* Mobile Footer Navigation - 5 tabs như trong hình */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card">
          <div className="flex items-center justify-around py-2 px-2">
            {/* Home */}
            <Link
              href="/"
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  pathname === "/"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                )}
              >
                <Home className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-xs transition-colors",
                  pathname === "/"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                Home
              </span>
            </Link>

            {/* Favorite */}
            <Link
              href="/favorite"
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  pathname === "/favorite"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                )}
              >
                <Heart className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-xs transition-colors",
                  pathname === "/favorite"
                    ? "text-red-500 font-medium"
                    : "text-muted-foreground"
                )}
              >
                Favorite
              </span>
            </Link>

            {/* Center Add Button - Prominent */}
            <div
              onClick={() => setShowFloatingMenu(!showFloatingMenu)}
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg",
                  showFloatingMenu
                    ? "bg-primary text-white scale-110 rotate-45"
                    : "bg-primary/90 text-white hover:bg-primary hover:scale-105"
                )}
              >
                <Plus className="h-6 w-6" />
              </div>
            </div>

            {/* Floating Menu Overlay */}
            {showFloatingMenu && (
              <>
                {/* Background overlay */}
                <div
                  className="fixed inset-0 bg-black/20 z-40"
                  onClick={() => setShowFloatingMenu(false)}
                />

                {/* Floating menu */}
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-blue-500 rounded-3xl px-6 py-4 shadow-2xl">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => {
                          setShowFloatingMenu(false);
                          window.location.href = "/transfer";
                        }}
                        className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <ArrowRightLeft className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowFloatingMenu(false);
                          window.location.href = "/topup";
                        }}
                        className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Phone className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowFloatingMenu(false);
                          window.location.href = "/bills";
                        }}
                        className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Receipt className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowFloatingMenu(false);
                          window.location.href = "/flight";
                        }}
                        className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Plane className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowFloatingMenu(false);
                          window.location.href = "/wallet";
                        }}
                        className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Wallet className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Profile */}
            <Link
              href="/account"
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  pathname === "/account"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                )}
              >
                <User className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-xs transition-colors",
                  pathname === "/account"
                    ? "text-blue-500 font-medium"
                    : "text-muted-foreground"
                )}
              >
                Profile
              </span>
            </Link>

            {/* Course */}
            <Link
              href="/course"
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  pathname === "/course"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                )}
              >
                <BookOpen className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-xs transition-colors",
                  pathname === "/course"
                    ? "text-green-500 font-medium"
                    : "text-muted-foreground"
                )}
              >
                Course
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
