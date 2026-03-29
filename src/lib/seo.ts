import { Metadata } from "next";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbgc.site";
type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
};

export const defaultMetadata = {
  title: "Mataram Board Game Community",
  description:
    "Pusat informasi kegiatan playday, gallery, dan review Mataram Board Game.",
  image: "/logo_orange_peach.png",
};

/**
 * Generate standard and Open Graph meta tags for Next.js app router pages
 */
export function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = "website",
}: SEOProps = {}): Metadata {
  const metaTitle = title
    ? `${title} | Mataram Board Game Community`
    : defaultMetadata.title;

  const metaDescription = description || defaultMetadata.description;
  const metaImage = image || defaultMetadata.image;
  const metaUrl = url ? `${defaultUrl}${url}` : defaultUrl;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(defaultUrl),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: "Mataram Board Game Community",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "id_ID",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  };
}

/**
 * Generate JSON-LD for an Event
 */
export function generateEventJsonLd(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  image?: string;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    image: event.image ? [event.image] : [],
    location: {
      "@type": "Place",
      name: event.location || "Mataram",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mataram",
        addressRegion: "Nusa Tenggara Barat",
        addressCountry: "ID",
      },
    },
  };
}

/**
 * Generate JSON-LD for a Board Game
 */
export function generateBoardGameJsonLd(game: {
  name: string;
  description: string;
  image?: string;
  minPlayers?: number;
  maxPlayers?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    description: game.description,
    image: game.image ? [game.image] : [],
    category: "Board Game",
  };
}
