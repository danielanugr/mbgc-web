import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import {
  EXPERIMENTAL_getAllEvents,
  EXPERIMENTAL_getAllGalleries,
} from "@/sanity/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbgc.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base static routes
  const routes = ["", "/events", "/gallery", "/inventory", "/about"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  try {
    // Dynamic event routes
    const events = await client.fetch(EXPERIMENTAL_getAllEvents);
    const eventRoutes = events.map((event: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      url: `${baseUrl}/events/${event.slug.current}`,
      lastModified: event._updatedAt ? new Date(event._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    // Dynamic gallery routes
    const galleries = await client.fetch(EXPERIMENTAL_getAllGalleries);
    const galleryRoutes = galleries.map((gallery: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      url: `${baseUrl}/gallery/${gallery.slug.current}`,
      lastModified: gallery._updatedAt
        ? new Date(gallery._updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    return [...routes, ...eventRoutes, ...galleryRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static routes if CMS fetch fails
    return routes;
  }
}
