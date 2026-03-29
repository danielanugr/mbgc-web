import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import Studio from "./Studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Loading Studio…",
};

export default function StudioPage() {
  return <Studio />;
}
