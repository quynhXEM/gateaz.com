import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/vi-VN/home",
      permanent: true,
      locale: false,
    },
    // Tự động redirect khi không có locale và không phải là file liên quan đến PWA
    {
      source: "/:path((?!vi-VN|en-US|manifest\\.json|manifest\\.ts|manifest\\.webmanifest|sw\\.js|icon-192x192\\.png|icon-512x512\\.png|favicon\\.ico|vercel\\.svg|next\\.svg|window\\.svg|file\\.svg|globe\\.svg).*)",
      destination: "/vi-VN/:path",
      permanent: true,
      locale: false,
    },
    // 2 Tự đông redirect khi có locale
    {
      source:
        "/((?!vi-VN|en-US|front-pages|favicon\\.ico|sw\\.js|images(?:/.*)?$).*)",
      destination: "/vi-VN/:path*",
      has: [
        {
          type: "query",
          key: "path",
        },
      ],
      permanent: true,
      locale: false,
    },
    {
      source: "/:locale(vi-VN|en-US)",
      destination: "/:locale/home",
      permanent: true,
      locale: false,
    },
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
