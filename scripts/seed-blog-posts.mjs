import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset || !token) {
  console.error(
    "Missing required env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const makeParagraph = (key, text) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: `${key}-span`,
      text,
      marks: [],
    },
  ],
});

const posts = [
  {
    _id: "seed-post-review-azul",
    _type: "post",
    title: "Review Azul: Indah, Tajam, dan Bikin Ketagihan",
    slug: { current: "review-azul-mbgc" },
    contentType: "review",
    excerpt:
      "Azul adalah game drafting tile dengan aturan sederhana tapi keputusan yang sangat ketat. Cocok untuk pemain baru dan veteran.",
    authorName: "Tim MBGC",
    publishedAt: "2026-03-20T09:00:00.000Z",
    tags: ["review", "abstract", "family"],
    body: [
      makeParagraph(
        "a1",
        "Azul punya aturan yang mudah dijelaskan dalam 10 menit, tapi kedalaman taktiknya langsung terasa di ronde pertama.",
      ),
      makeParagraph(
        "a2",
        "Kunci permainan ada pada timing mengambil tile dan memaksa lawan menerima penalti. Interaksinya subtil, tapi tajam.",
      ),
    ],
  },
  {
    _id: "seed-post-komunitas-playday",
    _type: "post",
    title: "Catatan Playday MBGC: 42 Pemain, 18 Judul Game",
    slug: { current: "catatan-playday-mbgc-42-pemain" },
    contentType: "artikel",
    excerpt:
      "Rekap playday bulan ini: game favorit, momen terlucu, dan format meja yang paling efektif untuk pemain baru.",
    authorName: "Admin MBGC",
    publishedAt: "2026-03-24T11:30:00.000Z",
    tags: ["komunitas", "playday", "laporan"],
    body: [
      makeParagraph(
        "b1",
        "Playday kali ini dibuka dengan sesi onboarding 20 menit untuk pemain baru, lalu dibagi ke meja berdasarkan durasi game.",
      ),
      makeParagraph(
        "b2",
        "Format ini menurunkan waktu tunggu antar game dan membuat rotasi pemain lebih natural sepanjang sesi.",
      ),
    ],
  },
  {
    _id: "seed-post-guide-setup",
    _type: "post",
    title: "Guide: Cara Setup Meja Board Game Supaya Cepat Jalan",
    slug: { current: "guide-setup-meja-board-game" },
    contentType: "guide",
    excerpt:
      "Panduan praktis untuk host: dari card sorting, token tray, sampai urutan explain rules agar sesi bermain lebih lancar.",
    authorName: "Tim Edukasi MBGC",
    publishedAt: "2026-03-27T08:15:00.000Z",
    tags: ["guide", "host", "setup"],
    body: [
      makeParagraph(
        "c1",
        "Pisahkan komponen per pemain sebelum sesi dimulai. Simpan token umum di tengah meja dengan akses setara.",
      ),
      makeParagraph(
        "c2",
        "Jelaskan objective terlebih dahulu, baru alur ronde. Pemain biasanya lebih cepat paham jika tahu tujuan akhirnya.",
      ),
    ],
  },
  {
    _id: "seed-post-news-inventory",
    _type: "post",
    title: "Update Inventory: 12 Game Baru Masuk Koleksi MBGC",
    slug: { current: "update-inventory-12-game-baru" },
    contentType: "news",
    excerpt:
      "Koleksi komunitas bertambah 12 judul, termasuk game medium-weight untuk sesi 60-90 menit yang ramah pemain baru.",
    authorName: "Kurator Inventory MBGC",
    publishedAt: "2026-03-29T10:00:00.000Z",
    tags: ["news", "inventory", "koleksi"],
    body: [
      makeParagraph(
        "d1",
        "Fokus penambahan kali ini adalah game berdurasi menengah yang bisa selesai dalam satu sesi playday reguler.",
      ),
      makeParagraph(
        "d2",
        "Daftar lengkap sudah masuk halaman inventory dan siap dibawa untuk event berikutnya.",
      ),
    ],
  },
  {
    _id: "seed-post-review-cascadia",
    _type: "post",
    title: "Review Cascadia: Santai di Permukaan, Menantang di Akhir",
    slug: { current: "review-cascadia-mbgc" },
    contentType: "review",
    excerpt:
      "Cascadia memberi pengalaman puzzle yang tenang dengan banyak keputusan penting di setiap giliran.",
    authorName: "Tim MBGC",
    publishedAt: "2026-03-31T07:45:00.000Z",
    tags: ["review", "tile-laying", "strategy-light"],
    body: [
      makeParagraph(
        "e1",
        "Dengan kombinasi habitat dan wildlife scoring, Cascadia memberi ruang untuk strategi fleksibel tanpa terasa overwhelming.",
      ),
      makeParagraph(
        "e2",
        "Game ini sangat cocok untuk meja campuran antara pemain baru dan pemain yang sudah sering bermain.",
      ),
    ],
  },
];

async function run() {
  let transaction = client.transaction();

  for (const post of posts) {
    transaction = transaction.createOrReplace(post);
  }

  await transaction.commit({ autoGenerateArrayKeys: true });

  console.log(`Seeded ${posts.length} blog posts into ${projectId}.${dataset}`);
}

run().catch((error) => {
  console.error("Failed to seed blog posts:", error);
  process.exit(1);
});
