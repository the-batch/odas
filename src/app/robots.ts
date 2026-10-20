import type { MetadataRoute } from "next";

/** Réactiver lors de la mise en production. */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
