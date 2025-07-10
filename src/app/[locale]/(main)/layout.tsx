import { Navigation } from "@/commons/nav/Navigation";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
const MainLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  return (
    <Navigation>
      {children}
      <ToastContainer />
    </Navigation>
  );
};

export default MainLayout;
