import { Navigation } from "@/commons/nav/Navigation";
import { ReactNode } from "react";

const MainLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  return <Navigation>{children}</Navigation>;
};

export default MainLayout;
