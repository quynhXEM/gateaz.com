import { Handshake, ScanQrCode, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const FloatingMenu = [
  { icon: UserRoundPlus, href: "/invite-user", label: "invite_user" },
  { icon: Handshake, href: "/invite-agency", label: "invite_agency" },
  { icon: ScanQrCode, href: "/scan-qr", label: "scan_qr" },
];

export default function BottomFloating({
  setShowFloatingMenu,
}: {
  setShowFloatingMenu: any;
}) {
  const t = useTranslations("navigation");
  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => setShowFloatingMenu(false)}
      />

      {/* Floating menu */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-primary rounded-3xl px-6 py-4 shadow-2xl">
          <div className="flex items-center space-x-6">
            {FloatingMenu.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setShowFloatingMenu(false)}
                className="flex flex-col items-center space-y-1"
              >
                <div className="w-12 h-12 bg-white/20 dark:bg-white rounded-xl flex items-center justify-center transition-colors">
                  <item.icon className="h-5 w-5 text-unprimary" />
                </div>
                <span className="text-xs text-white dark:text-black text-center text-nowrap">
                  {t(item.label)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
