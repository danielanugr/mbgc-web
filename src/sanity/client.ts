import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster read-only access (default for public facing)
});

// Client terpisah untuk menulis data (BGG Sync)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Write harus bypass CDN
  token: process.env.SANITY_API_WRITE_TOKEN,
});
