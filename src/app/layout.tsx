import { geistMono, geistSans } from "@/assets/font";
import type { Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";
import 'react-phone-input-2/lib/style.css'
import { fetchAppMetadata } from "@/utils/metadata";

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { icon, name } = await fetchAppMetadata();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_API_URL}/assets/${icon}?v=${Date.now()}`} />
        <title>{name}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};
