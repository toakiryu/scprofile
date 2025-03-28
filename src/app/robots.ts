import { MetadataRoute } from "next";
import config from "../../_config/richtpl.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api"],
    },
    sitemap: `${config.url}/sitemap.xml`,
    ...config.themeConfig.robots,
  };
}
