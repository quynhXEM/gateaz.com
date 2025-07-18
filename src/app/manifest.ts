import type { MetadataRoute } from "next";
import { fetchAppMetadata } from "@/utils/metadata";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { icon, name, short_name } = await fetchAppMetadata();
  return {
    name: name,
    short_name: short_name,
    description: name,
    start_url: "/vi-VN/home",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: `${process.env.NEXT_PUBLIC_API_URL}/assets/${icon}}`,
        sizes: "192x192",
        type: "image/png",
      },
    ],
    categories: ["productivity", "utilities"],
    lang: "vi",
    dir: "ltr",
  };
}
