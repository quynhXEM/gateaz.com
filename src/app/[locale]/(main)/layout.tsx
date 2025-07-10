import { Navigation } from "@/commons/nav/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";
const MainLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  return (
    <AuthProvider>
      <Navigation>{children}</Navigation>
    </AuthProvider>
  );
};

export default MainLayout;
