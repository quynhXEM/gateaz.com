import ScanQR from "@/views/main/ScanQR";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations();

  return {
    title: t("title"),
  };
};

export default function ScanQRPage() {
  return <ScanQR />;
}
