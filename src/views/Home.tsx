"use client";

import { ModeToggle } from "@/commons/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("title")}</h1>
      <Button>{t("title")}</Button>
      <ModeToggle/>
      <div className="w-full h-screen bg-zinc-950 dark:bg-white" />
    </div>
  );
};

export default Home;