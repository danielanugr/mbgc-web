import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import Studio from "./Studio";

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata: Metadata = {
  ...studioMetadata,
  title: "Loading Studio…", // Overrides the title for better loading state
};

export default function StudioPage() {
  return <Studio />;
}
