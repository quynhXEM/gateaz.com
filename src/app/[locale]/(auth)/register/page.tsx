
import RegisterPage from "@/views/auth/Register";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations();

  return {
    title: t("title"),
  };
};

export default function HomePage() {
  return <RegisterPage />;
}
