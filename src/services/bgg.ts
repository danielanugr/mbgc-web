import { XMLParser } from "fast-xml-parser";
import { writeClient } from "@/sanity/client";
import slugify from "slugify";

const BGG_USERNAME = "lumiguia";
const API_URL = `https://boardgamegeek.com/xmlapi2/collection?username=${BGG_USERNAME}&stats=1&own=1`;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchBGGCollection() {
  let attempt = 0;
  let waitTime = 1000;

  while (attempt < 10) {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.BGG_XML_API_KEY}`,
        },
      });

      if (response.status === 200) {
        const text = await response.text();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
        });
        const jsonObj = parser.parse(text);

        if (!jsonObj.items || !jsonObj.items.item) {
          console.warn(
            "BGG returned 200 tapi tidak ada item (koleksi kosong/username salah?)",
          );
          return [];
        }

        const items = Array.isArray(jsonObj.items.item)
          ? jsonObj.items.item
          : [jsonObj.items.item];

        // Format data sesuai dengan Skema Sanity
        const games = items.map((item: any) => ({
          bggId: Number(item["@_objectid"]),
          name: item.name?.["#text"] || item.name || "Unknown Game",
          image: item.image || "",
          thumbnail: item.thumbnail || "",
          yearpublished: item.yearpublished || "",
          rating: Number(item.stats?.rating?.average?.["@_value"]) || 0,
        }));

        return games;
      } else if (response.status === 202) {
        console.log(`BGG memproses antrean. Menunggu ${waitTime / 1000}s...`);
        await delay(waitTime);
        attempt++;
        waitTime *= 2; // Exponential backoff
      } else {
        throw new Error(`Gagal fetch BGG. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      attempt++;
      await delay(waitTime);
      waitTime *= 2;
    }
  }

  throw new Error("Maksimal percobaan fetch BGG tercapai (Timeout).");
}

export async function syncToSanity() {
  console.log("Memulai BGG Data Fetching...");
  const games = await fetchBGGCollection();

  if (games.length === 0) {
    return { success: false, message: "Tidak ada game yang diambil dari BGG." };
  }

  console.log(`Ditemukan ${games.length} game. Memulai Upsert ke Sanity...`);

  const results = { added: 0, updated: 0, errors: [] as any[] };

  for (const game of games) {
    try {
      const slug = slugify(game.name, { lower: true, strict: true });

      // Upsert: mencari berdasarkan bggId (pastikan unique)
      const existing = await writeClient.fetch(
        `*[_type == "boardGame" && bggId == $bggId][0]`,
        { bggId: game.bggId },
      );

      const docObj = {
        _type: "boardGame",
        name: game.name,
        slug: { current: slug, _type: "slug" },
        imageUrl: game.image || game.thumbnail,
        bggId: game.bggId,
        bggRating: game.rating,
        publisher: game.yearpublished
          ? `Published ${game.yearpublished}`
          : "Unknown Publisher",
      };

      if (existing) {
        await writeClient.patch(existing._id).set(docObj).commit();
        results.updated++;
      } else {
        await writeClient.create(docObj);
        results.added++;
      }

      // Delay kecil untuk menghormati API limits (rate limiter via Sanity Client)
      await delay(100);
    } catch (err: any) {
      console.error(`Gagal sync game: ${game.name}`, err.message);
      results.errors.push({ game: game.name, error: err.message });
    }
  }

  return { success: true, results };
}
