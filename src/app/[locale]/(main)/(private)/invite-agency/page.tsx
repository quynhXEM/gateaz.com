
import InviteAgency from "@/views/main/InviteAgency";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations();

  return {
    title: t("title"),
  };
};

export default function InviteAgencyPage() {
  return <InviteAgency />;
}
