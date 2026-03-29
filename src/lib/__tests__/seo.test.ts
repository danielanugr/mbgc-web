import {
  generateSEOMetadata,
  generateEventJsonLd,
  generateBoardGameJsonLd,
  defaultMetadata,
} from "../seo";

describe("SEO Module", () => {
  const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbgc.site";

  describe("generateSEOMetadata", () => {
    it("generates default metadata when no props are provided", () => {
      const metadata = generateSEOMetadata();

      expect(metadata.title).toBe(defaultMetadata.title);
      expect(metadata.description).toBe(defaultMetadata.description);
      expect(metadata.alternates?.canonical).toBe(defaultUrl);
      expect(metadata.openGraph?.title).toBe(defaultMetadata.title);
      expect((metadata.openGraph as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)?.type).toBe("website");
      expect((metadata.twitter as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)?.card).toBe("summary_large_image");
    });

    it("generates specific metadata when props are provided", () => {
      const props = {
        title: "Event Seru",
        description: "Deskripsi event seru di Mataram",
        image: "/custom-image.png",
        url: "/events/seru",
        type: "article" as const,
      };

      const metadata = generateSEOMetadata(props);

      expect(metadata.title).toBe("Event Seru | Mataram Board Game Community");
      expect(metadata.description).toBe(props.description);
      expect(metadata.alternates?.canonical).toBe(`${defaultUrl}${props.url}`);
      expect(metadata.openGraph?.title).toBe(
        "Event Seru | Mataram Board Game Community",
      );

      const ogImages = metadata.openGraph?.images as any /* eslint-disable-line @typescript-eslint/no-explicit-any */[];
      expect(ogImages[0].url).toBe(props.image);
      expect((metadata.openGraph as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)?.type).toBe("article");
    });
  });

  describe("generateEventJsonLd", () => {
    it("generates valid JSON-LD for an event", () => {
      const eventInfo = {
        name: "Playday #10",
        description: "Main board game bareng di akhir pekan.",
        startDate: "2026-03-29T10:00:00+08:00",
        endDate: "2026-03-29T18:00:00+08:00",
        image: "https://example.com/playday10.jpg",
        location: "Kopipresso Mataram",
      };

      const jsonLd = generateEventJsonLd(eventInfo);

      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("Event");
      expect(jsonLd.name).toBe(eventInfo.name);
      expect(jsonLd.startDate).toBe(eventInfo.startDate);
      expect(jsonLd.endDate).toBe(eventInfo.endDate);
      expect(jsonLd.location.name).toBe(eventInfo.location);
    });

    it("handles missing end date and optional fields gracefully", () => {
      const eventInfo = {
        name: "Playday #11",
        description: "Main board game bareng!",
        startDate: "2026-04-05T10:00:00+08:00",
      };

      const jsonLd = generateEventJsonLd(eventInfo);

      expect(jsonLd.endDate).toBe(eventInfo.startDate); // fallbacks to start date
      expect(jsonLd.image).toEqual([]);
      expect(jsonLd.location.name).toBe("Mataram");
    });
  });

  describe("generateBoardGameJsonLd", () => {
    it("generates valid JSON-LD for a board game", () => {
      const gameInfo = {
        name: "Catan",
        description: "Classic trading and building game.",
        image: "https://example.com/catan.jpg",
        minPlayers: 3,
        maxPlayers: 4,
      };

      const jsonLd = generateBoardGameJsonLd(gameInfo);

      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("Product");
      expect(jsonLd.name).toBe(gameInfo.name);
      expect(jsonLd.image).toEqual([gameInfo.image]);
    });
  });
});
