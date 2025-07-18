import PwaInstallPrompt from "@/commons/components/PwaInstallPrompt";
import { ThemeProvider } from "@/components/theme-provider";
import { MetaDataProvider } from "@/contexts/MetaDataContext";
import { routing } from "@/i18n/routing";
import { fetchAppMetadata } from "@/utils/metadata";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const LocaleLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const metadata = await fetchAppMetadata();
  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MetaDataProvider initialMetadata={metadata}>
          {children}
        </MetaDataProvider>
        <ToastContainer />
        <PwaInstallPrompt metadata={metadata}/>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
