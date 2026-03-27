import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const boardGameType = defineType({
  name: "boardGame",
  title: "Board Game",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "name",
      title: "Game Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (Custom)",
      type: "image",
      description:
        "Upload custom image jika tidak ingin menggunakan gambar dari BGG",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageUrl",
      title: "BGG Image URL",
      type: "url",
      readOnly: true,
      description: "URL gambar dari BGG (Auto-sync)",
    }),
    defineField({
      name: "bggId",
      title: "BoardGameGeek ID",
      type: "number",
      description: "Digunakan untuk sync dengan BGG API",
    }),
    defineField({
      name: "bggRating",
      title: "BGG Rating",
      type: "number",
      readOnly: true, // Akan di-update via auto-sync, bukan manual
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "publisher",
      media: "coverImage",
    },
  },
});
