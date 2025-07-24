"use client";

import type React from "react";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/libs/utils";
import LocaleDropdown from "../components/LocaleDropdown";
import ThemeToggle from "../components/ThemeToggle";
import NavContent from "./NavContent";
import AuthButton from "../components/AuthButton";
import { BottomNav } from "./BottomNav";

export function Navigation({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Global Header */}
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
            <SheetTitle />
            <div className="p-4 h-full overflow-y-auto scrollbar-hide">
              <NavContent collapsed={sidebarCollapsed} setOpen={setOpen} />
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
        <div className="flex ml-auto gap-2">
          <LocaleDropdown />
          <ThemeToggle />
          <AuthButton/>
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
            <NavContent collapsed={sidebarCollapsed} setOpen={setOpen}/>
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
        <main className="p-4 pb-24 overflow-x-hidden">{children}</main>

        {/* Mobile Footer Navigation */}
        <BottomNav
          setShowFloatingMenu={setShowFloatingMenu}
          showFloatingMenu={showFloatingMenu}
        />
      </div>
    </div>
  );
}
