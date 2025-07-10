import { Bell, BookOpen, Heart, Home, Plus, User, Wallet } from "lucide-react";
import Link from "next/link";
import BottomFloating from "./BottomFloating";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function BottomNav({
  setShowFloatingMenu,
  showFloatingMenu,
}: {
  setShowFloatingMenu: any;
  showFloatingMenu: boolean;
}) {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-card">
      <div className="flex items-center justify-around py-2 px-2">
        {/* Home */}
        <Link
          href="/home"
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
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
              "text-xs transition-colors text-primary",
              pathname === "/home" ? "" : "text-muted-foreground"
            )}
          >
            {t("home")}
          </span>
        </Link>

        {/* Wallet */}
        <Link
          href="/wallet"
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
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
              "text-xs transition-colors text-primary",
              pathname === "/wallet" ? "" : "text-muted-foreground"
            )}
          >
            {t("wallet")}
          </span>
        </Link>

        {/* Center Add Button - Prominent */}
        <div
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
        >
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg bg-white dark:bg-white",
              showFloatingMenu
                ? "bg-primary text-white scale-110 rotate-45"
                : "bg-primary text-white hover:bg-primary hover:scale-105"
            )}
          >
            <Plus className="h-6 w-6 text-white dark:text-black" />
          </div>
        </div>

        {/* Floating Menu Overlay */}
        {showFloatingMenu && (
          <BottomFloating setShowFloatingMenu={setShowFloatingMenu} />
        )}

        {/* Notification */}
        <Link
          href="/notification"
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
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
              "text-xs transition-colors text-primary",
              pathname === "/notification" ? "" : "text-muted-foreground"
            )}
          >
            {t("notification")}
          </span>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors"
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
              "text-xs transition-colors text-primary",
              pathname === "/profile" ? "" : "text-muted-foreground"
            )}
          >
            {t("profile")}
          </span>
        </Link>
      </div>
    </div>
  );
}
