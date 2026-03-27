import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster read-only access (default for public facing)
});

// Lazy-initialized write client to prevent secret inlining at build time
let _writeClient: SanityClient | null = null;

export function getWriteClient(): SanityClient {
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env["SANITY_API_WRITE_TOKEN"],
    });
  }
  return _writeClient;
}
