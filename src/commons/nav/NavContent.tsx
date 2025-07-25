import Link from "next/link";
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
  Handshake,
  UserRoundPlus,
  ScanQrCode,
  LogOutIcon,
} from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
import { logoutHandle } from "@/services/AuthService";

const navItems = [
  {
    section: "Menu chính",
    items: [
      { href: "/home", label: "home", icon: Home },
      { href: "/wallet", label: "wallet", icon: Wallet },
      { href: "/invite-user", label: "invite_user", icon: Handshake },
    ],
  },
  {
    section: "Dịch vụ",
    items: [
      { href: "/topup", label: "topup", icon: Phone },
      { href: "/flight", label: "flight", icon: Plane },
      { href: "/hotel", label: "hotel", icon: Building },
      { href: "/bills", label: "bills", icon: Receipt },
      { href: "/transfer", label: "transfer", icon: ArrowRightLeft },
      { href: "/transport", label: "transport", icon: Bus },
      { href: "/movie", label: "movie", icon: Film },
      { href: "/shopping", label: "shopping", icon: ShoppingCart },
    ],
  },
  {
    section: "Công cụ AI",
    items: [
      { href: "/tools/social-boost", label: "social_boost", icon: Zap },
      { href: "/tools/ai-writer", label: "ai_writer", icon: PenTool },
      { href: "/tools/translator", label: "translator", icon: Languages },
      { href: "/tools/domain", label: "domain", icon: Globe },
      { href: "/tools/voice-box", label: "voice_box", icon: Mic },
    ],
  },
  {
    section: "Khác",
    items: [
      { href: "/promotions", label: "promotions", icon: Gift },
      { href: "/favorite", label: "favorite", icon: Heart },
      { href: "/course", label: "course", icon: BookOpen },
      { href: "/account", label: "account", icon: User },
      { href: "/settings", label: "settings", icon: Settings },
    ],
  },
];

export default function NavContent({
  collapsed = false,
  setOpen,
}: {
  collapsed?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const router = useRouter();
  const logout = () => {
    router.push("/login")
    logoutHandle();
  }
  
  return (
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
              const isActive = pathname.endsWith(item.href);
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
                      ? "bg-gradient-to-l from-white dark:from-transparent to-sky-500 to-40% text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  title={collapsed ? t(item.label) : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 mx-3",
                      collapsed ? "flex-shrink-0" : ""
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{t(item.label)}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div
        onClick={logout}
        className={cn(
          "flex mb-10 items-center rounded-lg transition-colors text-sm px-3 cursor-pointer",
          collapsed ? "justify-center p-3 mx-1" : "space-x-3 px-3 py-2",
          "hover:bg-accent hover:text-accent-foreground"
        )}>
        <LogOutIcon
          className={cn("h-4 w-4 mx-3", collapsed ? "flex-shrink-0" : "")}
        />
        {!collapsed && <span className="truncate">{t("logout")}</span>}
      </div>
    </div>
  );
}
