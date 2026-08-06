import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theaigleonlabs.dev";
  const currentDate = new Date().toISOString();

  // Primary public routes
  const routes = [
    "",
    "/services",
    "/work",
    "/process",
    "/pricing",
    "/story",
    "/library",
    "/contact",
    "/faq",
    "/testimonials",
    "/tabun-chai",
  ];

  return routes.map((route) => {
    let priority = 0.8;
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly";

    if (route === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/services" || route === "/work" || route === "/library") {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route === "/pricing" || route === "/process" || route === "/contact") {
      priority = 0.8;
      changeFrequency = "monthly";
    } else {
      priority = 0.7;
      changeFrequency = "monthly";
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    };
  });
}
