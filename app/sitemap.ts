import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/* XML-Sitemap (SEO-/GEO-Richtlinien 1.1). Nur indexierbare Seiten:
   Die Rechtstexte sind bewusst auf noindex gesetzt und daher nicht enthalten. */

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
